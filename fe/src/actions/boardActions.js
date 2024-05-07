import {

BOARD_LIST_REQUEST,
BOARD_LIST_SUCCESS,
BOARD_LIST_FAIL,
BOARD_DETAILS_REQUEST,
BOARD_DETAILS_SUCCESS,
BOARD_DETAILS_FAIL,
BOARD_CREATE_REQUEST,
BOARD_CREATE_SUCCESS,
BOARD_CREATE_FAIL,
BOARD_CREATE_RESET,
BOARD_UPDATE_REQUEST,
BOARD_UPDATE_SUCCESS,
BOARD_UPDATE_FAIL,
BOARD_UPDATE_RESET,
BOARD_DELETE_REQUEST,
BOARD_DELETE_SUCCESS,
BOARD_DELETE_FAIL,
BOARD_CREATE_REPLY_REQUEST,
BOARD_CREATE_REPLY_SUCCESS,
BOARD_CREATE_REPLY_FAIL,
} from "../constants/boardConstants";

export const listBoards = () => async (dispatch) => {
try {
    dispatch({ type: BOARD_LIST_REQUEST });

    const response = await fetch("/board");
    const data = await response.json();

    dispatch({
        type: BOARD_LIST_SUCCESS,
        payload: data,
    });
} catch (error) {
    dispatch({
        type: BOARD_LIST_FAIL,
        payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
    });
}
}

// export const listBoardDetails = (id) => async (dispatch) => {
// try {
//     dispatch({ type: BOARD_DETAILS_REQUEST });

//     const response = await fetch(`/board/detail/${id}`);
//     const data = await response.json();

//     dispatch({
//         type: BOARD_DETAILS_SUCCESS,
//         payload: data,
//     });
// } catch (error) {
//     dispatch({
//         type: BOARD_DETAILS_FAIL,
//         payload:
//             error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message,
//     });
// }
// }


// 게시판 상세 조회 Action Creator
export const getBoardDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: BOARD_DETAILS_REQUEST });
  
      const response = await fetch(`/board/detail/${id}/`);
      const data = await response.json();
  
      dispatch({
        type: BOARD_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BOARD_DETAILS_FAIL,
        payload: error.message,
      });
    }
  };
  
  // 댓글 생성 Action Creator
  export const createReply = (boardId, content, repliedId = 0) => async (dispatch, getState) => {
    try {
      dispatch({ type: BOARD_CREATE_REPLY_REQUEST });
  
      const { userLogin: { userInfo } } = getState();
      const response = await fetch(`/board/detail/${boardId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.access}`,

        },
        body: JSON.stringify({ content, repliedId }),
      });
  
      const data = await response.json();
  
      dispatch({
        type: BOARD_CREATE_REPLY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BOARD_CREATE_REPLY_FAIL,
        payload: error.message,
      });
    }
  };


export const createBoard = (board) => async (dispatch, getState) => {
try {
    dispatch({
        type: BOARD_CREATE_REQUEST,
    });

    const { userLogin: { userInfo } } = getState();

    const response = await fetch(`/board/create/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
        },
    });

    const data = await response.json();

    dispatch({
        type: BOARD_CREATE_SUCCESS,
        payload: data,
    });
}
catch (error) {
    dispatch({
        type: BOARD_CREATE_FAIL,
        payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
    });
}
}

export const updateBoard = (board) => async (dispatch, getState) => {
try {
    dispatch({
        type: BOARD_UPDATE_REQUEST,
    });

    const { userLogin: { userInfo } } = getState();

    const response = await fetch(`/board/update/${board.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(board),
    });

    const data = await response.json();

    dispatch({
        type: BOARD_UPDATE_SUCCESS,
        payload: data,
    });
}
catch (error) {
    dispatch({
        type: BOARD_UPDATE_FAIL,
        payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
    });
}
}


export const deleteBoard = (id) => async (dispatch, getState) => {
try {
    dispatch({
        type: BOARD_DELETE_REQUEST,
    });

    const { userLogin: { userInfo } } = getState();

    const response = await fetch(`/board/delete/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    });

    dispatch({
        type: BOARD_DELETE_SUCCESS,
    });
}
catch (error) {
    dispatch({
        type: BOARD_DELETE_FAIL,
        payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
    });
}
}

// export const createReply = (board) => async (dispatch, getState) => {
//     try {
//         dispatch({ type: BOARD_CREATE_REPLY_REQUEST });
    
//         const {
//           userLogin: { userInfo },
//         } = getState();
    
//         const response = await fetch(`/board/detail/${board.id}/`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${userInfo.token}`,
//           },
//           body: JSON.stringify({
//             content: board.content,
//           }),
//         });
    
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
    
//         const data = await response.json();
    
//         dispatch({
//           type: BOARD_CREATE_REPLY_SUCCESS,
//           payload: data,
//         });
//       } catch (error) {
//         dispatch({
//           type: BOARD_CREATE_REPLY_FAIL,
//           payload: error.message || "Something went wrong",
//         });
//       }
//     };