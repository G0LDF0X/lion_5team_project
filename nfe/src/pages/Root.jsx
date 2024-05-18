import { Outlet } from "react-router-dom";
import Header from "../layouts/Header";

function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
export default RootLayout;