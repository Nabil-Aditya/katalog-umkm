import KartuProduk from "@/components/KartuProduk";
import CatatanBelumAktif from "@/components/CatatanBelumAktif";
import { produkContoh } from "@/lib/data-contoh";
import { toko } from "@/lib/toko";

// US-01: halaman ini masih memakai data contoh.
// Tugas peserta: ambil daftar produk dari tabel "produk" di Supabase, di sisi server.
export default function HalamanKatalog() {
  const daftarProduk = produkContoh;

  return (
    <>
      <section className="py-10 sm:py-14">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {toko.nama}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-teks-lembut">{toko.tagline}</p>
        <p className="mt-4 text-sm text-teks-lembut">{toko.jamBuka}</p>
      </section>

      <section aria-labelledby="judul-produk" className="flex flex-col gap-5">
        <h2 id="judul-produk" className="text-xl font-bold">
          Produk kami
        </h2>
        <CatatanBelumAktif>
          Masih data contoh. Sambungkan ke database: lihat US-01 di docs/user-stories.md.
        </CatatanBelumAktif>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {daftarProduk.map((produk) => (
            <KartuProduk key={produk.id} produk={produk} />
          ))}
        </div>
      </section>
    </>
  );
}
