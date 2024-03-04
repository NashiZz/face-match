import { Outlet } from "react-router-dom";
import Header from "../../header/Header_page";


function Root_page() {
    return (
      <>
          <Header />
          <Outlet />
      </>
    );
  }
  
  export default Root_page;