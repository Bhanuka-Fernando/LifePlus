import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './PatientProfile.module.css'; // Import the CSS module
import TextInput from '../UpdatePatientDetails/TextInput'; // Import the new TextInput component
import FileInput from '../CreatePatientAccountComponents/FileInput';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../pages/firebase';
import DigitalCardContent from '../Digital Health Card/DigitalCardContent';
import { BASE_URL } from '../../../environment/environment';
import { toast, ToastContainer } from 'react-toastify';
import {
    Modal,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
  } from "@mui/material"; // Import MUI components


const UpdatePatient = () => {



    const [medicalRecords, setMedicalRecords] = useState([]);
    const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  
    const handleOpenModal = () => {
      setModalOpen(true); // Open the modal
    };
  
    const handleCloseModal = () => {
      setModalOpen(false); // Close the modal
    };
  
    // Modal styling
    const modalStyle = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 600,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      maxHeight: "80vh",
      overflowY: "auto",
    };


    const [profilePhotoPreview, setProfilePhotoPreview] = useState('');

    const id = localStorage.getItem('_id');
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
        medicalHistory: [],
        nic: '',
        profilePhoto: '',
        password:'',
    });

    useEffect(() => {
        fetchPatientData();
        fetchMedicalRecords();
    }, []);

    const fetchMedicalRecords = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/api/medical-records/${id}` // Adjust the endpoint accordingly
          );
          console.log("medical records", response.data.data);
          setMedicalRecords(response.data.data);
        } catch (error) {
          console.error("Failed to fetch medical records", error);
        }
      };

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

    const handleFileChange = async(e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profilePhoto: file });
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setProfilePhotoPreview(previewURL);
        }

        let profilePhotoURL = '';
        if (formData.profilePhoto) {
            const storageRef = ref(storage, `profilePhotos/${formData.nic}`);
            await uploadBytes(storageRef, formData.profilePhoto);
            profilePhotoURL = await getDownloadURL(storageRef);
        }

        formData = {
            ...formData,
            profilePhoto:profilePhotoURL
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
            const response = await axios.put(`${BASE_URL}/api/user/updatePatient/${id}`, formData, {
                headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            // alert("Patient Updated");
            toast.success("Patient Updated");
        } catch (error) {
            console.error('Error Updating user', error);
            toast.error(error.response?.data?.error || 'Update failed. Please try again.');
            // alert(error.response?.data?.error || 'Update failed. Please try again.');
        }
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const generateNewCard = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('${BASE_URL}/api/user/generateNewCard', formData, {
                headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            toast.success("New card Generated")

            // alert("New card Generated");
            const userData = response.data.user;
            navigate('/HealthCareProvider/Dashboard/Patients/DigitalCard', { state: { userData } });
        } catch (error) {
            console.error('Error generating new card', error);
            toast.error(error.response?.data?.error || 'Failed to generate card. Please try again.');
            // alert(error.response?.data?.error || 'Failed to generate card. Please try again.');
        }
    };

    // Function to handle removing an image from medical history
    const handleRemoveMedicalHistory = (index) => {
        const updatedMedicalHistory = formData.medicalHistory.filter((_, i) => i !== index);
        setFormData({ ...formData, medicalHistory: updatedMedicalHistory });
    };

    const handleNavigate = () => {
        navigate(`/Patient/Profile/ScanLogs/${formData._id}`);
    };


    const [medicalHistoryPreviews, setMedicalHistoryPreviews] = useState([]);


    const handleMedicalHistoryChange = async (e) => {
        const files = Array.from(e.target.files);
        const newMedicalHistory = [];
    
        // Upload each file to Firebase and get the URL
        for (const file of files) {
            const fileRef = ref(storage, `medicalHistory/${file.name}`);
            await uploadBytes(fileRef, file); // Upload the file
            const fileURL = await getDownloadURL(fileRef); // Get the download URL
            newMedicalHistory.push(fileURL); // Push the URL to the array
        }
    
        // Update formData with the new medical history URLs
        setFormData((prevState) => ({
            ...prevState,
            medicalHistory: [...prevState.medicalHistory, ...newMedicalHistory],
        }));
    };

    return (
        <div>
            <div className={styles.formContainer}>
                <div className={styles.upper}>
                    <h2 className={styles.title}>Profile</h2>
                    <button onClick={handleOpenModal}>
            View Medical Records
          </button>
                    <button onClick={handleNavigate}>Scanned logs</button>   
                    <button onClick={()=>setCardVisible(!cardVisile)}>View Digital Card</button>
                    

                </div>

                <div>
                    <div className={styles.profileHeader}>
                        <div>
                    {formData.profilePhoto ? (
                                <img
                                    src={formData.profilePhoto}
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
                                        style={{ display: 'none' }} // Hide the default file input
                                    />
                                </label>
                            )}
                                </div>
                        <div>
                            <h2 style={{color:'black'}}>{formData.fullName}</h2>
                            <p>{formData._id}</p>
                        </div>
                        
                    </div>
                    {cardVisile &&
                    <div>
                        <DigitalCardContent user={formData}/>
                    </div>
                    }
                </div>
            
                <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
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

<                   TextInput 
                            label="Password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            pattern=".{8,}"
                            title="Password must be at least 8 characters."
                            required
                            
                        />
                    </div>
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
                    <label className={styles.label} style={{marginTop:'10px',marginBottom:'10px',fontSize:'20px',color:'black'}}>Contact Information</label>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
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
                        <TextInput 
                            label="Address" 
                            name="address" 
                            placeholder="Address" 
                            value={formData.address} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label style={{marginTop:'10px',fontSize:'20px',color:'black'}} className={styles.label}>Medical Documents</label>
                        <div>
                        <div className={styles.medicalHistoryContainer}>
                            {formData.medicalHistory.length > 0 ? (
                                formData.medicalHistory.map((element, index) => (
                                    <div key={index} className={styles.medicalHistoryItem}>
                                        <img 
                                            style={{ objectFit: 'scale-down', height: '50px', width: '50px', margin: '5px' }} 
                                            src={element} 
                                            alt={`Medical History ${index}`} 
                                        />
                                        <button 
                                            className={styles.removeButton} 
                                            type="button" 
                                            onClick={() => handleRemoveMedicalHistory(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>No medical Documents uploaded.</p>
                            )}
                            </div>
                            <FileInput
                            label="Upload Medical Documents"
                            name="medicalHistory"
                            onChange={handleMedicalHistoryChange}
                            multiple
                        />
                       
                        </div>
                    </div>
                    
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} type="submit">Update</button>
                    </div>
                </form>
            </div>

            {barcode && (
                <div className={styles.barcodeContainer}>
                    <h3>Your Barcode:</h3>
                    <img src={barcode} alt="User Barcode" />
                </div>
            )}

            {/* MUI Modal Component */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <h2>Medical Records</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Diagnosis</TableCell>
                  <TableCell>Vital Signs</TableCell>
                  <TableCell>Treatment Plans</TableCell>
                  <TableCell>Medicine</TableCell>
                  <TableCell>Attachments</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medicalRecords.length > 0 ? (
                  medicalRecords.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.diagnosis}</TableCell>
                      <TableCell>{record.vitalSigns}</TableCell>
                      <TableCell>{record.treatmentPlans}</TableCell>
                      <TableCell>{record.medicine}</TableCell>
                      <TableCell>
                        {record.attachments ? (
                          <a
                            href={record.attachments}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Attachment
                          </a>
                        ) : (
                          "No Attachment"
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No Medical Records Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseModal}
            style={{ marginTop: "20px" }}
          >
            Close
          </Button>
        </Box>
      </Modal>

<ToastContainer />
        </div>
    );
};

export default UpdatePatient;
