# Problem Statement dan Sketsa

## Problem statement

Pemilik UMKM rumahan menerima pesanan lewat WhatsApp, tetapi calon pembeli tidak punya satu tempat untuk melihat daftar produk, harga, dan deskripsi yang selalu terbaru. Akibatnya pemilik harus mengirim foto dan harga berulang kali ke setiap calon pembeli, pesanan sering salah sebut nama produk atau harga, dan pembeli baru sulit menemukan toko.

**Pengguna:** pemilik UMKM (admin) dan calon pembeli (pengunjung).

**Dampak:** waktu pemilik habis untuk membalas pertanyaan yang sama, dan peluang penjualan hilang karena informasi produk tidak mudah diakses.

**Solusi yang dibangun:** katalog online yang bisa dibagikan sebagai satu link. Pengunjung memilih produk lalu langsung memesan lewat WhatsApp dengan pesan otomatis berisi nama dan harga produk. Pemilik mengelola produk sendiri dari halaman admin.

## Sketsa halaman

### Katalog (`/`)

```
+------------------------------------------+
| Nama Toko                                |
+------------------------------------------+
| NAMA TOKO (besar)                        |
| Tagline singkat                          |
| Jam buka                                 |
|                                          |
| Produk kami                              |
| +--------+ +--------+ +--------+         |
| | foto   | | foto   | | foto   |         |
| | kategori| | ...    | | ...    |        |
| | nama   | |        | |        |         |
| | [harga]| |        | |        |         |
| +--------+ +--------+ +--------+         |
+------------------------------------------+
| Alamat, jam buka      Masuk sebagai admin|
+------------------------------------------+
```

### Detail produk (`/produk/[id]`)

```
+------------------------------------------+
| +-------------+  Kembali ke katalog      |
| |             |  kategori                |
| |    foto     |  NAMA PRODUK             |
| |             |  [harga]                 |
| +-------------+  deskripsi               |
|                  [ Pesan via WhatsApp ]  |
+------------------------------------------+
```

### Login admin (`/admin/login`)

```
+----------------------+
| Masuk admin          |
| Email    [         ] |
| Password [         ] |
| [ Masuk ]            |
+----------------------+
```

### Admin: daftar produk (`/admin`)

```
+------------------------------------------+
| Produk | Ganti password          Keluar  |
+------------------------------------------+
| Produk                 [Tambah produk]   |
| foto nama      kategori  harga [Ubah][Hapus]
| foto nama      kategori  harga [Ubah][Hapus]
+------------------------------------------+
```

### Admin: ganti password (`/admin/password`)

```
+----------------------------+
| Ganti password             |
| Password baru       [    ] |
| Ulangi password baru[    ] |
| [ Simpan password ]        |
+----------------------------+
```
