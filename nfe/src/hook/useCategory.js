import { useEffect, useState } from 'react';
import { mainAxiosInstance } from '../api/axiosInstances';
const useCategory = (setCategories) => {
    // const [categories, setCategories] = useState([]);
    useEffect(() => {
        const getCategories = async () => {
            const response = await mainAxiosInstance('/items/category');
            setCategories(response.data);
        }
        getCategories()
    }, []);
}
export default useCategory;