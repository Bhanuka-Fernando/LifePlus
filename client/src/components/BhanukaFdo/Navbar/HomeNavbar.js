import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartOutlined, UserOutlined } from '@ant-design/icons'; // Ensure you import the icons
import './Homenavbar.css'; // Assuming you saved the above styles in Navbar.css
import LogoutButton from '../../Banuka/LogOutButton/Logout';

const Navbar = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('UserEmail'); // Adjust if necessary

  return (
    <div className="header">
      <div className="logo">Hospital Logo</div>
      <div className="menu">
        <Link to="/Patient-home">Home</Link>
        <Link to={`/my-appointments/${userEmail}`}>My Appointments</Link>
        <Link to={`/my-payments/${userEmail}`}>My Payments</Link>
      </div>
      <div className="user-actions">
        
        <UserOutlined className="user-icon" onClick={()=>navigate('/Patient/Profile')}/>
        
        {/* <button className="logout-button">Logout</button> */}
        <LogoutButton/>
      </div>
    </div>
  );
};

export default Navbar;
