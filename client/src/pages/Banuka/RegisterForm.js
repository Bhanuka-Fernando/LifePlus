
import React, { useState } from 'react';
import axios from 'axios';
//import BarcodeScannerComponent from 'react-qr-barcode-scanner';



export default function RegisterForm() {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);
    const [barcode, setBarcode] = useState(null);
    const [scanResult, setScanResult] = useState(null);
  
    // Handle user registration
    const handleRegister = async () => {
      try {
        const response = await axios.post('http://localhost:8070/api/user/registerUser', {
          name,
          email,
        });
  
        setUser(response.data.user);
        setBarcode(response.data.user.barcode);
      } catch (error) {
        console.error('Error registering user', error);
      }
    };
  
    // Handle scanning
    const handleScan = async (data) => {
      if (data) {
        try {
          const response = await axios.get(`http://localhost:5000/scan/${data}`);
          setScanResult(response.data.user);
        } catch (error) {
          console.error('Error fetching user details', error);
        }
      }
    };
  
    return(

    <div className="App">
    <h1>Barcode App</h1>

    {/* Registration form */}
    <div>
      <h2>Register a new user</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>

      {/* Display barcode */}
      {barcode && (
        <div>
          <h3>Your Barcode:</h3>
          <img src={barcode} alt="User Barcode" />
        </div>
      )}
    </div>

    {/* Barcode Scanner */}
    {/*}
    <div>
      <h2>Scan Barcode</h2>
      <BarcodeScannerComponent
        width={300}
        height={300}
        onUpdate={(err, result) => {
          if (result) handleScan(result.text);
        }}
      />

      
      {scanResult && (
        <div>
          <h3>Scanned User Details:</h3>
          <p>Name: {scanResult.name}</p>
          <p>Email: {scanResult.email}</p>
        </div>
      )}
    </div>
    */}
  </div>
    


)};