import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import CatatanBelumAktif from "@/components/CatatanBelumAktif";

// US-04: form login belum berfungsi.
// Tugas peserta: login admin memakai Supabase Auth (email dan password), diproses di server.
export default function HalamanLogin() {
  return (
    <div className="mx-auto flex max-w-sm flex-col gap-6 py-12">
      <div>
        <h1 className="text-2xl font-extrabold">Masuk admin</h1>
        <p className="mt-1 text-sm text-teks-lembut">Khusus pemilik toko untuk mengelola produk.</p>
      </div>
      <form className="flex flex-col gap-4">
        <Input label="Email" name="email" type="email" autoComplete="email" required />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        <Tombol type="submit">Masuk</Tombol>
      </form>
      <CatatanBelumAktif>Login belum berfungsi: lihat US-04.</CatatanBelumAktif>
    </div>
  );
}
