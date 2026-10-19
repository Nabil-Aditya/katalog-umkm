import Link from "next/link";

export default function FilterPencarian({
  basePath = "/",
  q = "",
  kategoriAktif = "",
  daftarKategori = [],
}) {
  const buatLink = (kat) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (kat) params.set("kategori", kat);
    const queryString = params.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  };

  const adaFilter = Boolean(q || kategoriAktif);

  return (
    <div className="flex flex-col gap-3">
      {/* Form Pencarian */}
      <form method="GET" action={basePath} className="flex gap-2">
        {kategoriAktif && (
          <input type="hidden" name="kategori" value={kategoriAktif} />
        )}
        <div className="relative flex-1">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Cari nama atau deskripsi produk..."
            className="w-full rounded-lg border border-garis bg-latar px-3.5 py-2 text-sm text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
            suppressHydrationWarning
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-utama px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-utama-gelap"
          suppressHydrationWarning
        >
          Cari
        </button>
        {adaFilter && (
          <Link
            href={basePath}
            className="flex items-center rounded-lg border border-garis px-3 py-2 text-sm font-medium text-teks-lembut transition-colors hover:border-bahaya hover:text-bahaya"
          >
            Reset
          </Link>
        )}
      </form>

      {/* Filter Kategori */}
      {daftarKategori.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          <Link
            href={buatLink("")}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              !kategoriAktif
                ? "bg-utama text-white"
                : "border border-garis bg-latar text-teks-lembut hover:border-utama hover:text-utama"
            }`}
          >
            Semua
          </Link>
          {daftarKategori.map((kat) => {
            const isActive = kategoriAktif === kat;
            return (
              <Link
                key={kat}
                href={buatLink(kat)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-utama text-white"
                    : "border border-garis bg-latar text-teks-lembut hover:border-utama hover:text-utama"
                }`}
              >
                {kat}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

