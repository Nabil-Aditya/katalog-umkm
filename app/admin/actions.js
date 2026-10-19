"use server";

import { redirect } from "next/navigation";
import { buatKlienAdmin } from "@/lib/supabase/admin";

export async function login(prevState, formData) {
  const data = formData instanceof FormData ? formData : prevState;
  const email = data?.get("email");
  const password = data?.get("password");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  let pesanError = null;

  try {
    const supabase = await buatKlienAdmin();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.toString().trim(),
      password: password.toString(),
    });

    if (error) {
      pesanError = "Email atau password salah. Periksa kembali data yang kamu masukkan.";
    }
  } catch (err) {
    pesanError = err.message || "Terjadi kesalahan saat masuk. Silakan coba lagi.";
  }

  if (pesanError) {
    return { error: pesanError };
  }

  redirect("/admin");
}

export async function logout() {
  try {
    const supabase = await buatKlienAdmin();
    await supabase.auth.signOut();
  } catch (err) {
    // Tetap lanjutkan pengalihan jika ada kesalahan saat logout
  }

  redirect("/admin/login");
}

