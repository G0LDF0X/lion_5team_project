import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Chatbot from "./Chatbot";

function RootLayout() {
  return (
    <>
      <Header />
      <Chatbot />
      <Outlet />
      <Footer />
    </>
  );
}
export default RootLayout;