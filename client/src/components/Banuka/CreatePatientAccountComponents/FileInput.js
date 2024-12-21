// FileInput.js
import React from 'react';
import styles from './CreateAccountForm.module.css'; // Import the CSS module

const FileInput = ({ label, name, onChange,multiple=false }) => {
    return (
        <div>
            <label className={styles.label}>{label}</label>
            <input
                className={styles.input}
                type="file"
                name={name}
                onChange={onChange}
                multiple={multiple}
            />
        </div>
    );
};

export default FileInput;
