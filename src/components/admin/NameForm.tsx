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

export function NameForm({ name, mediaOptions }: Props) {
  const [state, action, pending] = useActionState(saveName, initial);
  const similarDefault = name?.similarFrom?.map((s) => s.target.slug).join(", ") ?? "";
  const [selectedImageId, setSelectedImageId] = useState(name?.imageId ?? "");
  const selectedImage = useMemo(
    () => mediaOptions.find((m) => m.id === selectedImageId) ?? null,
    [mediaOptions, selectedImageId],
  );

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
          <select name="inQuran" defaultValue={name?.inQuran ? "true" : "false"} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm">
            <option value="true">Evet</option>
            <option value="false">Hayır</option>
          </select>
        </div>
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
            {mediaOptions.map((m) => (
              <option key={m.id} value={m.id}>
                {m.alt ?? m.url}
              </option>
            ))}
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
                <p className="text-xs text-zinc-600 break-all">{selectedImage.alt ?? selectedImage.url}</p>
              </div>
            </div>
          ) : null}
          {mediaOptions.length > 0 ? (
            <details className="mt-3">
              <summary className="cursor-pointer text-xs font-semibold text-primary">Görselleri galeride gör</summary>
              <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6">
                {mediaOptions.slice(0, 30).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedImageId(m.id)}
                    className={`overflow-hidden rounded-lg border ${
                      selectedImageId === m.id ? "border-primary ring-2 ring-primary/30" : "border-zinc-200"
                    }`}
                    title={m.alt ?? m.url}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.url} alt={m.alt ?? "Görsel"} className="h-16 w-full object-cover" />
                  </button>
                ))}
              </div>
            </details>
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
