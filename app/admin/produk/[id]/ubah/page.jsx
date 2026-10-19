import { notFound } from "next/navigation";
import NavAdmin from "@/components/NavAdmin";
import FormProduk from "@/components/FormProduk";
import { buatKlienAdmin } from "@/lib/supabase/admin";
import { ubahProduk } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function HalamanUbahProduk({ params, searchParams }) {
  const { id } = await params;
  const { error } = (await searchParams) || {};
  const supabase = await buatKlienAdmin();

  const { data: produk, error: dbError } = await supabase
    .from("produk")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (dbError || !produk) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <h1 className="text-2xl font-extrabold">Ubah produk</h1>

      {error && (
        <div className="rounded-lg border border-garis bg-permukaan p-3 text-sm text-bahaya">
          {decodeURIComponent(error)}
        </div>
      )}

      <FormProduk produk={produk} action={ubahProduk} labelTombol="Simpan perubahan" />
    </div>
  );
}
