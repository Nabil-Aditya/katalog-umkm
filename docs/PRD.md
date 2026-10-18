# PRD: Katalog UMKM + Order WhatsApp

## Tujuan

Membuat katalog produk online untuk satu UMKM, yang bisa dibagikan sebagai satu link, dengan pemesanan langsung lewat WhatsApp.

## Pengguna

| Pengguna | Kebutuhan |
| --- | --- |
| Pengunjung (calon pembeli) | Melihat produk, harga, dan deskripsi; memesan dengan cepat lewat WhatsApp |
| Admin (pemilik toko) | Masuk dengan aman, mengganti password, mengelola produk |

## Ruang lingkup

### Wajib (jalur offline)

| Fitur | User story |
| --- | --- |
| Katalog produk dari database | US-01 |
| Halaman detail produk | US-02 |
| Pesan via WhatsApp dengan pesan otomatis | US-03 |
| Login admin | US-04 |
| Ganti password admin | US-05 |
| Halaman admin hanya untuk admin yang login | US-06 |

### Bonus (jalur offline)

| Fitur | User story |
| --- | --- |
| List produk di halaman admin | US-07 |
| Tambah produk | US-08 |
| Ubah produk | US-09 |
| Hapus produk | US-10 |
| Filter kategori atau pencarian | US-11 |
| Pilih jumlah atau varian sebelum pesan | US-12 |
| Aplikasi bisa di-install di HP (PWA) | US-13 |
| Deskripsi produk dibuat AI | US-14 |

Pada jalur online, US-07 sampai US-14 menjadi wajib (kecuali US-12), ditambah fitur sesuai kebutuhan klien UMKM masing-masing.

## Di luar ruang lingkup

- Keranjang belanja dan pembayaran online
- Pendaftaran akun pengunjung
- Pendaftaran akun admin dari aplikasi (akun admin dibuat dari dashboard Supabase)

## Kriteria keberhasilan

- Aplikasi dapat dibuka siapa saja melalui link Vercel.
- Pengunjung bisa memesan produk lewat WhatsApp dalam maksimal 3 klik dari halaman katalog.
- Data produk tidak dapat dibaca atau diubah langsung dari luar aplikasi.
- Password admin bawaan sudah diganti.

## Batasan teknis

- Stack: Next.js 16, Tailwind CSS 4, Supabase, Vercel (seluruhnya paket gratis).
- Akses database hanya dari server; tidak ada kunci Supabase di browser.
- Foto produk memakai link gambar (upload foto ke Supabase Storage hanya di jalur online).
