import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import {Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { FloatInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdLockOutline, MdMailOutline } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { LuEye, LuEyeClosed } from "react-icons/lu";

interface LoginProps {
  buttonClassName?: string;
  dialogClassName?: string;
  formClassName?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function Login({
  buttonClassName,
  dialogClassName,
  formClassName,
  open,
  onOpenChange,
}: LoginProps) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [processing, setProcessing] = useState(false);

  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<{ email?: string; password?: string }>({});
  const handleLogin = () => {
    window.location.href = '/auth/google'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; password?: string } = {};
    if (!data.email.trim()) newErrors.email = "Email tidak boleh kosong.";
    if (!data.password.trim()) newErrors.password = "Password tidak boleh kosong.";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setError({});
    setProcessing(true);

    router.post('/login', data, {
      preserveScroll: true,
      onError: (errors: any) => {
        setError({
          email: errors.email ? "Email yang Anda masukkan salah." : undefined,
          password: errors.password ? "Password yang Anda masukkan salah." : undefined,
        });
        setProcessing(false);
      },
      onSuccess: () => {
        setProcessing(false);
        onOpenChange(false);
      }
    });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className={`flex items-center space-x-2 text-black px-4 py-2 hover:bg-gray-300 cursor-pointer rounded-md ${buttonClassName}`}
          >
            Log In
          </Button>
        </DialogTrigger>
        <DialogContent
          className={` w-[95%] md:w-sm p-6 bg-white rounded-4xl shadow-lg text-black ${dialogClassName}`}
        >
          <DialogHeader className="items-center gap-y-3">
            <div>
              <DialogTitle className="text-2xl md:text-3xl font-bold text-center">
                Selamat Datang!
              </DialogTitle>
              <p className="text-xs w-full md:text-sm text-gray-600 text-center">
                Silakan masukkan email dan password untuk melanjutkan.
              </p>
            </div>
          </DialogHeader>
          <form onSubmit={handleSubmit} className={formClassName}>
            <div className="flex flex-col space-y-4">
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
                {error.password && <p className="text-xs text-red-600">{error.password}</p>}
              </div>
            </div>

            <div className="flex justify-end items-center">
              <Link
                href="#"
                className="text-sm mb-4 text-gray-600 hover:text-black transition-all text-center"
              >
                Lupa Password?
              </Link>
            </div>

            <Button
              variant="secondary"
              type="submit"
              disabled={processing}
              className="w-full cursor-pointer hover:bg-black transition-all duration-300"
            >
              {processing ? "Memproses..." : "Masuk"}
            </Button>

            <p className="text-center text-gray-500 text-sm w-full my-2 select-none">Atau</p>

            <Button
              onClick={handleLogin}
              type="button"
              variant="google"
              className="flex items-center justify-center w-full py-2 "
            >
              <FcGoogle className="text-black" />
              <span className="ml-2 text-sm">Masuk dengan Google</span>
            </Button>

          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
