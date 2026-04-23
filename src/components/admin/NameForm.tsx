"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveName, type NameSaveState } from "@/app/admin/actions/name";
import type { Name } from "@/generated/prisma/client";

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
          <select name="imageId" defaultValue={name?.imageId ?? ""} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm">
            <option value="">(Yok)</option>
            {mediaOptions.map((m) => (
              <option key={m.id} value={m.id}>
                {m.alt ?? m.url}
              </option>
            ))}
          </select>
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
