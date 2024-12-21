import React from "react";
import PatientProfile from "../../components/Banuka/PatientProfileComponent/PatientProfile";
import Sidebar from "../../components/Banuka/SideBarComponent/Sidebar";
import Navbar from "../../components/BhanukaFdo/Navbar/HomeNavbar";
import Footer from "../../components/BhanukaFdo/Footer/HomeFooter";

function PatientProfilePage() {
    return (
        // <div >
        // <div>
        //     <Sidebar/>
        // </div>
        // <div>
        //     <PatientProfile/>
        // </div>
        // </div>

        <div>
        <div className="homeHeadStyle"><img src='https://static4.depositphotos.com/1003362/340/i/450/depositphotos_3406277-stock-photo-red-heart-3d.jpg'/>LIFEPLUS</div>
        <Navbar/>
        <PatientProfile /> {/* Display the list of hospitals */}
        <Footer/>
  
      </div>
    )
}

export default PatientProfilePage;