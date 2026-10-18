import NavAdmin from "@/components/NavAdmin";
import TabelProduk from "@/components/TabelProduk";
import Tombol from "@/components/Tombol";
import CatatanBelumAktif from "@/components/CatatanBelumAktif";
import { produkContoh } from "@/lib/data-contoh";

// US-06: halaman ini belum terlindungi. Siapa pun bisa membukanya.
// Tugas peserta: hanya admin yang sudah login boleh membuka semua halaman /admin.
export default function HalamanAdmin() {
  // US-07 (bonus): daftar produk masih memakai data contoh, belum dari database.
  const daftarProduk = produkContoh;

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Produk</h1>
        {/* US-08 (bonus): tambah produk */}
        <Tombol href="/admin/produk/baru">Tambah produk</Tombol>
      </div>
      <CatatanBelumAktif>
        Halaman admin belum terlindungi dan masih memakai data contoh: lihat US-06 dan US-07.
      </CatatanBelumAktif>
      <TabelProduk daftarProduk={daftarProduk} />
    </div>
  );
}
