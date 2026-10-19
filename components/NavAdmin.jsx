import Link from "next/link";
import { logout } from "@/app/admin/actions";

export default function NavAdmin() {
  return (
    <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-garis pb-4 text-sm">
      <Link href="/admin" className="font-semibold hover:text-utama">
        Produk
      </Link>
      <Link href="/admin/password" className="font-semibold hover:text-utama">
        Ganti password
      </Link>
      <form action={logout} className="ml-auto">
        <button type="submit" className="text-teks-lembut hover:text-bahaya">
          Keluar
        </button>
      </form>
    </nav>
  );
}
