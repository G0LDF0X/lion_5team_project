import { useEffect, useState } from "react";
import { recommendationAxiosInstance } from "../api/axiosInstances";

export const useRecommend = () => {
    const [recommend, setRecommend] = useState(null);

    useEffect(() => {
        const fetchRecommend = async () => {
            const res = await recommendationAxiosInstance.get('/recommendation/');
            setRecommend(res.data);
        }
        fetchRecommend();
    }, []);

    return { recommend };
}
