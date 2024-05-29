import { useEffect } from 'react';
import { mainAxiosInstance } from '../api/axiosInstances';
const useCategory = (setCategories) => {
    useEffect(() => {
        const getCategories = async () => {
            const response = await mainAxiosInstance('/items/category');
            setCategories(response.data);
        }
        getCategories()
    }, []);
}
export default useCategory;