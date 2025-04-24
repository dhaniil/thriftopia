import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FloatInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdLockOutline, MdMailOutline, MdPersonOutline } from "react-icons/md";
import { LuEye, LuEyeClosed } from "react-icons/lu";

interface RegisterProps {
  buttonClassName?: string;
  dialogClassName?: string;
  formClassName?: string;
}

export default function Register({ buttonClassName, dialogClassName, formClassName }: RegisterProps) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [processing, setProcessing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [error, setError] = useState<{
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      password_confirmation?: string;
    } = {};

    if (!data.name.trim()) newErrors.name = "Nama tidak boleh kosong.";
    if (!data.email.trim()) newErrors.email = "Email tidak boleh kosong.";
    if (!data.password.trim())
      newErrors.password = "Password tidak boleh kosong.";
    if (!data.password_confirmation.trim())
      newErrors.password_confirmation = "Konfirmasi password tidak boleh kosong.";
    if (data.password !== data.password_confirmation)
      newErrors.password_confirmation = "Password tidak sesuai.";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setError({});
    setProcessing(true);

    router.post('/register', data, {
      preserveScroll: true,
      onError: (errors: any) => {
        setError(errors);
        setProcessing(false);
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`flex items-center space-x-2 text-black px-4 py-2 hover:bg-gray-300 cursor-pointer rounded-md ${buttonClassName}`}
        >
          Daftar
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`w-[95%] md:w-sm p-6 bg-white rounded-4xl shadow-lg text-black ${dialogClassName}`}
      >
        <DialogHeader className="items-center gap-y-3">
          <div>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-center">
              Buat Akun
            </DialogTitle>
            <p className="text-xs w-full md:text-sm text-gray-600 text-center">
              Silakan isi formulir di bawah ini untuk membuat akun.
            </p>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className={formClassName}>
          <div className="flex flex-col space-y-4">
            <div>
              <span className="items-center relative w-full">
                <MdPersonOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl z-10" />

                <FloatInput
                  label="Nama"
                  type="text"
                  value={data.name}
                  onChange={(value) => setData(prev => ({ ...prev, name: value }))}
                />
              </span>
              {error.name && <p className="text-xs text-red-600">{error.name}</p>}
            </div>

            <div>
              <span className="items-center relative w-full">
                <MdMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl z-10" />

                <FloatInput
                  label="Email"
                  type="email"
                  value={data.email}
                  onChange={(value) => setData(prev => ({ ...prev, email: value }))}
                />
              </span>
              {error.email && <p className="text-xs text-red-600">{error.email}</p>}
            </div>

            <div>
              <span className="items-center relative w-full">
                <MdLockOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl z-10" />

                <FloatInput
                  label="Password"
                  type={visible ? "text" : "password"}
                  value={data.password}
                  onChange={(value) => setData(prev => ({ ...prev, password: value }))}
                />
                <Button
                  variant="link"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black z-10 cursor-pointer"
                  type="button"
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? <LuEye /> : <LuEyeClosed />}
                </Button>
              </span>
              {error.password && (
                <p className="text-xs text-red-600">{error.password}</p>
              )}
            </div>

            <div>
              <span className="items-center relative w-full">
                <MdLockOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl z-10" />

                <FloatInput
                  label="Konfirmasi Password"
                  type={visibleConfirm ? "text" : "password"}
                  value={data.password_confirmation}
                  onChange={(value) =>
                    setData(prev => ({ ...prev, password_confirmation: value }))
                  }
                />
                <Button
                  variant="link"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black z-10 cursor-pointer"
                  type="button"
                  onClick={() => setVisibleConfirm(!visibleConfirm)}
                >
                  {visibleConfirm ? <LuEye /> : <LuEyeClosed />}
                </Button>
              </span>
              {error.password_confirmation && (
                <p className="text-xs text-red-600">
                  {error.password_confirmation}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={processing}
            className="w-full mt-4 cursor-pointer hover:bg-black transition-all duration-300"
          >
            {processing ? "Memproses..." : "Daftar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
