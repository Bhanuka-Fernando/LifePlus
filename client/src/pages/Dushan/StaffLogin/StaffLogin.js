import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link for navigation

const StaffLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Simple login check - add validation as needed
        if (email && password) {
            // Simulate login success and navigate to DoctorHome
            navigate('/DoctorHome');
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Staff Login</h2>
                <form onSubmit={handleLogin} style={styles.form}>
                    <label style={styles.label}>Email Address:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />

                    <label style={styles.label}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />

                    <button type="submit" style={styles.loginButton}>Login</button>
                </form>

                
            </div>
        </div>
    );
};

// Styles for the login page
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        fontFamily: 'Poppins, sans-serif',
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '400px',
        textAlign: 'center',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: '1rem',
        marginBottom: '8px',
        color: '#555',
        textAlign: 'left',
    },
    input: {
        padding: '12px',
        marginBottom: '20px',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    loginButton: {
        padding: '12px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#43d1b0', // Use the same color as navbar background
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    li: {
        marginTop: '20px',
        listStyle: 'none',
    },
    link: {
        fontSize: '1rem',
        color: '#43d1b0',
        textDecoration: 'none',
    }
};

export default StaffLogin;
