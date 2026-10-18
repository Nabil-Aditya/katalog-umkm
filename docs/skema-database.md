# Skema Database

## Tabel `produk`

| Kolom | Tipe | Keterangan |
| --- | --- | --- |
| `id` | bigint | Nomor unik, dibuat otomatis |
| `nama` | text | Nama produk, wajib diisi |
| `harga` | integer | Harga dalam rupiah, tidak boleh negatif |
| `deskripsi` | text | Penjelasan produk |
| `foto_url` | text | Link gambar produk |
| `kategori` | text | Kelompok produk, misalnya "Camilan" |
| `created_at` | timestamptz | Waktu dibuat, otomatis |

## Aturan akses (RLS)

Row Level Security aktif di tabel `produk`.

| Siapa | Baca | Tambah | Ubah | Hapus |
| --- | --- | --- | --- | --- |
| Publik (tanpa login) | Ditolak | Ditolak | Ditolak | Ditolak |
| Admin yang login | Boleh | Boleh | Boleh | Boleh |

Pengunjung tetap bisa melihat katalog karena data dibaca oleh server memakai kunci rahasia, bukan langsung dari browser.

Skrip lengkap ada di `docs/schema.sql`.
