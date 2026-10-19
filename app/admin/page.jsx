import NavAdmin from "@/components/NavAdmin";
import TabelProduk from "@/components/TabelProduk";
import Tombol from "@/components/Tombol";
import { buatKlienAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function HalamanAdmin({ searchParams }) {
  const { error: paramError } = (await searchParams) || {};
  const supabase = await buatKlienAdmin();

  const { data: daftarProduk, error: dbError } = await supabase
    .from("produk")
    .select("*")
    .order("created_at", { ascending: false });

  const error = paramError ? decodeURIComponent(paramError) : dbError?.message;

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Produk</h1>
        <Tombol href="/admin/produk/baru">Tambah produk</Tombol>
      </div>

      {error && (
        <div className="rounded-lg border border-garis bg-permukaan p-3 text-sm text-bahaya">
          {error}
        </div>
      )}

      {!daftarProduk || daftarProduk.length === 0 ? (
        <div className="rounded-2xl border border-garis p-8 text-center text-teks-lembut">
          Belum ada produk. Klik tombol di atas untuk menambah produk.
        </div>
      ) : (
        <TabelProduk daftarProduk={daftarProduk} />
      )}
    </div>
  );
}
