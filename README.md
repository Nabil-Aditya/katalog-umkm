# Katalog UMKM + Order WhatsApp

Template workshop vibe coding Creative Hub App Talent (CHAT) 2026. Repo ini berisi tampilan aplikasi katalog UMKM; tugasmu merangkainya menjadi sistem utuh dengan bantuan AI: database, login admin, keamanan, dan pemesanan lewat WhatsApp.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fandixurniawan%2Fkatalog-umkm&project-name=katalog-umkm&repository-name=katalog-umkm)

## Langkah awal

1. **Salin repo ke akun GitHub-mu.** Klik tombol **Deploy with Vercel** di atas. Vercel akan membuat repo baru di akun GitHub-mu dan langsung men-deploy-nya. Setelah selesai, buka link Vercel-mu: katalog tampil dengan data contoh.
2. **Buat proyek Supabase.** Masuk ke [supabase.com](https://supabase.com) dengan akun GitHub, lalu buat proyek baru. Simpan password database di tempat aman.
3. **Siapkan database.** Di Supabase, buka **SQL Editor**, tempel seluruh isi `docs/schema.sql`, lalu klik **Run**. Tabel `produk` beserta data awal akan terbentuk.
4. **Siapkan akun admin.** Ikuti panduan akun admin yang dibagikan mentor. Setelah itu matikan pendaftaran akun baru di **Authentication > Sign In / Providers**.
5. **Isi environment variable di Vercel.** Buka proyekmu di Vercel > **Settings > Environment Variables**, lalu isi tiga variabel dari `.env.example`. Nilainya ada di Supabase > **Project Settings > API**. Setelah itu lakukan **Redeploy**.
6. **Clone repo ke laptop.**

   ```bash
   git clone https://github.com/<akunmu>/<nama-repo>.git
   cd <nama-repo>
   npm install
   ```

7. **Buat file `.env.local`.** Salin `.env.example` menjadi `.env.local`, lalu isi dengan nilai yang sama seperti di Vercel.
8. **Jalankan di laptop.**

   ```bash
   npm run dev
   ```

   Buka `http://localhost:3000`.

## Alur kerja

Kerjakan satu user story setiap kali, lalu simpan dan kirim perubahan:

```bash
git add .
git commit -m "US-01: katalog dari database"
git push
```

Setiap `git push`, Vercel otomatis men-deploy versi terbaru. Cek hasilnya di link Vercel-mu.

Urutan yang disarankan: US-01, US-02, US-03, US-04, US-05, US-06, lalu fitur bonus. Daftar lengkap ada di `docs/user-stories.md`.

## Isi repo

| File atau folder | Isi |
| --- | --- |
| `AGENTS.md` | Aturan untuk AI agent, dibaca sebelum setiap prompt |
| `DESIGN.md` | Panduan warna, huruf, dan komponen |
| `PROMPTS.md` | Jurnal prompt, wajib diisi |
| `docs/` | Problem statement, PRD, user story, rancangan teknis, skema database, checklist |
| `lib/toko.js` | Nama toko, nomor WhatsApp, alamat, jam buka |
| `app/` | Halaman aplikasi |
| `components/` | Komponen tampilan |

## Menyesuaikan dengan usahamu

- Identitas toko: ubah `lib/toko.js`.
- Warna: ubah bagian `@theme` di `app/globals.css` (lihat `DESIGN.md`).
- Produk: ubah langsung di Supabase > **Table Editor > produk**.

## Aturan penting

- Jangan menyimpan kunci atau password di kode, dan jangan push file `.env.local`.
- Jangan memberi awalan `NEXT_PUBLIC_` pada environment variable.
- Isi `PROMPTS.md` setiap menyelesaikan fitur.

## Sebelum mengumpulkan

1. Jalankan semua poin di `docs/checklist-keamanan.md` dan `docs/checklist-pengujian.md` pada link Vercel.
2. Lengkapi bagian di bawah ini.
3. Push perubahan terakhir sebelum batas waktu.

## Tentang aplikasi ini

- **Nama usaha:**
- **Pembuat:**
- **Link aplikasi:**
- **Fitur bonus yang dikerjakan:**
