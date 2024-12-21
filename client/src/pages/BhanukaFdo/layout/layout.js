// components/Layout.js
import React from 'react';
import Navbar from '../../../components/BhanukaFdo/Navbar/HomeNavbar';
import Footer from '../../../components/BhanukaFdo/Footer/HomeFooter';

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    );
};



export default Layout;
