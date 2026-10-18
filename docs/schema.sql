-- Skema database Katalog UMKM
-- Cara pakai: Supabase > SQL Editor > New query > tempel seluruh isi file ini > Run.
-- Aman dijalankan ulang.

-- 1. Tabel produk
create table if not exists public.produk (
  id bigint generated always as identity primary key,
  nama text not null,
  harga integer not null check (harga >= 0),
  deskripsi text,
  foto_url text,
  kategori text,
  created_at timestamptz not null default now()
);

-- 2. Row Level Security
-- Tidak ada izin untuk publik: akses langsung ke tabel dari luar aplikasi ditolak.
-- Hanya admin yang sudah login yang boleh membaca dan mengubah data.
alter table public.produk enable row level security;

drop policy if exists "admin_baca_produk" on public.produk;
drop policy if exists "admin_tambah_produk" on public.produk;
drop policy if exists "admin_ubah_produk" on public.produk;
drop policy if exists "admin_hapus_produk" on public.produk;

create policy "admin_baca_produk" on public.produk
  for select to authenticated using (true);

create policy "admin_tambah_produk" on public.produk
  for insert to authenticated with check (true);

create policy "admin_ubah_produk" on public.produk
  for update to authenticated using (true) with check (true);

create policy "admin_hapus_produk" on public.produk
  for delete to authenticated using (true);

-- 3. Data produk awal (hanya diisi jika tabel masih kosong)
insert into public.produk (nama, harga, deskripsi, foto_url, kategori)
select * from (values
  ('Kopi Bubuk Robusta 250 g', 45000, 'Biji robusta disangrai sedang lalu digiling halus. Cocok untuk kopi tubruk dan kopi susu.', '/produk/kopi.svg', 'Minuman'),
  ('Keripik Singkong Balado', 15000, 'Singkong iris tipis, digoreng renyah, dibalut bumbu balado pedas manis.', '/produk/keripik.svg', 'Camilan'),
  ('Sambal Bawang Botol 150 ml', 25000, 'Cabai rawit dan bawang putih goreng dengan minyak, tahan hingga 2 bulan.', '/produk/sambal.svg', 'Bumbu'),
  ('Kue Nastar Toples 500 g', 85000, 'Nastar lembut dengan selai nanas buatan sendiri. Dikemas toples kedap udara.', '/produk/nastar.svg', 'Kue kering'),
  ('Tas Anyaman Pandan', 120000, 'Dianyam tangan dari daun pandan kering, dilapisi kain di bagian dalam.', '/produk/tas.svg', 'Kerajinan'),
  ('Kain Batik Cap 2 m', 175000, 'Batik cap motif parang di atas kain katun primisima, panjang 2 meter.', '/produk/batik.svg', 'Kain')
) as data_awal (nama, harga, deskripsi, foto_url, kategori)
where not exists (select 1 from public.produk);
