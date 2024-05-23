import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Chatbot from './Chatbot';
import Login from '../modals/Login';

function RootLayout() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <Header openModal={openModal} />
      <Outlet context={{ openModal, closeModal }} />
      <Footer />
      <Chatbot />
      <Login isOpen={modalIsOpen} onRequestClose={closeModal} />
    </>
  );
}

export default RootLayout;