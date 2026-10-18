# Checklist Keamanan

Cek semua poin ini sebelum mengumpulkan karya. Poin ini juga dipakai saat penilaian.

- [ ] Buka situs di browser, klik kanan > Inspect > tab Network. Muat ulang halaman: tidak ada permintaan ke alamat `supabase.co`.
- [ ] Cari kata `supabase` dan `NEXT_PUBLIC` di seluruh kode: tidak ada environment variable berawalan `NEXT_PUBLIC_`.
- [ ] File `.env.local` tidak ikut ter-push ke GitHub (cek di halaman repo).
- [ ] Buka `/admin` di jendela penyamaran (incognito) tanpa login: dialihkan ke `/admin/login`.
- [ ] Buka `/admin/password` tanpa login: dialihkan ke `/admin/login`.
- [ ] Login dengan password bawaan: gagal, karena password sudah diganti.
- [ ] RLS di tabel `produk` aktif (Supabase > Table Editor > produk: tidak ada label "RLS disabled").
- [ ] Tidak ada email, password, atau kunci yang ditulis di kode.
- [ ] (Bonus) Aksi tambah, ubah, dan hapus produk ditolak jika tidak login.
