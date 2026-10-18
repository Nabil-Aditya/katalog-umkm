# User Story

Setiap user story diberi nomor. Pakai nomor ini di prompt ("kerjakan US-01") dan di pesan commit (`US-01: katalog dari database`).

## Wajib

### US-01 Katalog dari database

Sebagai pengunjung, saya ingin melihat semua produk toko dalam satu halaman, supaya saya tahu apa saja yang dijual.

Kriteria selesai:

- Halaman `/` menampilkan semua produk dari tabel `produk` di Supabase, bukan dari `lib/data-contoh.js`.
- Data diambil di sisi server.
- Setiap kartu menampilkan foto, kategori, nama, dan harga dalam format rupiah.
- Jika belum ada produk, halaman menampilkan pesan yang jelas.

### US-02 Detail produk

Sebagai pengunjung, saya ingin melihat detail satu produk, supaya saya yakin sebelum memesan.

Kriteria selesai:

- Halaman `/produk/[id]` menampilkan foto, kategori, nama, harga, dan deskripsi dari database.
- Produk yang tidak ada menampilkan halaman "tidak ditemukan".

### US-03 Pesan via WhatsApp

Sebagai pengunjung, saya ingin menekan satu tombol untuk memesan lewat WhatsApp, supaya saya tidak perlu mengetik ulang nama produk.

Kriteria selesai:

- Tombol "Pesan via WhatsApp" membuka WhatsApp ke nomor di `lib/toko.js`.
- Pesan sudah terisi otomatis dengan nama dan harga produk.
- Berfungsi di HP dan di laptop.

### US-04 Login admin

Sebagai admin, saya ingin masuk dengan email dan password, supaya hanya saya yang bisa mengelola toko.

Kriteria selesai:

- Login memakai Supabase Auth, diproses di server.
- Login berhasil mengarah ke `/admin`; login gagal menampilkan pesan yang jelas.
- Tombol "Keluar" mengakhiri sesi dan kembali ke halaman login.

### US-05 Ganti password

Sebagai admin, saya ingin mengganti password, supaya password bawaan tidak bisa dipakai orang lain.

Kriteria selesai:

- Form di `/admin/password` mengganti password admin yang sedang login.
- Password baru minimal 8 karakter dan harus sama dengan konfirmasinya.
- Menampilkan pesan berhasil atau pesan error yang jelas.

### US-06 Proteksi halaman admin

Sebagai admin, saya ingin halaman admin tertutup untuk orang lain, supaya data toko aman.

Kriteria selesai:

- Membuka halaman `/admin` mana pun tanpa login akan dialihkan ke `/admin/login`.
- Setiap aksi yang mengubah data memeriksa login di server.

## Bonus

### US-07 List Produk
Sebagai admin, saya ingin produk pada page `/admin` mengambil data dari database.

### US-08 Tambah produk

Sebagai admin, saya ingin menambah produk baru dari halaman admin. Kriteria: form di `/admin/produk/baru` menyimpan produk ke database, lalu kembali ke `/admin`.

### US-09 Ubah produk

Sebagai admin, saya ingin mengubah data produk. Kriteria: form di `/admin/produk/[id]/ubah` terisi data lama dan menyimpan perubahan ke database.

### US-10 Hapus produk

Sebagai admin, saya ingin menghapus produk. Kriteria: tombol "Hapus" meminta konfirmasi, lalu menghapus produk dari database.

### US-11 Filter kategori atau pencarian

Sebagai pengunjung, saya ingin menyaring produk berdasarkan kategori atau mencari nama produk.

### US-12 Pilih jumlah atau varian

Sebagai pengunjung, saya ingin memilih jumlah atau varian sebelum memesan, dan pilihan itu ikut tertulis di pesan WhatsApp.

### US-13 PWA

Sebagai pengunjung, saya ingin memasang katalog di layar HP seperti aplikasi. Ikon tersedia di `public/icons`.

### US-14 Deskripsi produk dibuat AI

Sebagai admin, saya ingin membuat deskripsi produk secara otomatis dengan AI (Gemini API) dari nama dan kategori produk.

Catatan: bonus US-08, US-09, dan US-10 hanya dihitung jika aksinya terlindungi login.
