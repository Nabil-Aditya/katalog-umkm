import { notFound } from "next/navigation";
import NavAdmin from "@/components/NavAdmin";
import FormProduk from "@/components/FormProduk";
import CatatanBelumAktif from "@/components/CatatanBelumAktif";
import { cariProdukContoh } from "@/lib/data-contoh";

// US-09 (bonus di jalur offline): ubah produk.
export default async function HalamanUbahProduk({ params }) {
  const { id } = await params;
  const produk = cariProdukContoh(id);

  if (!produk) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <h1 className="text-2xl font-extrabold">Ubah produk</h1>
      <CatatanBelumAktif>Simpan perubahan belum berfungsi: lihat US-09.</CatatanBelumAktif>
      <FormProduk produk={produk} labelTombol="Simpan perubahan" />
    </div>
  );
}
