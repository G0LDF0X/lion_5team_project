import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Chatbot from './Chatbot';
import Login from '../modals/Login';
import PostModal from '../modals/PostModal';

function RootLayout() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [postModalIsOpen, setPostModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const openPostModal = () => setPostModalIsOpen(true);
  const closePostModal = () => setPostModalIsOpen(false);

  return (
    <>
      <Header openModal={openModal} openPostModal={openPostModal}/>
      <Outlet context={{ openModal, closeModal }} />
      <Footer />
      <Chatbot />
      <Login isOpen={modalIsOpen} onRequestClose={closeModal} />
      <PostModal isOpen={postModalIsOpen} onRequestClose={closePostModal} />
      
    </>
  );
}

export default RootLayout;