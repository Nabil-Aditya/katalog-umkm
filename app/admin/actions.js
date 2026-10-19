"use server";

import { redirect } from "next/navigation";
import { buatKlienAdmin } from "@/lib/supabase/admin";

export async function login(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    redirect("/admin/login?error=" + encodeURIComponent("Email dan password wajib diisi."));
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
    redirect("/admin/login?error=" + encodeURIComponent(pesanError));
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

export async function gantiPassword(formData) {
  const passwordBaru = formData.get("password_baru");
  const konfirmasiPassword = formData.get("konfirmasi_password");

  if (!passwordBaru || !konfirmasiPassword) {
    redirect("/admin/password?error=" + encodeURIComponent("Semua kolom password wajib diisi."));
  }

  if (passwordBaru.length < 8) {
    redirect("/admin/password?error=" + encodeURIComponent("Password baru minimal 8 karakter."));
  }

  if (passwordBaru !== konfirmasiPassword) {
    redirect("/admin/password?error=" + encodeURIComponent("Konfirmasi password tidak cocok dengan password baru."));
  }

  try {
    const supabase = await buatKlienAdmin();

    // Verifikasi admin sudah login
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      redirect("/admin/login?error=" + encodeURIComponent("Sesi telah berakhir. Silakan masuk kembali."));
    }

    const { error } = await supabase.auth.updateUser({
      password: passwordBaru.toString(),
    });

    if (error) {
      redirect("/admin/password?error=" + encodeURIComponent(error.message || "Gagal mengganti password. Silakan coba lagi."));
    }
  } catch (err) {
    redirect("/admin/password?error=" + encodeURIComponent(err.message || "Terjadi kesalahan saat mengganti password."));
  }

  redirect("/admin/password?sukses=" + encodeURIComponent("Password berhasil diganti!"));
}
