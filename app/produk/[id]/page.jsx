import Link from "next/link";
import { notFound } from "next/navigation";
import TombolWhatsApp from "@/components/TombolWhatsApp";
import CatatanBelumAktif from "@/components/CatatanBelumAktif";
import { cariProdukContoh } from "@/lib/data-contoh";
import { formatRupiah } from "@/lib/format";

// US-02: halaman ini masih memakai data contoh.
// Tugas peserta: ambil satu produk dari Supabase berdasarkan id, di sisi server.
export default async function HalamanDetailProduk({ params }) {
  const { id } = await params;
  const produk = cariProdukContoh(id);

  if (!produk) {
    notFound();
  }

  return (
    <article className="grid gap-8 py-8 md:grid-cols-2 md:py-12">
      <img
        src={produk.foto_url}
        alt={produk.nama}
        className="aspect-square w-full rounded-2xl border border-garis bg-permukaan object-cover"
      />
      <div className="flex flex-col gap-4">
        <Link href="/" className="text-sm text-teks-lembut underline underline-offset-4 hover:text-utama">
          Kembali ke katalog
        </Link>
        <p className="text-sm text-teks-lembut">{produk.kategori}</p>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight">{produk.nama}</h1>
        <p className="self-start rounded-md bg-harga-latar px-3 py-1 text-xl font-bold text-harga">
          {formatRupiah(produk.harga)}
        </p>
        <p className="max-w-prose leading-relaxed text-teks-lembut">{produk.deskripsi}</p>
        <TombolWhatsApp produk={produk} />
        <CatatanBelumAktif>Tombol pesan belum berfungsi: lihat US-03.</CatatanBelumAktif>
      </div>
    </article>
  );
}
