import React, { useEffect, useState } from "react";

interface AvatarProps {
    name: string;
    imageUrl?: string;
}

const Avatar = ({ name, imageUrl }: AvatarProps) => {
    const [avatar, setAvatar] = useState<string>('');

    useEffect(() => {
        if (imageUrl) {
            setAvatar(imageUrl);
        } else {
            fetch(`/avatar?name=${encodeURIComponent(name)}`)
                .then((res) => res.json())
                .then((data) => setAvatar(data.avatar));
        }
    }, [name, imageUrl]);

    return (
        <img 
            src={avatar} 
            alt=""
            className="w-full h-full ring-1 ring-gray-400 bg-gray-200 p-0.5 rounded-full object-cover"
            draggable="false"
            loading="lazy"
        />
    );
};

export default Avatar;
