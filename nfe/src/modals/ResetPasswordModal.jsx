import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { mainAxiosInstance } from "../api/axiosInstances";


const ResetPasswordModal = ({ isOpen, onClose, userInfo }) => {
  const [email, setEmail] = useState('');
  const [resetStatus, setResetStatus] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await mainAxiosInstance.post(`/users/password-reset/`, { email }, {
    
      });
 
      setResetStatus('success');
    } catch (error) {
      console.error('Error resetting password:', error);
      setResetStatus('error');
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {resetStatus === 'success' && <p className="text-green-600">Password reset email sent successfully!</p>}
          {resetStatus === 'error' && <p className="text-red-600">Error resetting password. Please try again later.</p>}
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700">
            Reset Password
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ResetPasswordModal;
