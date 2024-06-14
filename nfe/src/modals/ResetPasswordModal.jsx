import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { mainAxiosInstance } from "../api/axiosInstances"; 


function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}



function ResetPasswordModal({ isOpen, onClose }) {
    const [email, setEmail] = useState('');
    const [resetStatus, setResetStatus] = useState('');
    const csrftoken = getCookie('csrftoken');
    
    console.log(csrftoken);
    console.log(email);

    const handleResetPassword = async(e) => {
      e.preventDefault();
      try {
          const formData = new FormData();
          formData.append('email', email);
  
          const response = await mainAxiosInstance.post(`/users/accounts/password_reset/form/`,
              formData,
              { headers: {
                'Content-Type': 'multipart/form-data',
                // 'X-CSRFToken': csrftoken,  // Add this line
              }}
          );
          // handle response
      } catch (error) {
        console.error(error);
          // handle error
      }
  };
  
    // const handleResetPassword = async(e) => {
    //     e.preventDefault();
    //     try {

    //         const response = await mainAxiosInstance.post(`/users/accounts/password_reset/form/`,
    //         JSON.stringify({'email': email}),
    //             { headers: {
    //               'Content-Type': 'application/json',
    //               // 'X-CSRFToken': csrftoken,  // Add this line
    //             }}
    //         );
          
    //       console.log('Response from server:', response);
    //       setResetStatus("success");
    //     } catch (error) {
    //         console.error(error);
    //         setResetStatus('An error occurred.');
    //       }
    //     }
        
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
          <button type="submit" 
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700">
            비밀번호 재설정
          </button>
        </form>
      </div>
    </div>,
    document.body
  );

};
export default ResetPasswordModal;