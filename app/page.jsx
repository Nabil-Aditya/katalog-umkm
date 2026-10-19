import KartuProduk from "@/components/KartuProduk";
import FilterPencarian from "@/components/FilterPencarian";
import { toko } from "@/lib/toko";
import { buatKlienServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanKatalog({ searchParams }) {
  const sp = (await searchParams) || {};
  const q = sp?.q?.trim() || "";
  const kategori = sp?.kategori?.trim() || "";

  let daftarProduk = null;
  let daftarKategori = [];
  let pesanError = null;

  try {
    const supabase = buatKlienServer();

    // Ambil daftar kategori unik
    const { data: kategoriRows } = await supabase.from("produk").select("kategori");
    daftarKategori = Array.from(
      new Set((kategoriRows || []).map((item) => item.kategori?.trim()).filter(Boolean))
    ).sort();

    // Query produk dengan filter pencarian dan kategori jika ada
    let query = supabase.from("produk").select("*");

    if (q) {
      query = query.or(`nama.ilike.%${q}%,deskripsi.ilike.%${q}%`);
    }

    if (kategori) {
      query = query.eq("kategori", kategori);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      pesanError = error.message || "Gagal mengambil data produk dari database.";
    } else {
      daftarProduk = data;
    }
  } catch (err) {
    pesanError = err.message || "Gagal menghubungkan ke database Supabase.";
  }

  const adaFilter = Boolean(q || kategori);

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
        <div className="flex flex-col gap-4">
          <h2 id="judul-produk" className="text-xl font-bold">
            Produk kami
          </h2>
          <FilterPencarian
            basePath="/"
            q={q}
            kategoriAktif={kategori}
            daftarKategori={daftarKategori}
          />
        </div>

        {pesanError ? (
          <div className="rounded-xl border border-garis bg-permukaan p-4 text-bahaya">
            <p className="font-semibold">Gagal memuat produk</p>
            <p className="mt-1 text-sm">{pesanError}</p>
          </div>
        ) : daftarProduk && daftarProduk.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {daftarProduk.map((produk) => (
              <KartuProduk key={produk.id} produk={produk} />
            ))}
          </div>
        ) : adaFilter ? (
          <div className="rounded-2xl border border-garis p-8 text-center text-teks-lembut">
            Tidak ada produk yang cocok dengan pencarianmu.
          </div>
        ) : (
          <p className="text-teks-lembut">Belum ada produk</p>
        )}
      </section>
    </>
  );
}
