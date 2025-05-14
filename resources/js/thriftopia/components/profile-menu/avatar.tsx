import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

interface AvatarProps {
    name: string;
    imageUrl?: string;
}

const Avatar = ({ name, imageUrl }: AvatarProps) => {
    const [avatar, setAvatar] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (imageUrl) {
            setAvatar(imageUrl);
            setLoading(false);
        } else {
            fetch(`/avatar?name=${encodeURIComponent(name)}`)
                .then((res) => res.json())
                .then((data) => {
                    setAvatar(data.avatar);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [name, imageUrl]);

    if (loading) {
        return (
            <div className="w-full h-full ring-1 ring-gray-400 bg-gray-200 p-0.5 rounded-full flex items-center justify-center">
                <div className="animate-pulse w-full h-full bg-gray-300 rounded-full" />
            </div>
        );
    }

    if (!avatar) {
        return (
            <div className="w-full h-full ring-1 ring-gray-400 bg-gray-200 p-0.5 rounded-full flex items-center justify-center">
                <FaUser className="w-1/2 h-1/2 text-gray-400" />
            </div>
        );
    }

    return (
        <img 
            src={avatar}
            alt={name}
            className="w-full h-full ring-1 ring-gray-400 bg-gray-200 p-0.5 rounded-full object-cover"
            draggable="false"
            loading="lazy"
        />
    );
};

export default Avatar;
