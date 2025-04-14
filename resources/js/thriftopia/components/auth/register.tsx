import { useState } from "react";
// import { FormEventHandler } from 'react';
import { Link, useForm } from "@inertiajs/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FloatInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdLockOutline, MdMailOutline, MdOutlinePersonOutline  } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { LuEye, LuEyeClosed,  } from "react-icons/lu";
// import password_confirmation from "@/pages/auth/confirm-password";


// type RegisterProps ={
//   buttonClassName?: string;
//   dialogClassName?: string;
//   formClassName?: string;
// };

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  [key: string]: string;
}


export default function Register(){
  const { data, setData, post, processing, reset } = useForm<RegisterForm>({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});
const [error, setError] = useState<{ name?: string; email?: string; password?: string; password_confirmation?:string }>({});
const handleLogin = () => {
  window.location.href = '/auth/google'
}

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; email?: string; password?: string; password_confirmation?:string } = {};
    if (!data.name.trim()) newErrors.name = "Username tidak boleh kosong.";
    if (!data.email.trim()) newErrors.email = "Email tidak boleh kosong.";
    if (!data.password) {
      newErrors.password = "Password wajib diisi";
  } else if (data.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter";
  }
    if (!data.password_confirmation) {
      newErrors.password_confirmation = "Konfirmasi password wajib diisi";
  } else if (data.password !== data.password_confirmation) {
      newErrors.password_confirmation = "Password tidak cocok";
  }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
    
    setError({});

    post(route('register'), {
        onSuccess: () => {
            reset();
        },
        onError: (errors) => {
            setError({
              email: errors.email ? "Email sudah digunakan" : undefined,
              // password: errors.password ? "Password harus berjumlah 8 karakter." : undefined,
              // password_confirmation: errors.password_confirmation ? "Password tidak cocok" : undefined,
            });
            console.log(errors);
        }
    });
};
  

  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
        variant="default"
        className={`flex items-center space-x-2  bg-[#1a1a1a] text-white cursor-pointer rounded-md `}>
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className={`w-sm p-6 bg-white rounded-4xl shadow-lg text-black`}>
        <DialogHeader className="items-center gap-y-3 ">
          <div>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-center">Daftar Sekarang!</DialogTitle>
            <p className="text-xs md:text-sm w-full text-gray-600 text-center">Buat akun untuk menikmati penawaran eksklusif dan pengalaman belanja terbaik.</p>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <div>
            <span className="items-center relative w-full">
              <MdOutlinePersonOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl z-10" />
              
              <FloatInput
                label="Username"
                type="text"
                value={data.name}
                onChange={(value) => setData('name', value)}
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
                onChange={(value) => setData('email', value)}
              />
            </span>
            {error.email && <p className="text-xs text-red-600">{error.email}</p>}
            </div>
            <div>
            <span className="items-center relative w-full">
              <MdLockOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl z-10"/>

              <FloatInput
                label="Password"
                type={visible ? "text" : "password"}
                value={data.password}
                onChange={(value) => setData('password', value)}
              />
              <Button
              variant="link"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black z-10 cursor-pointer "
                type="button"
                onClick={() => setVisible(!visible)}
              >
                {visible ? <LuEye/> : <LuEyeClosed/>}              
                </Button> 
            </span>
            {error.password && <p className="text-xs text-red-600">{error.password}</p>}
            </div>

            <div>
            <span className="items-center relative w-full">
              <MdLockOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl z-10"/>

              <FloatInput
                label="Konfirmasi Password"
                type={visibleConfirm ? "text" : "password"}
                value={data.password_confirmation}
                onChange={(value) => setData('password_confirmation', value)}
              />
              <Button
              variant="link"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black z-10 cursor-pointer "
                type="button"
                onClick={() => setVisibleConfirm(!visibleConfirm)}
              >
                {visibleConfirm ? <LuEye/> : <LuEyeClosed/>}              
                </Button> 
            </span>
            {error.password_confirmation && <p className="text-xs text-red-600">{error.password_confirmation}</p>}

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

          <Button variant="secondary" type="submit" disabled={processing} className="w-full cursor-pointer hover:bg-black transition-all duration-300">
            {processing ? "Memproses..." : "Daftar"}
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
  );
}
