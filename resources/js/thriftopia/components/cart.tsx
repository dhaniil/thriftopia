import Sidebar from "./navigation/sidebar";

export default function CartContent() {

    return (
        <div className="grid grid-cols-1 md:grid-cols-[0.4fr_1.6fr] mx-auto justify-center w-full px-6  md:px-20 gap-8 h- ">
            <Sidebar/>
            
        </div>

    )
}