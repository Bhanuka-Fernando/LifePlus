import React from 'react';
import HospitalsList from '../../components/BhanukaFdo/hospitalList/HospitalsList'; // Import the HospitalsList component
import './Home.css'
import Navbar from '../../components/BhanukaFdo/Navbar/HomeNavbar';
import Footer from '../../components/BhanukaFdo/Footer/HomeFooter';


const Home = () => {
  return (
    <div>
      <div className="homeHeadStyle"><img src='https://static4.depositphotos.com/1003362/340/i/450/depositphotos_3406277-stock-photo-red-heart-3d.jpg'/>LIFEPLUS</div>
      <Navbar/>
      <HospitalsList /> {/* Display the list of hospitals */}
      <Footer/>

    </div>
  );
};

export default Home;
