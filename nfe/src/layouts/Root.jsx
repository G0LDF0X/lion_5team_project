import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Chatbot from './Chatbot';
import Login from '../modals/Login';
import PostModal from '../modals/PostModal';
import SideBar from './SideBar';

function RootLayout() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [postModalIsOpen, setPostModalIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const openSideBar = () => setOpen(true);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const openPostModal = () => setPostModalIsOpen(true);
  const closePostModal = () => setPostModalIsOpen(false);

  return (
    <>
      <Header openModal={openModal} openPostModal={openPostModal} openSideBar={openSideBar}/>
      <Outlet context={{ openModal, closeModal }} />
      <Footer />
      <Chatbot />
      <Login isOpen={modalIsOpen} onRequestClose={closeModal} />
      <PostModal isOpen={postModalIsOpen} onRequestClose={closePostModal} />
      <SideBar toggleDrawer={toggleDrawer} open={open} />
      
    </>
  );
}

export default RootLayout;