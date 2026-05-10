"use client";

import {
  applyBulkNamesImportAction,
  previewBulkNamesImportAction,
  type PreviewBulkNamesImportResult,
} from "@/app/admin/actions/name-bulk-import";
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

  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          `Tamamlandı. Yedek dosyası indirildi (${r.backupRowCount} kayıt). Uygulanan: ${r.appliedValid} satır ` +
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
        Toplu JSON İçe Aktar
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
            aria-labelledby="bulk-json-import-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="bulk-json-import-title" className="font-display text-lg font-semibold text-zinc-900">
              Toplu JSON İçe Aktar
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              JSON dosyası seçin veya metni yapıştırın. Önce önizleyin; onayladığınızda yalnızca geçerli satırlar{" "}
              <strong>slug</strong> üzerinden upsert edilir (mevcut kayıtlar silinmez). Dosyada hatalı veya yinelenen
              satır varsa içe aktarma yapılmaz; önce tüm satırları düzeltin.
            </p>

            <div className="mt-4 space-y-3">
              <label className="block text-xs font-semibold uppercase text-zinc-500">JSON</label>
              <textarea
                value={jsonText}
                onChange={(e) => onTextChange(e.target.value)}
                rows={10}
                placeholder='[ { "slug": "...", "displayName": "...", ... }, ... ] veya { "rows": [ ... ] }'
                className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 font-mono text-xs text-zinc-900 outline-none ring-primary focus:ring-2"
              />
              <div className="flex flex-wrap items-center gap-2">
                <label className="cursor-pointer rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50">
                  Dosya seç
                  <input type="file" accept=".json,application/json" className="sr-only" onChange={onPickFile} />
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
                  <li>Dosyadaki toplam öğe: {preview.totalInFile}</li>
                  <li>Geçerli kayıt: {preview.validRows}</li>
                  <li>Hatalı / yinelenen satır: {preview.errorCount}</li>
                  <li>Yeni eklenecek (slug yok): {preview.toInsert}</li>
                  <li>Güncellenecek (slug var): {preview.toUpdate}</li>
                </ul>
                {preview.errors.length > 0 ? (
                  <div className="mt-3 max-h-40 overflow-y-auto rounded-lg border border-amber-200 bg-amber-50 p-2 text-xs text-amber-950">
                    {preview.errors.map((e, i) => (
                      <div key={i}>
                        Satır {e.index}
                        {e.slug ? ` (${e.slug})` : ""}: {e.message}
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
              Onayda önce tüm tablo yedeği JSON olarak indirilir, ardından upsert çalışır. Hata olursa yine işlem
              öncesi yedek indirilmeye çalışılır.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
