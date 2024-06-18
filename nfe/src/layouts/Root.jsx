import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Chatbot from './Chatbot';
import Login from '../modals/Login';
import PostModal from '../modals/PostModal';
import SideBar from './SideBar';
import BoardDetailModal from '../modals/BoardDetail';

function RootLayout() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [postModalIsOpen, setPostModalIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const id = useParams().id;
  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const openSideBar = () => setOpen(true);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const openPostModal = () => setPostModalIsOpen(true);
  const closePostModal = () => setPostModalIsOpen(false);

  const isBoardDetailModalOpen = (location.pathname.startsWith('/board/') && id) 

  

  return (
    <>
      <Header openModal={openModal} openPostModal={openPostModal} openSideBar={openSideBar} />
      <Outlet context={{ openModal, closeModal }} />
      <Footer />
      <Chatbot />
      <Login isOpen={modalIsOpen} onRequestClose={closeModal} />
      <PostModal isOpen={postModalIsOpen} onRequestClose={closePostModal} />
      <SideBar toggleDrawer={toggleDrawer} open={open} />
      {isBoardDetailModalOpen && <BoardDetailModal open={true} handleClose={() => window.history.back()} />}
    </>
  );
}
      
export default RootLayout;
