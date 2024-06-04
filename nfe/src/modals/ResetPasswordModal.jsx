import React, { useState, useEffect} from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { mainAxiosInstance } from "../api/axiosInstances";



const ResetPasswordModal = ({ isOpen, onClose, onRequestClose}) => {
  const [email, setEmail] = useState('');
  const user = useSelector((state) => state.user);

  const { userInfo, error } = user;

    useEffect(() => {
    if (userInfo) {
      onRequestClose();
    }
  
  
    if(error){
        alert("Invalid credentials")
      }
}, [userInfo]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

 const handleSubmit = async (event) => {
        event.preventDefault();
        try {
                const response = await mainAxiosInstance.post(`/users/password-reset/`, { email} );
        
                if (response.status === 200) {
                    console.log("비밀번호 변경 성공")
                }
            } catch (error) {
                console.log("비번 변경 실패")
            }

};


return (
    
    <Modal isOpen={isOpen} onRequestClose={onClose}>
        <button onClick={onRequestClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          ✖
        </button>
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-md overflow-y-auto" style={{ maxHeight: '80vh' }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">Reset Password</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <form onSubmit={handleEmailChange}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleSubmit}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </Modal>
  );
}

export default ResetPasswordModal;