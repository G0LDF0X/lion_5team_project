import React, { useEffect, useState } from "react";
import { mainAxiosInstance } from "../../api/axiosInstances";
import { Link } from "react-router-dom";
import { Typography} from '@mui/material';


const Like = ({ userInfo }) => {
    const [likes, setLikes] = useState([]);
    const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    
    useEffect(() => {
        mainAxiosInstance.get(`/users/${userInfo.id}/likes/`)
        .then(response => {
            if(response.data === "No likes")
            {
                setLikes([]);
            }
            else
            
            setLikes(response.data);
        })
        .catch(error => console.error('Error:', error));
        
    }, []);
    
    return (
        <div className="container mx-auto p-4">
            <div className="container mx-auto py-8">
             <Typography variant="h4" className="mb-10 font-bold text-gray-800">
                나의 좋아요
            </Typography>
      {likes && likes.length == 0 ? (
        <div className="text-center bg-white shadow-md rounded-lg  mb-8 mt-8 p-4 max-w-xxl mx-auto">
            <h1 className="mb-8 mt-8 text-center text-xl text-gray-700" >좋아요 한 게시물이 없습니다.</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {likes?.map((like) => (
            <Link to={`/board/${like.id}`}>
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
            </Link>
            ))}
        </div>
        )}
        </div>
        </div>
    );
    }


export default Like;
