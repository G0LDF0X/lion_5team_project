import { useEffect, useState } from "react";
import { mainAxiosInstance } from "../api/axiosInstances";
const useItems = (id) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function getItems() {
      const response = await mainAxiosInstance.get(`/items/all`);
      setItems(response.data);
    }
    getItems();
  }, [id]);
  return items;
};
export default useItems;