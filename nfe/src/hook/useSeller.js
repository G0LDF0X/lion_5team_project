import { useEffect } from "react";
import { mainAxiosInstance } from "../api/axiosInstances";
const useSeller = (setIsSeller, userInfo) => {
  useEffect(() => {
    const checkSellerStatus = async () => {
      try {
        const response = await mainAxiosInstance.get("/seller/apply/", {
          headers: {
            Authorization: `Bearer ${userInfo.access}`,
          },
        });
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        const data = response.data;
        setIsSeller(!!data.id);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  }, [userInfo]);
}
export default useSeller;