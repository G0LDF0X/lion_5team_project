import { useState, useEffect } from "react";
import { mainAxiosInstance } from "../api/axiosInstances";

const useTags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getTags = async () => {
        const response  = await mainAxiosInstance.get("/items/tags"); 
        setTags(response.data);
      
    };
    getTags();
  }, []);

  return tags;
};

export default useTags;