# Rancangan Teknis

## Alur data

```
Browser pengunjung/admin
        |
        v
Next.js di Vercel (server)          <- semua akses Supabase terjadi di sini
  - Server Component: membaca data
  - Server Action: memproses form
  - proxy.js: menjaga halaman /admin
        |
        v
Supabase
  - Tabel produk (RLS aktif)
  - Auth (akun admin)
```

Browser tidak pernah berhubungan langsung dengan Supabase. Alamat proyek dan kunci Supabase hanya ada di server.

## Dua jenis koneksi Supabase

| Koneksi | Kunci | Dipakai untuk |
| --- | --- | --- |
| Koneksi server untuk pengunjung | `SUPABASE_SECRET_KEY` | Membaca katalog dan detail produk (pengunjung tidak login, dan RLS menolak akses publik) |
| Koneksi sesi admin | `SUPABASE_PUBLISHABLE_KEY` + cookie login (`@supabase/ssr`) | Login, keluar, ganti password, dan aksi tambah/ubah/hapus produk |

Kunci rahasia melewati semua aturan RLS, jadi hanya dipakai untuk membaca data publik. Aksi yang mengubah data memakai koneksi sesi admin, sehingga RLS tetap berlaku.

## Struktur folder

```
app/
  page.jsx                  katalog (US-01)
  produk/[id]/page.jsx      detail produk (US-02)
  admin/
    login/page.jsx          login (US-04)
    page.jsx                daftar produk admin (US-07, bonus)
    password/page.jsx       ganti password (US-05)
    produk/baru/page.jsx    tambah produk (US-08, bonus)
    produk/[id]/ubah/...    ubah produk (US-09, bonus)
components/                 komponen tampilan (lihat DESIGN.md)
lib/
  toko.js                   identitas toko dan nomor WhatsApp
  data-contoh.js            data contoh sebelum terhubung database
  format.js                 format rupiah
docs/                       dokumen proyek
```

File yang akan dibuat saat mengerjakan user story:

```
lib/supabase/            koneksi Supabase untuk server
app/admin/actions.js     Server Action untuk login, ganti password, dan kelola produk
proxy.js                 proteksi halaman /admin (US-06)
```

## Pesan WhatsApp (US-03)

Format link: `https://wa.me/<nomor>?text=<pesan>`

- `<nomor>` diambil dari `lib/toko.js`, format internasional tanpa tanda + (contoh `6281234567890`).
- `<pesan>` berisi nama dan harga produk, di-encode dengan `encodeURIComponent`.

## Akun admin

Akun admin dibuat dari skrip di panduan workshop (bukan dari aplikasi) dan password bawaannya wajib diganti lewat US-05. Pendaftaran akun baru dimatikan di pengaturan Supabase Auth.
