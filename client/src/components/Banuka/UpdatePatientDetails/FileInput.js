// FileInput.js
import React from 'react';
import styles from './UpdatePatient.module.css'; // Import the CSS module

const FileInput = ({ label, name, onChange }) => {
    return (
        <div>
            <label className={styles.label}>{label}</label>
            <input
                className={styles.input}
                type="file"
                name={name}
                onChange={onChange}
            />
        </div>
    );
};

export default FileInput;
