import NavAdmin from "@/components/NavAdmin";
import FormProduk from "@/components/FormProduk";
import { tambahProduk } from "@/app/admin/actions";

export default async function HalamanTambahProduk({ searchParams }) {
  const { error } = (await searchParams) || {};

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <h1 className="text-2xl font-extrabold">Tambah produk</h1>

      {error && (
        <div className="rounded-lg border border-garis bg-permukaan p-3 text-sm text-bahaya">
          {decodeURIComponent(error)}
        </div>
      )}

      <FormProduk action={tambahProduk} labelTombol="Simpan produk" />
    </div>
  );
}
