"use client";

import {
  applyBulkNamesImportAction,
  previewBulkNamesImportAction,
  type PreviewBulkNamesImportResult,
} from "@/app/admin/actions/name-bulk-import";
import { excelFileToNamesJsonText } from "@/lib/admin/excel-to-names-json";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

function downloadJson(filename: string, json: string) {
  const blob = new Blob([json], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function BulkJsonImportNamesButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const [busy, setBusy] = useState<"preview" | "apply" | null>(null);
  const [preview, setPreview] = useState<PreviewBulkNamesImportResult | null>(null);
  const [applyMessage, setApplyMessage] = useState<string | null>(null);
  const [applyError, setApplyError] = useState<string | null>(null);

  const resetOutcome = useCallback(() => {
    setApplyMessage(null);
    setApplyError(null);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setPreview(null);
    resetOutcome();
  }, [resetOutcome]);

  const onTextChange = (v: string) => {
    setJsonText(v);
    setPreview(null);
    resetOutcome();
  };

  const onPickJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const t = typeof reader.result === "string" ? reader.result : "";
      onTextChange(t);
    };
    reader.readAsText(f, "UTF-8");
  };

  const onPickExcelFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    resetOutcome();
    const r = await excelFileToNamesJsonText(f);
    if (!r.ok) {
      setApplyError(r.error);
      setPreview(null);
      return;
    }
    onTextChange(r.json);
  };

  const runPreview = async () => {
    setBusy("preview");
    resetOutcome();
    try {
      const r = await previewBulkNamesImportAction(jsonText);
      setPreview(r);
      if (!r.ok) setApplyError(r.error);
    } catch (err) {
      setPreview(null);
      setApplyError(err instanceof Error ? err.message : "Önizleme başarısız.");
    } finally {
      setBusy(null);
    }
  };

  const runApply = async () => {
    setBusy("apply");
    resetOutcome();
    try {
      const r = await applyBulkNamesImportAction(jsonText);
      if (r.ok) {
        const stamp = new Date().toISOString().replace(/[:.]/g, "-");
        downloadJson(`isim-yedek-${stamp}.json`, r.backupJson);
        setApplyMessage(
          `Tamamlandı. Yedek indirildi (${r.backupRowCount} isim). İşlenen satır: ${r.appliedValid} ` +
            `(yeni: ${r.toInsert}, güncellenen: ${r.toUpdate}).`,
        );
        setPreview(null);
        setJsonText("");
        router.refresh();
      } else {
        if (r.backupJson) {
          const stamp = new Date().toISOString().replace(/[:.]/g, "-");
          downloadJson(`isim-yedek-hata-${stamp}.json`, r.backupJson);
        }
        setApplyError(
          r.phase === "validate"
            ? r.error + (r.errors?.length ? ` Örnek: ${r.errors[0]?.message ?? ""}` : "")
            : `${r.error}${r.backupJson ? " (işlem öncesi yedek indirildi.)" : ""}`,
        );
      }
    } catch (err) {
      setApplyError(err instanceof Error ? err.message : "İçe aktarma başarısız.");
    } finally {
      setBusy(null);
    }
  };

  const canApply =
    preview?.ok === true && preview.errorCount === 0 && preview.validRows > 0 && !busy && !applyMessage;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setPreview(null);
          resetOutcome();
        }}
        className="rounded-2xl border border-zinc-300 bg-white px-4 py-2 text-sm font-bold text-zinc-800 shadow-sm hover:bg-zinc-50"
      >
        Toplu isim yükle
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="presentation"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="bulk-import-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="bulk-import-title" className="font-display text-lg font-semibold text-zinc-900">
              Toplu isim yükle
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              <strong>Excel:</strong> İlk sayfada birinci satırda sütun başlıkları olsun; altta her satırda bir isim
              bilgisi yazsın. <strong>«Excel dosyası»</strong> ile .xlsx veya .xls seçebilirsin; içerik aşağıdaki alana
              otomatik aktarılır. <strong>Metin dosyası:</strong> Hazırladığın listeyi .json uzantılı dosyadan da
              seçebilir veya doğrudan yapıştırabilirsin. Önce <strong>Önizle ve doğrula</strong>, sonra{" "}
              <strong>Onayla ve içe aktar</strong> kullan. Aynı kısa ada sahip satırlar veritabanında güncellenir; listede
              olmayan mevcut isimler silinmez. Hata veya tekrarlayan kayıt varsa yükleme yapılmaz.
            </p>

            <div className="mt-4 space-y-3">
              <label className="block text-xs font-semibold uppercase text-zinc-500">
                Liste (Excel seçtiysen burası dolabilir; gerekirse düzenleyebilirsin)
              </label>
              <textarea
                value={jsonText}
                onChange={(e) => onTextChange(e.target.value)}
                rows={10}
                placeholder="Önce Excel veya metin dosyası seç; buraya otomatik gelir. Boş bırakıp sadece dosya da kullanabilirsin."
                className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none ring-primary focus:ring-2"
              />
              <div className="flex flex-wrap items-center gap-2">
                <label className="cursor-pointer rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50">
                  Metin dosyası (.json)
                  <input type="file" accept=".json,application/json" className="sr-only" onChange={onPickJsonFile} />
                </label>
                <label className="cursor-pointer rounded-xl border border-emerald-600/40 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-100">
                  Excel dosyası (.xlsx / .xls)
                  <input
                    type="file"
                    accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                    className="sr-only"
                    onChange={(e) => void onPickExcelFile(e)}
                  />
                </label>
                <button
                  type="button"
                  disabled={busy !== null || !jsonText.trim()}
                  onClick={() => void runPreview()}
                  className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {busy === "preview" ? "Kontrol ediliyor…" : "Önizle ve doğrula"}
                </button>
              </div>
            </div>

            {preview?.ok ? (
              <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm">
                <p className="font-semibold text-zinc-800">Önizleme</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-zinc-700">
                  <li>Dosyadaki toplam satır: {preview.totalInFile}</li>
                  <li>Geçerli kayıt: {preview.validRows}</li>
                  <li>Hatalı veya tekrarlayan satır: {preview.errorCount}</li>
                  <li>Yeni eklenecek: {preview.toInsert}</li>
                  <li>Mevcut kayıt güncellenecek: {preview.toUpdate}</li>
                </ul>
                {preview.errors.length > 0 ? (
                  <div className="mt-3 max-h-40 overflow-y-auto rounded-lg border border-amber-200 bg-amber-50 p-2 text-xs text-amber-950">
                    {preview.errors.map((e, i) => (
                      <div key={i}>
                        Satır {e.index}
                        {e.slug ? ` — kayıt kodu: ${e.slug}` : ""}: {e.message}
                      </div>
                    ))}
                    {preview.errorsTruncated ? <p className="mt-1 font-medium">… (ilk {preview.errors.length} hata)</p> : null}
                  </div>
                ) : null}
              </div>
            ) : null}

            {applyMessage ? (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">{applyMessage}</div>
            ) : null}
            {applyError ? <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">{applyError}</div> : null}

            <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-zinc-100 pt-4">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
              >
                Kapat
              </button>
              <button
                type="button"
                disabled={!canApply}
                onClick={() => void runApply()}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {busy === "apply" ? "Uygulanıyor…" : "Onayla ve içe aktar"}
              </button>
            </div>
            <p className="mt-3 text-xs text-zinc-500">
              Onayladığında önce mevcut tüm isimlerin yedeği bilgisayarına indirilir, ardından liste kaydedilir. Bir hata
              oluşursa yine işlem öncesi yedek indirilmeye çalışılır.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
