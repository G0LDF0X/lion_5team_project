import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { login } from '../store/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import RegisterModal from './RegisterModal';
import ResetPasswordModal from './ResetPasswordModal';
import { listCartItems } from '../store/actions/cartActions';

const Login = ({ isOpen, onRequestClose }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState('');

  const user = useSelector((state) => state.user);
  const { userInfo, error } = user;
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ username: id, password }));
  };

  useEffect(() => {
    if (userInfo) {
      onRequestClose();
      dispatch(listCartItems());
    }
    if (error) {
      console.log('Error detail:', error);
      const errorMessage = Array.isArray(error.detail) ? error.detail[0] : error.detail;

      if (errorMessage === "Invalid ID") {
        setErrorMessages('The username is incorrect.');
      } else if (errorMessage === "Invalid password") {
        setErrorMessages('The password is incorrect.');
      } else {
        setErrorMessages('An error occurred. Please try again.');
      }
    }
  }, [userInfo, error, onRequestClose, dispatch]);

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleOpenPasswordResetModal = () => {
    setIsPasswordResetModalOpen(true);
  };

  const handleClosePasswordResetModal = () => {
    setIsPasswordResetModalOpen(false);
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto relative">
        <button onClick={onRequestClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700">ID:</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {errorMessages && (
            <div className="text-red-500 text-center mt-2">{errorMessages}</div>
          )}
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700">
            Login
          </button>

          <label className="block text-gray-700 text-center mt-4">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={handleOpenRegisterModal}
              className="text-blue-500"
            >
              Register
            </button>
          </label>
          <label className="block text-gray-700 text-center mt-4">
            Forgot your password?{' '}
            <button
              type="button"
              onClick={handleOpenPasswordResetModal}
              className="text-blue-500"
            >
              Reset Password
            </button>
          </label>
        </form>
        <RegisterModal isOpen={isRegisterModalOpen} onClose={handleCloseRegisterModal} />
        <ResetPasswordModal isOpen={isPasswordResetModalOpen} onClose={handleClosePasswordResetModal} />
      </div>
    </div>,
    document.body
  );
};

export default Login;
