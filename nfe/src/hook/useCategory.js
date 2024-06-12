import { useEffect, useState } from 'react';
import { mainAxiosInstance } from '../api/axiosInstances';
const useCategory = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const getCategories = async () => {
            const response = await mainAxiosInstance('/items/category');
            setCategories(response.data);
            }
            getCategories()
            }, []);
        return categories
}


export default useCategory;