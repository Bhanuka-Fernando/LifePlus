import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faLeaf } from '@fortawesome/free-solid-svg-icons'; // Font Awesome icons
import profileImage from '../images/asiri2.jpg'; // Import the local image

const Navbar = () => {
    const [greeting, setGreeting] = useState('');
    const [icon, setIcon] = useState(faLeaf); // Default icon for morning
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const hours = currentTime.getHours();
        if (hours < 12) {
            setGreeting('Good Morning');
            setIcon(faLeaf); // Leaf icon for morning
        } else if (hours < 18) {
            setGreeting('Good Afternoon');
            setIcon(faSun); // Sun icon for afternoon
        } else {
            setGreeting('Good Evening');
            setIcon(faMoon); // Moon icon for evening
        }

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer); // Clean up the timer when the component unmounts
    }, [currentTime]);

    const formattedDate = currentTime.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedTime = currentTime.toLocaleTimeString();

    return (
        <div style={styles.navbar}>
            <div style={styles.greetingContainer}>
                <span style={styles.greeting}>
                    <FontAwesomeIcon icon={icon} style={styles.icon} /> {/* Display the dynamic icon */}
                    {greeting},
                </span>
                <span style={styles.dateTime}>
                    {formattedDate} - {formattedTime}
                </span>
            </div>
            <div style={styles.menu}>
                {/* Profile image */}
                <Link to="/profile" style={styles.profileLink}>
                    <img src={profileImage} alt="Profile" style={styles.profileImage} />
                </Link>
            </div>
        </div>
    );
};

const styles = {
    navbar: {
        width: 'calc(100% - 250px)', // Adjust width to fit within the viewport considering the sidebar width
        height: '80px',
        backgroundColor: '#43d1b0', // Ash background color
        display: 'flex',
        justifyContent: 'space-between', // Space out the greeting and menu
        alignItems: 'center',
        padding: '0 20px',
        boxSizing: 'border-box',
        position: 'fixed',
        top: '0',
        left: '250px', // Offset by the width of the sidebar
        zIndex: 1,
        fontFamily: 'Poppins, sans-serif', // Use Poppins font
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow effect
    },
    greetingContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    greeting: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#000', // Black text color
        display: 'flex',
        alignItems: 'center', // Align icon and text
    },
    icon: {
        marginRight: '10px', // Space between icon and greeting text
    },
    dateTime: {
        fontSize: '1rem',
        color: '#000', // Black text color
    },
    menu: {
        display: 'flex',
        alignItems: 'center',
    },
    profileLink: {
        textDecoration: 'none',
    },
    profileImage: {
        width: '50px', // Adjust the size of the profile photo
        height: '50px',
        borderRadius: '50%', // Circular profile image
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for the profile image
    }
};

export default Navbar;
