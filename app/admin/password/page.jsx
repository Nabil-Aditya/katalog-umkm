import NavAdmin from "@/components/NavAdmin";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import CatatanBelumAktif from "@/components/CatatanBelumAktif";

// US-05: form ganti password belum berfungsi.
// Tugas peserta: admin yang sudah login bisa mengganti password-nya, diproses di server.
export default function HalamanGantiPassword() {
  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div>
        <h1 className="text-2xl font-extrabold">Ganti password</h1>
        <p className="mt-1 text-sm text-teks-lembut">
          Ganti password bawaan segera setelah pertama kali masuk. Minimal 8 karakter.
        </p>
      </div>
      <form className="flex max-w-sm flex-col gap-4">
        <Input
          label="Password baru"
          name="password_baru"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
        <Input
          label="Ulangi password baru"
          name="konfirmasi_password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
        <Tombol type="submit" className="self-start">
          Simpan password
        </Tombol>
      </form>
      <CatatanBelumAktif>Ganti password belum berfungsi: lihat US-05.</CatatanBelumAktif>
    </div>
  );
}
