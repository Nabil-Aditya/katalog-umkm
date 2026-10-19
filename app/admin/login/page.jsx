"use client";

import { useActionState } from "react";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import { login } from "@/app/admin/actions";

export default function HalamanLogin() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-6 py-12">
      <div>
        <h1 className="text-2xl font-extrabold">Masuk admin</h1>
        <p className="mt-1 text-sm text-teks-lembut">Khusus pemilik toko untuk mengelola produk.</p>
      </div>
      <form action={formAction} className="flex flex-col gap-4">
        {state?.error && (
          <div className="rounded-lg border border-garis bg-permukaan p-3 text-sm text-bahaya">
            {state.error}
          </div>
        )}
        <Input label="Email" name="email" type="email" autoComplete="email" required />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        <Tombol type="submit" disabled={isPending}>
          {isPending ? "Memproses..." : "Masuk"}
        </Tombol>
      </form>
    </div>
  );
}
