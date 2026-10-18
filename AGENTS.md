# Aturan untuk AI Agent

Baca file ini sebelum mengerjakan apa pun. Aturan di sini berlaku untuk setiap prompt.

## Tentang proyek

Aplikasi katalog produk UMKM. Pengunjung melihat katalog dan detail produk, lalu memesan lewat WhatsApp. Pemilik toko masuk ke halaman admin untuk mengganti password dan mengelola produk.

Sebelum mengerjakan fitur, baca:

- `docs/PRD.md` untuk tujuan dan ruang lingkup
- `docs/user-stories.md` untuk kriteria selesai setiap fitur (US-01, US-02, dan seterusnya)
- `docs/rancangan-teknis.md` untuk alur data dan struktur folder
- `DESIGN.md` untuk aturan tampilan

## Stack (jangan diganti)

- Next.js 16 dengan App Router, JavaScript (bukan TypeScript)
- Tailwind CSS 4, token warna ada di `app/globals.css`
- Supabase (`@supabase/supabase-js` dan `@supabase/ssr` sudah terpasang)
- Hosting di Vercel

## Aturan keamanan (wajib)

1. Supabase hanya boleh diakses dari server: Server Component, Server Action, atau Route Handler. Jangan membuat client Supabase di file yang memakai `"use client"`.
2. Environment variable tidak boleh memakai awalan `NEXT_PUBLIC_`. Nama variabel: `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY` (lihat `.env.example`).
3. Setiap aksi yang mengubah data (ganti password, tambah, ubah, hapus produk) wajib memeriksa di server bahwa admin sudah login sebelum dijalankan.
4. Semua halaman di bawah `/admin` (kecuali `/admin/login`) hanya boleh dibuka admin yang sudah login.
5. Jangan menulis kunci, password, atau email admin di dalam kode.
6. Jangan mematikan Row Level Security (RLS) dan jangan mengubah aturan di `docs/schema.sql` tanpa diminta.

## Catatan Next.js 16

- `params` pada halaman dinamis berupa Promise: gunakan `const { id } = await params`.
- File untuk memproteksi rute bernama `proxy.js` di root proyek (pengganti `middleware.js`).
- Gunakan Server Action untuk memproses form.

## Data

Tabel `produk` dengan kolom: `id`, `nama`, `harga`, `deskripsi`, `foto_url`, `kategori`, `created_at`. Jangan mengganti nama kolom. Data contoh di `lib/data-contoh.js` memakai nama kolom yang sama dan tidak dipakai lagi setelah halaman terhubung ke database.

Identitas toko (nama, nomor WhatsApp, alamat, jam buka) ada di `lib/toko.js`.

## Cara bekerja

1. Kerjakan satu fitur atau satu user story per prompt.
2. Ubah hanya file yang disebut atau yang memang dibutuhkan fitur itu.
3. Pakai komponen yang sudah ada di `components/` sebelum membuat yang baru.
4. Jangan memasang paket npm baru tanpa diminta.
5. Jangan menjalankan perintah Git apa pun (commit, push, dan lainnya dilakukan manual oleh pengguna).
6. Hapus komponen `CatatanBelumAktif` dari halaman yang fiturnya sudah selesai.
7. Setelah selesai, jelaskan singkat: file apa saja yang diubah dan cara mengetesnya.
