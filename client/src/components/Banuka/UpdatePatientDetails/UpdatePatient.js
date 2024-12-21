import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './UpdatePatient.module.css'; // Import the CSS module
import TextInput from './TextInput'; // Import the new TextInput component
import FileInput from './FileInput'; // Import the new FileInput component
import DigitalCardContent from '../Digital Health Card/DigitalCardContent';
import { BASE_URL } from '../../../environment/environment';
import { toast, ToastContainer } from 'react-toastify';

const UpdatePatient = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [cardVisile,setCardVisible] = useState(false);
    
    const [barcode, setBarcode] = useState(null);
    const [formData, setFormData] = useState({
        _id: '',
        fullName: '',
        dob: '',
        gender: '',
        bloodGroup: '',
        phone: '',
        email: '',
        address: '',
        medicalHistory: '',
        nic: '',
        profilePhoto: '',
    });

    useEffect(() => {
        fetchPatientData();
    }, []);

    const fetchPatientData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/user/getPatientData/${id}`);
            setFormData(response.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profilePhoto: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${BASE_URL}/api/user/updatePatient/${id}`, formData, {
                headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            alert("Patient Updated");
        } catch (error) {
            console.error('Error Updating user', error);
            alert(error.response?.data?.error || 'Update failed. Please try again.'); // Better error handling
        }
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const generateNewCard = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/user/generateNewCard`, formData, {
                headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            alert("New card Generated");
            const userData = response.data.user;
            navigate('/HealthCareProvider/Dashboard/Patients/DigitalCard', { state: { userData } });
        } catch (error) {
            console.error('Error generating new card', error);
            alert(error.response?.data?.error || 'Failed to generate card. Please try again.'); // Better error handling
        }
    };

    const handleNavigate = () => {
        navigate(`/HealthCareProvider/Dashboard/Patients/Scanned/${formData._id}`);
    }

    const handleRemove = async () => {
        if (window.confirm("Are you sure you want to delete this patient account? This action cannot be undone.")) {
            try {
                // Call the delete API
                await axios.delete(`${BASE_URL}/api/user/deletePatient/${id}`, {
                    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
                });

                toast.success("Patient account deleted successfully.");
                // Redirect the user to the patients list page or dashboard
                navigate('/HealthCareProvider/Dashboard/Patients');
            } catch (error) {
                console.error('Error deleting patient account:', error);
                toast.error(error.response?.data?.error || 'Failed to delete the patient. Please try again.');
            }
        }
    };

    return (
        <div>
            
            <div className={styles.formContainer}>
                <div className={styles.upper}>
                    <h2 className={styles.title}>Patient Account</h2>
                    {/* <button onClick={handleNavigate}>Scanned logs</button>    */}
                    <button onClick={()=>setCardVisible(!cardVisile)}>View Digital Card</button>
                    <button className={styles.deletebtn} onClick={handleRemove}>Remove Account</button>
                </div>

                <div>
                    <div className={styles.profileHeader}>
                        <img src={formData.profilePhoto} alt="profile" />
                            <div >
                                <h2 style={{color:"black"}}>{formData.fullName}</h2>
                                <p>{formData._id}</p> {/* Assuming 'id' is a field in your user data */}
                            </div>
                           
                           
                    </div>
                    {cardVisile &&
                    <div>
                        <DigitalCardContent user={formData}/>
                    </div>
                    }
                   
                </div>
            
                <form onSubmit={handleSubmit}>
                    <TextInput 
                        label="Full name" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleChange} 
                        readonly 
                        disabled
                    />
                    <TextInput 
                        label="NIC" 
                        name="nic" 
                        value={formData.nic} 
                        onChange={handleChange} 
                        readonly 
                        disabled
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <TextInput 
                            label="Date of Birth" 
                            name="dob" 
                            type="date"
                            value={formData.dob ? formatDate(formData.dob) : ''} 
                            onChange={handleChange} 
                            readonly
                            disabled 
                            
                        />
                        <TextInput 
                            label="Gender" 
                            name="gender" 
                            value={formData.gender} 
                            onChange={handleChange} 
                            readonly
                             disabled
                        />
                        <TextInput 
                            label="Blood Group" 
                            name="bloodGroup" 
                            value={formData.bloodGroup} 
                            onChange={handleChange} 
                            readonly 
                            disabled
                        />
                    </div>
                    <label className={styles.label}>Contact Information</label>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <TextInput 
                            label="Phone" 
                            name="phone" 
                            placeholder="Phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            required 
                            readonly 
                            disabled
                            
                        />
                        <TextInput 
                            label="Email" 
                            name="email" 
                            type="email"
                            placeholder="Email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required
                            readonly 
                            disabled
                             
                        />
                        <TextInput 
                            label="Address" 
                            name="address" 
                            placeholder="Address" 
                            value={formData.address} 
                            onChange={handleChange} 
                            required 
                            readonly 
                            disabled
                        />
                    </div>
                    {/* <div>
                        <label className={styles.label}>Medical History</label>
                        <div className={styles.medicalHistoryContainer}>
                            {formData.medicalHistory.length > 0 ? (
                                formData.medicalHistory.map((element, index) => (
                                    <img 
                                        key={index}
                                        style={{ objectFit: 'scale-down', height: '50px', width: '50px', margin: '5px' }} 
                                        src={element} 
                                        alt={`Medical History ${index}`} 
                                    />
                                ))
                            ) : (
                                <p>No medical history uploaded.</p>
                            )}
                        </div>
                    </div> */}
                    
                    <div className={styles.buttonContainer}>
                       
                        <button className={styles.button} type='button' onClick={generateNewCard}>Generate New Card</button>
                    </div>
                </form>
            </div>

            {barcode && (
                <div className={styles.barcodeContainer}>
                    <h3>Your Barcode:</h3>
                    <img src={barcode} alt="User Barcode" />
                </div>
            )}
            <ToastContainer/>
        </div>
    );
};

export default UpdatePatient;
