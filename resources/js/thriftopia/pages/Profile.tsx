import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import ProfileContent from "@/components/profile-menu/profile";
import { Head } from '@inertiajs/react';


export default function Profile() {
    return (
        <>
        <Head title="Profile Saya" />
        
        <div className="bg-[#f2f2f2] min-h-screen">
            <div className="flex justify-center">
                <Navbar />
            </div>
            <main className="container mx-auto my-25 md:mt-40 text-center">
            <ProfileContent/>
            {/* <ProfileContentTes/> */}
            </main>
            <Footer />
        </div>
        </>

    );
};