import React from 'react';
import Sidebar from '../../components/Banuka/SideBarComponent/Sidebar';
import PatientScans from '../../components/Banuka/PatientScans/PatientScans';
import Navbar from '../../components/BhanukaFdo/Navbar/HomeNavbar';
import Footer from '../../components/BhanukaFdo/Footer/HomeFooter';



function PatientScansPage() {
  return (
    // <div style={{display:'flex'}}>
    //    <Sidebar/>
    //   <div style={{flexGrow:1}}>
    //   <PatientScans/>
    //   </div>
    // </div>
    <div>
    <div className="homeHeadStyle"><img src='https://static4.depositphotos.com/1003362/340/i/450/depositphotos_3406277-stock-photo-red-heart-3d.jpg'/>LIFEPLUS</div>
    <Navbar/>
    <PatientScans /> {/* Display the list of hospitals */}
    <Footer/>

    </div>

  );
}

export default PatientScansPage;
