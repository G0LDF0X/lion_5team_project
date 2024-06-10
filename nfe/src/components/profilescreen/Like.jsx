import React, { useEffect, useState } from "react";
import { mainAxiosInstance } from "../../api/axiosInstances";


const Like = ({ userInfo }) => {
    const [likes, setLikes] = useState([]);
    const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    
    useEffect(() => {
        mainAxiosInstance.get(`/users/${userInfo.id}/likes/`)
        .then(response => {
            setLikes(response.data);
        })
        .catch(error => console.error('Error:', error));
        
    }, []);
    
    return (
        <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {likes.length === 0 && <h1>좋아요한 게시물이 없습니다.</h1>}    
            {likes?.map((like) => (
            <div key={like.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img className="w-full h-48 object-cover" src={VITE_API_BASE_URL + like.image_url} alt={like.title} />
                <div className="p-4">
                <h5 className="text-lg font-semibold mb-2">
                    {like.title.length > 20
                    ? `${like.title.substring(0, 20)}...`
                    : like.title}
                </h5>
                <p className="text-gray-700">
                    {like.content.length > 30
                    ? 
                    <p dangerouslySetInnerHTML={{ __html: like.content.substring(0,30) }} />
                    : <p dangerouslySetInnerHTML={{ __html: like.content }} />
}
                </p>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
    }

export default Like;