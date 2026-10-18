import Link from "next/link";

export default function NavAdmin() {
  return (
    <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-garis pb-4 text-sm">
      <Link href="/admin" className="font-semibold hover:text-utama">
        Produk
      </Link>
      <Link href="/admin/password" className="font-semibold hover:text-utama">
        Ganti password
      </Link>
      {/* US-04: tombol keluar belum berfungsi */}
      <button type="button" className="ml-auto text-teks-lembut hover:text-bahaya">
        Keluar
      </button>
    </nav>
  );
}
