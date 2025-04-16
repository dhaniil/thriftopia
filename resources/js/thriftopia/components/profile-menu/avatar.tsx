import React, { useEffect, useState } from "react";
// import { Link, useForm } from "@inertiajs/react";

const Avatar = ({ name }: { name: string }) => {
    const [avatar, setAvatar] = useState<string>('');

    useEffect(() => {
        fetch(`http://localhost:8000/avatar?name=${encodeURIComponent(name)}`)
            .then((res) => res.json())
            .then((data) => setAvatar(data.avatar));
    }, [name]);

    return (
        <img 
            src={avatar} 
            alt="" 
            className="w-full h-full ring-1 ring-gray-400 bg-gray-200 p-0.5 rounded-full object-cover"
            draggable="false"
        />
    );
};

export default Avatar;
