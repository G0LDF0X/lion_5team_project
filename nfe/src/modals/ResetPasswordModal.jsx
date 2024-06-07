import React, { useState , useEffect} from 'react';
import ReactDOM from 'react-dom';
import { mainAxiosInstance } from "../api/axiosInstances";

// async function getCsrfToken() {
//   try {
//     // 토큰 가져오기
//     const response = await mainAxiosInstance.get('/users/get-csrf-token/');
//     console.log(response.data.csrftoken);
//     return response.data.csrftoken;
  

//   } catch (error) {
//     console.error('CSRF 토큰을 가져오는 중 오류가 발생했습니다:', error);
//     throw error;
//   }
// }

// function ResetPasswordModal({ isOpen, onClose }) {
//   const [email, setEmail] = useState('');
//   const [resetStatus, setResetStatus] = useState('');
//   const [csrfToken, setCsrfToken] = useState('');

//   useEffect(() => {
//     // const fetchCsrfToken = async () => {
//   //     try {
//   //       // 토큰 가져오기
//   //       const token = await getCsrfToken();
//   //       console.log('token:', token);
//   //       setCsrfToken(token);
//   //     } catch (error) {
//   //       console.error('CSRF 토큰을 가져오는 중 오류가 발생했습니다:', error);
//   //     }
//   //   };

//   //   fetchCsrfToken();
//   // }, []);
//   getCsrfToken().then(setCsrfToken);
//   }, []);


//   const handleResetPassword = async (e) => {
//     e.preventDefault();

//     try {
//       if (!csrfToken) {
//         throw new Error('CSRF 토큰을 찾을 수 없습니다');
//       }

//       const response = await mainAxiosInstance.post(
//         `/users/password-reset/`, {
//           email: email
//         }, {
//           headers: {
//             'X-CSRFToken': csrfToken
//           }
//         }
//       );
//       if (response.status >= 200 && response.status < 300) {
//         console.log('CSRF 토큰이 유효합니다');
//       } else {
//         console.log('CSRF 토큰이 유효하지 않습니다');
      
//     }

//       setResetStatus('success');
//     } catch (error) {
//       console.error('비밀번호 재설정 중 오류가 발생했습니다:', error);
//       setResetStatus('error');
//     }
//   };

//   const handleClose = () => {
//     setEmail('');
//     setResetStatus('');
//     onClose();
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     if (resetStatus !== '') {
//       setResetStatus('');
//     }
//   };

//   if (!isOpen) return null;


async function getCsrfToken() {
  try {
    // 토큰 가져오기
    const response = await mainAxiosInstance.get('/users/get-csrf-token/');
    console.log(response.data.csrftoken);
    return response.data.csrftoken;
  

  } catch (error) {
    console.error('CSRF 토큰을 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
  
}
getCsrfToken()

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;

}
const csrfToken = getCookie('csrftoken');

console.log(document.cookie); // 쿠키 전체를 출력합니다.
console.log(csrfToken); // 'csrftoken' 쿠키의 값을 출력합니다.


function ResetPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  // const [csrfToken, setCsrfToken] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      if (!csrfToken) {
        throw new Error('CSRF 토큰을 찾을 수 없습니다');
    
      }

      const response = await mainAxiosInstance.post(
        `/users/password-reset/`, {
          email: email
        }, {
          headers: {
            'X-CSRFToken': csrfToken
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        console.log('CSRF 토큰이 유효합니다');
      } else {
        console.log('CSRF 토큰이 유효하지 않습니다');
      
    }

      setResetStatus('success');
    } catch (error) {
      console.error('비밀번호 재설정 중 오류가 발생했습니다:', error);
      setResetStatus('error');
    }
  };

  const handleClose = () => {
    setEmail('');
    setResetStatus('');
    onClose();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (resetStatus !== '') {
      setResetStatus('');
    }
  };

  if (!isOpen) return null;


  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto relative">
        <button onClick={handleClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">비밀번호 재설정</h2>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-gray-700">이메일:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {resetStatus === 'success' && <p className="text-green-600">비밀번호 재설정 이메일이 성공적으로 전송되었습니다!</p>}
          {resetStatus === 'error' && <p className="text-red-600">비밀번호 재설정 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.</p>}
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700">
            비밀번호 재설정
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default ResetPasswordModal;