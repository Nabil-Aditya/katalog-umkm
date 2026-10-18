import Tombol from "@/components/Tombol";

export default function TidakDitemukan() {
  return (
    <div className="flex flex-col items-start gap-4 py-16">
      <h1 className="text-2xl font-extrabold">Halaman tidak ditemukan</h1>
      <p className="text-teks-lembut">Produk atau halaman yang kamu cari tidak ada atau sudah dihapus.</p>
      <Tombol href="/">Lihat semua produk</Tombol>
    </div>
  );
}
