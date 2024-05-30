import { useEffect } from "react";

const useShow = (id) => {
  useEffect(() => {
    async function show() {
        fetch(`/board/detail/${id}/add_show/`
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        .then(response => response.json())
        .then(data => console.log(data));
    }
    show();
  }, [id]);
};

export default useShow;