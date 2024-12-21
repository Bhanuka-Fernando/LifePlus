// DigitalCardContent.js
import React from 'react';
import styles from './DigitalCard.module.css'; // Import the CSS module

const DigitalCardContent = ({ user }) => {
    const dob = new Date(user.dob);
    const ISS = new Date(user.createdAt);
    const EXP = new Date(user.expireAt);

    return (
        <div className={styles.digitalCard}>
            <div className={styles.cardHeader}>
                Digital Health Card
            </div>
            <div className={styles.cardContent}>
                <div style={{ marginLeft: '10px', marginTop: '20px' }}>
                    <img
                        className={styles.profileImage}
                        src={user.profilePhoto ? user.profilePhoto : 'placeholder-profile.jpg'}
                        alt="User Profile"
                    />
                </div>
                <div className={styles.cardDetails}>
                    <div style={{ display: 'flex', margin: 0, height: '30px' }}>
                        <h5 style={{ paddingTop: '2px' }}> </h5>
                        <h3>{user._id}</h3>
                    </div>
                    <p><strong>{user.fullName}</strong></p>
                    <div className={styles.cardDivider}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '5px', marginBottom: '5px' }}>
                        <div style={{ marginRight: '20px' }}>
                            <p style={{ margin: 2 }}>DOB: <strong>{dob.toLocaleDateString('en-US')}</strong></p>
                            <p style={{ margin: 2 }}>Sex: <strong>{user.gender === 'M' ? 'Male' : 'Female'}</strong></p>
                        </div>
                        <div>
                            <p style={{ margin: 2 }}>Blood Group: <strong>{user.bloodGroup}</strong></p>
                            <p style={{ margin: 2 }}>Address: <strong>{user.address}</strong></p>
                        </div>
                    </div>
                    <div className={styles.cardDivider}></div>
                    <div style={{ display: 'flex', fontSize: '15px', justifyContent: 'space-between' }}>
                        <p style={{ margin: 2 }}>ISS: <strong>{ISS.toLocaleDateString('en-US')}</strong></p>
                        <p style={{ margin: 2 }}>EXP: <strong>{EXP.toLocaleDateString('en-US')}</strong></p>
                    </div>
                </div>
            </div>
            <div className={styles.cardFooter}>
                <img className={styles.barcodeImage} src={user.barcode} alt="Barcode" />
            </div>
        </div>
    );
};

export default DigitalCardContent;
