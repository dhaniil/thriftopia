import React from 'react';
import GoogleLoginButton from '@/components/google-button'

const LoginPage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="bg-white/10 backdrop-blur-lg border w-1/4 rounded items-center flex flex-col p-2">
                <h2 className="text-2xl font-bold mb-4 text-white text-center">Login Gugel</h2>
                <GoogleLoginButton />
            </div>
        </div>
    );
};

export default LoginPage;
