"use client";

import { deleteNameAction } from "@/app/admin/actions/name";
import { useEffect, useRef, useState } from "react";

type Props = {
  nameId: string;
  displayName: string;
};

export function DeleteNameButton({ nameId, displayName }: Props) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-1 rounded-lg border border-red-700 bg-red-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-red-700"
      >
        Sil
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-name-title"
            className="max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="delete-name-title" className="font-display text-lg font-semibold text-zinc-900">
              Uyarı
            </h2>
            <p className="mt-3 text-sm text-zinc-600">
              <span className="font-semibold text-zinc-800">«{displayName}»</span> kaydını silmek istediğinize emin
              misiniz? Bu işlem geri alınamaz; ilgili benzer isim bağları ve ana sayfadaki yerleşimler de temizlenir.
            </p>
            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={() => formRef.current?.requestSubmit()}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Evet, sil
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <form ref={formRef} action={deleteNameAction} className="hidden" aria-hidden>
        <input type="hidden" name="id" value={nameId} />
        <button type="submit" tabIndex={-1}>
          submit
        </button>
      </form>
    </>
  );
}
