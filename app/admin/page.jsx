import NavAdmin from "@/components/NavAdmin";
import TabelProduk from "@/components/TabelProduk";
import Tombol from "@/components/Tombol";
import FilterPencarian from "@/components/FilterPencarian";
import { buatKlienAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function HalamanAdmin({ searchParams }) {
  const sp = (await searchParams) || {};
  const q = sp?.q?.trim() || "";
  const kategori = sp?.kategori?.trim() || "";
  const paramError = sp?.error;
  const supabase = await buatKlienAdmin();

  // Ambil daftar kategori unik
  const { data: kategoriRows } = await supabase.from("produk").select("kategori");
  const daftarKategori = Array.from(
    new Set((kategoriRows || []).map((item) => item.kategori?.trim()).filter(Boolean))
  ).sort();

  // Query produk dengan pencarian dan filter jika ada
  let query = supabase.from("produk").select("*");

  if (q) {
    query = query.or(`nama.ilike.%${q}%,deskripsi.ilike.%${q}%`);
  }

  if (kategori) {
    query = query.eq("kategori", kategori);
  }

  const { data: daftarProduk, error: dbError } = await query.order("created_at", {
    ascending: false,
  });

  const error = paramError ? decodeURIComponent(paramError) : dbError?.message;
  const adaFilter = Boolean(q || kategori);

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Produk</h1>
        <Tombol href="/admin/produk/baru">Tambah produk</Tombol>
      </div>

      {/* Filter dan Pencarian Produk Admin */}
      <FilterPencarian
        basePath="/admin"
        q={q}
        kategoriAktif={kategori}
        daftarKategori={daftarKategori}
      />

      {error && (
        <div className="rounded-lg border border-garis bg-permukaan p-3 text-sm text-bahaya">
          {error}
        </div>
      )}

      {!daftarProduk || daftarProduk.length === 0 ? (
        <div className="rounded-2xl border border-garis p-8 text-center text-teks-lembut">
          {adaFilter
            ? "Tidak ada produk yang cocok dengan pencarian atau filter kategori."
            : "Belum ada produk. Klik tombol di atas untuk menambah produk."}
        </div>
      ) : (
        <TabelProduk daftarProduk={daftarProduk} />
      )}
    </div>
  );
}
