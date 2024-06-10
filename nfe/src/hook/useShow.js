import { useEffect } from "react";
import { mainAxiosInstance } from "../api/axiosInstances";
const useShow = (id) => {
  useEffect(() => {
    async function show() {
        mainAxiosInstance.post(`/board/detail/${id}/add_show/`
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`,
                },
            }
        )
    }
    show();
  }, [id]);
};

export default useShow;