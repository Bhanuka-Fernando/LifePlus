import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../pages/firebase'; // Import your Firebase configuration
import styles from './CreateAccountForm.module.css';
import TextInput from './TextInput';
import FileInput from './FileInput';
import { BASE_URL } from '../../../environment/environment';
import { toast, ToastContainer } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the toastify CSS

const CreateAccountForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [barcode, setBarcode] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        dob: '',
        gender: '',
        bloodGroup: '',
        phone: '',
        email: '',
        address: '',
        medicalHistory: [],
        nic: '',
        profilePhoto: '',
        password: '',
    });

    const [profilePhotoPreview, setProfilePhotoPreview] = useState('');
    const [medicalHistoryPreviews, setMedicalHistoryPreviews] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profilePhoto: file });
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setProfilePhotoPreview(previewURL);
        }
    };

    const handleMedicalHistoryChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prevState) => ({
            ...prevState,
            medicalHistory: [...prevState.medicalHistory, ...files],
        }));
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setMedicalHistoryPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let profilePhotoURL = '';
        const medicalHistoryURLs = [];

        if (formData.profilePhoto) {
            const storageRef = ref(storage, `profilePhotos/${formData.nic}`);
            await uploadBytes(storageRef, formData.profilePhoto);
            profilePhotoURL = await getDownloadURL(storageRef);
        }

        for (const file of formData.medicalHistory) {
            const fileRef = ref(storage, `medicalHistory/${file.name}`);
            await uploadBytes(fileRef, file);
            const fileURL = await getDownloadURL(fileRef);
            medicalHistoryURLs.push(fileURL);
        }

        const userData = {
            ...formData,
            profilePhoto: profilePhotoURL,
            medicalHistory: medicalHistoryURLs,
        };

        try {
            const response = await axios.post(`${BASE_URL}/api/user/registerUser`, userData, {
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            setBarcode(response.data.user.barcode);
            toast.success('User Registered'); // Show toast success
            navigate('/HealthCareProvider/Dashboard/Patients/DigitalCard', { state: { userData: response.data.user } });
        } catch (error) {
            console.error('Error registering user', error);
            toast.error(error.response?.data?.error || 'Registration failed. Please try again.'); // Show toast error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className={styles.formContainer}>
                <h2 className={styles.title}>Create Account</h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        <div className={styles.profileHeader}>
                            {profilePhotoPreview ? (
                                <img
                                    src={profilePhotoPreview}
                                    alt="Profile"
                                    style={{ height: '100px', width: '100px', objectFit: 'cover' }}
                                />
                            ) : (
                                <label htmlFor="profilePhotoUpload" className={styles.uploadButton}>
                                    Upload Photo
                                    <input
                                        type="file"
                                        id="profilePhotoUpload"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            )}
                            <div style={{ marginLeft: '10px' }}>
                                <TextInput label="Full name" name="fullName" value={formData.fullName} onChange={handleChange} required />
                                <TextInput
                                    label="NIC"
                                    name="nic"
                                    value={formData.nic}
                                    onChange={handleChange}
                                    required
                                    pattern="\d{10}"
                                    title="NIC must be exactly 10 digits."
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between',marginTop:'50px',marginBottom:'20px' }}>
                        <TextInput label="DOB" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
                        <TextInput
                            label="Gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            pattern="(Male|Female)"
                            title="Gender must be either Male or Female."
                        />
                        <TextInput label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required />
                        <TextInput
                            label="Temporary password"
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            pattern=".{8,}"
                            title="Password must be at least 8 characters."
                        />
                    
                    </div>
                    <label style={{fontSize:'22px'}} className={styles.label}>Contact Information</label>
                    <div style={{ display: 'flex', justifyContent: 'space-between',marginTop:'30px' }}>
                        <TextInput
                            label="Phone"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            pattern="\d{10}"
                            title="Phone number must be exactly 10 digits."
                        />
                        <TextInput
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <TextInput label="Address" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                        
                    </div>
                    <div>
                        <label style={{fontSize:'22px',marginTop:'30px',marginBottom:'20px'}} className={styles.label}>Medical History</label>
                        <FileInput
                            label="Upload Medical Documents"
                            name="medicalHistory"
                            onChange={handleMedicalHistoryChange}
                            multiple
                        />
                        <div>
                            {medicalHistoryPreviews.map((url, index) => (
                                <div key={index} className={styles.filePreview}>
                                    <img src={url} alt={`Medical History Preview ${index + 1}`} style={{ height: '100px', width: '100px', objectFit: 'scale-down' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className={styles.button} type="submit">Submit</button>
                </form>
            </div>

            {/* Overlay for loading */}
            {loading && (
                <div className={styles.overlay}>
                    <p className={styles.loadingMessage}>Creating account, please wait...</p>
                </div>
            )}

            {/* Display barcode */}
            {barcode && (
                <div className={styles.barcodeContainer}>
                    <h3>Your Barcode:</h3>
                    <img src={barcode} alt="User Barcode" />
                </div>
            )}

            <ToastContainer /> {/* Include ToastContainer to display toasts */}
        </div>
    );
};

export default CreateAccountForm;
