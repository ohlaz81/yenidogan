"use client";

import { useActionState, useMemo, useState } from "react";
import Link from "next/link";
import { saveName, type NameSaveState } from "@/app/admin/actions/name";
import type { Name } from "@/types/database";

const initial: NameSaveState = {};

type Props = {
  name?: Name & { similarFrom?: { target: { slug: string } }[] };
  mediaOptions: { id: string; url: string; alt: string | null }[];
};

function traitsToText(traits: unknown): string {
  if (traits == null) return "";
  if (Array.isArray(traits)) return traits.filter((x): x is string => typeof x === "string").join("\n");
  if (typeof traits === "string") return traits;
  return "";
}

function fileNameFromMediaUrl(url: string, alt: string | null): string {
  if (alt?.trim()) return alt.trim();
  try {
    const seg = url.split("/").pop() ?? url;
    return decodeURIComponent(seg);
  } catch {
    return url;
  }
}

export function NameForm({ name, mediaOptions }: Props) {
  const [state, action, pending] = useActionState(saveName, initial);
  const similarDefault = name?.similarFrom?.map((s) => s.target.slug).join(", ") ?? "";
  const [inQuranChoice, setInQuranChoice] = useState(name?.inQuran ? "true" : "false");
  const [selectedImageId, setSelectedImageId] = useState(name?.imageId ?? "");
  const selectedImage = useMemo(
    () => mediaOptions.find((m) => m.id === selectedImageId) ?? null,
    [mediaOptions, selectedImageId],
  );
  const { babyMediaOptions, otherMediaOptions } = useMemo(() => {
    const baby = mediaOptions.filter((m) => m.url.startsWith("/media/babies/"));
    const other = mediaOptions.filter((m) => !m.url.startsWith("/media/babies/"));
    return { babyMediaOptions: baby, otherMediaOptions: other };
  }, [mediaOptions]);

  if (state.ok && state.slug) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
        <p className="font-semibold">Kaydedildi.</p>
        <Link className="mt-2 inline-block text-sm font-semibold text-primary underline" href={`/isim/${state.slug}`}>
          Sitede görüntüle →
        </Link>
        <Link className="mt-2 ml-4 inline-block text-sm font-semibold text-primary underline" href="/admin/isimler">
          Listeye dön
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="max-w-3xl space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      {name && <input type="hidden" name="id" value={name.id} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold">Görünen isim</label>
          <input
            name="displayName"
            required
            defaultValue={name?.displayName}
            className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold">Slug (boşsa otomatik)</label>
          <input name="slug" defaultValue={name?.slug} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-semibold">Cinsiyet</label>
          <select name="gender" defaultValue={name?.gender ?? "GIRL"} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm">
            <option value="GIRL">Kız</option>
            <option value="BOY">Erkek</option>
            <option value="UNISEX">Ünisex</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold">Tarz</label>
          <select name="style" defaultValue={name?.style ?? "MODERN"} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm">
            <option value="MODERN">Modern</option>
            <option value="CLASSIC">Klasik</option>
            <option value="RARE">Nadir</option>
            <option value="POPULAR">Popüler</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold">Anlam</label>
          <input name="meaning" required defaultValue={name?.meaning} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-semibold">Köken</label>
          <input name="origin" required defaultValue={name?.origin} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-semibold">Okunuş</label>
          <input name="pronunciation" required defaultValue={name?.pronunciation} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-semibold">Popülerlik (1–5)</label>
          <input
            name="popularity"
            type="number"
            min={1}
            max={5}
            defaultValue={name?.popularity ?? 3}
            className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Popülerlik skoru</label>
          <input
            name="popularScore"
            type="number"
            min={0}
            max={1000}
            defaultValue={name?.popularScore ?? 0}
            className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Kur’an’da geçiyor</label>
          <select
            name="inQuran"
            value={inQuranChoice}
            onChange={(e) => setInQuranChoice(e.target.value)}
            className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
          >
            <option value="true">Evet</option>
            <option value="false">Hayır</option>
          </select>
        </div>
        {inQuranChoice === "true" ? (
          <div className="sm:col-span-2">
            <label className="text-sm font-semibold">Kur’an’da geçtiği yer (kısa not)</label>
            <p className="mt-0.5 text-xs text-zinc-500">
              Örn. sure/ayet veya kısa açıklama. Boş bırakılabilir; sitede yine de alan gösterilir.
            </p>
            <textarea
              name="quranReference"
              rows={2}
              defaultValue={name?.quranReference ?? ""}
              className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
              placeholder="Örn. Bakara 2:31 civarı; Hz. Musa kıssalarında geçer."
            />
          </div>
        ) : null}
        <div>
          <label className="text-sm font-semibold">Kısa isim</label>
          <select name="isShort" defaultValue={name?.isShort ? "true" : "false"} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm">
            <option value="true">Evet</option>
            <option value="false">Hayır</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold">Anlamı güzel</label>
          <select
            name="beautifulMeaning"
            defaultValue={name?.beautifulMeaning ? "true" : "false"}
            className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
          >
            <option value="true">Evet</option>
            <option value="false">Hayır</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold">Yayında</label>
          <select name="published" defaultValue={name?.published === false ? "false" : "true"} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm">
            <option value="true">Evet</option>
            <option value="false">Hayır</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold">Kapak görseli</label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Boş bırakırsanız sitede cinsiyete göre <code className="rounded bg-zinc-100 px-1">public/media/babies</code> içinden otomatik
            atanır; buradan seçerseniz o görsel tüm kartlarda ve detayda kullanılır.
          </p>
          <select
            name="imageId"
            value={selectedImageId}
            onChange={(e) => setSelectedImageId(e.currentTarget.value)}
            className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
          >
            <option value="">(Yok)</option>
            {babyMediaOptions.length > 0 ? (
              <optgroup label="public/media/babies">
                {babyMediaOptions.map((m) => (
                  <option key={m.id} value={m.id}>
                    {fileNameFromMediaUrl(m.url, m.alt)}
                  </option>
                ))}
              </optgroup>
            ) : null}
            {otherMediaOptions.length > 0 ? (
              <optgroup label="Yüklenen / diğer medya">
                {otherMediaOptions.map((m) => (
                  <option key={m.id} value={m.id}>
                    {fileNameFromMediaUrl(m.url, m.alt)}
                  </option>
                ))}
              </optgroup>
            ) : null}
          </select>
          {selectedImage ? (
            <div className="mt-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3">
              <p className="text-xs font-semibold text-zinc-700">Seçilen görsel önizleme</p>
              <div className="mt-2 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedImage.url}
                  alt={selectedImage.alt ?? "Kapak görseli"}
                  className="h-20 w-20 rounded-lg border border-zinc-200 object-cover bg-white"
                />
                <p className="text-xs text-zinc-600 break-all">{fileNameFromMediaUrl(selectedImage.url, selectedImage.alt)}</p>
              </div>
            </div>
          ) : null}
          {babyMediaOptions.length > 0 ? (
            <div className="mt-3">
              <p className="text-xs font-semibold text-zinc-700">public/media/babies — tıklayarak seçin</p>
              <div className="mt-2 max-h-80 overflow-y-auto rounded-xl border border-zinc-200 bg-zinc-50/90 p-2">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {babyMediaOptions.map((m) => {
                    const label = fileNameFromMediaUrl(m.url, m.alt);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedImageId(m.id)}
                        className={`flex flex-col overflow-hidden rounded-lg border bg-white text-left shadow-sm transition ${
                          selectedImageId === m.id ? "border-primary ring-2 ring-primary/35" : "border-zinc-200 hover:border-zinc-400"
                        }`}
                        title={label}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={m.url} alt="" className="aspect-square h-20 w-full object-cover sm:h-24" loading="lazy" />
                        <span className="line-clamp-2 break-all px-1.5 py-1 text-[10px] leading-tight text-zinc-600">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
          {otherMediaOptions.length > 0 ? (
            <div className="mt-4">
              <p className="text-xs font-semibold text-zinc-700">Yüklenen / diğer medya</p>
              <div className="mt-2 max-h-52 overflow-y-auto rounded-xl border border-zinc-200 bg-white p-2">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                  {otherMediaOptions.map((m) => {
                    const label = fileNameFromMediaUrl(m.url, m.alt);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedImageId(m.id)}
                        className={`flex flex-col overflow-hidden rounded-lg border bg-zinc-50 text-left shadow-sm transition ${
                          selectedImageId === m.id ? "border-primary ring-2 ring-primary/35" : "border-zinc-200 hover:border-zinc-400"
                        }`}
                        title={label}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={m.url} alt="" className="aspect-square h-16 w-full object-cover sm:h-20" loading="lazy" />
                        <span className="line-clamp-2 break-all px-1.5 py-1 text-[10px] leading-tight text-zinc-600">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold">Kısa tanıtım</label>
          <textarea name="intro" rows={3} defaultValue={name?.intro ?? ""} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold">Özellikler (virgül veya satır)</label>
          <textarea name="traits" rows={4} defaultValue={traitsToText(name?.traits)} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold">Benzer isim slugları (virgülle)</label>
          <input name="similarSlugs" defaultValue={similarDefault} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
        </div>
      </div>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button type="submit" disabled={pending} className="rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-white disabled:opacity-60">
        {pending ? "Kaydediliyor…" : "Kaydet"}
      </button>
    </form>
  );
}
