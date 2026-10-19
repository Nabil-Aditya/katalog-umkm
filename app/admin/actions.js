"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
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

export async function tambahProduk(formData) {
  const supabase = await buatKlienAdmin();

  // Verifikasi admin login
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/admin/login?error=" + encodeURIComponent("Sesi telah berakhir. Silakan masuk kembali."));
  }

  const nama = formData.get("nama")?.toString().trim();
  const harga = parseInt(formData.get("harga"), 10);
  const kategori = formData.get("kategori")?.toString().trim() || null;
  const foto_url = formData.get("foto_url")?.toString().trim() || "/produk/kopi.svg";
  const deskripsi = formData.get("deskripsi")?.toString().trim() || null;

  if (!nama || isNaN(harga) || harga < 0) {
    redirect("/admin/produk/baru?error=" + encodeURIComponent("Nama produk dan harga wajib diisi dengan benar."));
  }

  const { error } = await supabase.from("produk").insert([
    {
      nama,
      harga,
      kategori,
      foto_url,
      deskripsi,
    },
  ]);

  if (error) {
    redirect("/admin/produk/baru?error=" + encodeURIComponent(error.message || "Gagal menyimpan produk."));
  }

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export async function ubahProduk(formData) {
  const supabase = await buatKlienAdmin();

  // Verifikasi admin login
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/admin/login?error=" + encodeURIComponent("Sesi telah berakhir. Silakan masuk kembali."));
  }

  const id = formData.get("id");
  const nama = formData.get("nama")?.toString().trim();
  const harga = parseInt(formData.get("harga"), 10);
  const kategori = formData.get("kategori")?.toString().trim() || null;
  const foto_url = formData.get("foto_url")?.toString().trim() || "/produk/kopi.svg";
  const deskripsi = formData.get("deskripsi")?.toString().trim() || null;

  if (!id || !nama || isNaN(harga) || harga < 0) {
    redirect(`/admin/produk/${id}/ubah?error=` + encodeURIComponent("Data produk tidak lengkap atau tidak valid."));
  }

  const { error } = await supabase
    .from("produk")
    .update({
      nama,
      harga,
      kategori,
      foto_url,
      deskripsi,
    })
    .eq("id", id);

  if (error) {
    redirect(`/admin/produk/${id}/ubah?error=` + encodeURIComponent(error.message || "Gagal memperbarui produk."));
  }

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath(`/produk/${id}`);
  redirect("/admin");
}

export async function hapusProduk(formData) {
  const supabase = await buatKlienAdmin();

  // Verifikasi admin login
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/admin/login?error=" + encodeURIComponent("Sesi telah berakhir. Silakan masuk kembali."));
  }

  const id = formData.get("id");
  if (!id) {
    redirect("/admin?error=" + encodeURIComponent("ID produk tidak valid."));
  }

  const { error } = await supabase.from("produk").delete().eq("id", id);

  if (error) {
    redirect("/admin?error=" + encodeURIComponent(error.message || "Gagal menghapus produk."));
  }

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export async function buatDeskripsiAI(nama, kategori) {
  const supabase = await buatKlienAdmin();

  // Verifikasi admin login
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      sukses: false,
      error: "Sesi admin telah berakhir. Silakan masuk kembali.",
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      sukses: false,
      error: "Kunci API Gemini (GEMINI_API_KEY) belum diisi di file .env.local atau pengaturan Vercel.",
    };
  }

  const namaClean = nama?.trim();
  const kategoriClean = kategori?.trim() || "Produk UMKM";

  if (!namaClean) {
    return {
      sukses: false,
      error: "Nama produk wajib diisi terlebih dahulu.",
    };
  }

  const prompt = `Kamu adalah copywriter profesional untuk produk UMKM Indonesia.
Buatkan deskripsi produk yang menarik, ramah, dan menggugah minat pembeli.
Nama Produk: ${namaClean}
Kategori: ${kategoriClean}

Aturan penulisan:
- Panjang deskripsi antara 2 sampai 4 kalimat saja.
- Gunakan bahasa Indonesia yang santun, alami, dan menjual.
- Jangan gunakan format markdown (seperti tanda bintang, hashtag, atau cetak tebal).
- Jangan berikan pilihan kalimat atau opsi lain, langsung berikan satu paragraf teks deskripsi saja.`;

const models = ["gemini-2.0-flash", "gemini-1.5-flash"];

  let lastError = null;
  for (const model of models) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        lastError = data.error?.message || `Gagal menggunakan model ${model}`;
        if (res.status === 404) {
          continue;
        }
        return {
          sukses: false,
          error: lastError,
        };
      }

      const deskripsi = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (deskripsi) {
        return {
          sukses: true,
          deskripsi,
        };
      }
    } catch (err) {
      lastError = err.message;
    }
  }

  return {
    sukses: false,
    error: lastError || "Gagal memproses deskripsi dengan AI. Silakan coba lagi.",
  };
}

