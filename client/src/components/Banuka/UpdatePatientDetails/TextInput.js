// TextInput.js
import React from 'react';
import styles from './UpdatePatient.module.css'; // Import the CSS module

const TextInput = ({ label, name, value, onChange, placeholder, type = 'text', required = false , readonly = false, disabled=false,pattern,title }) => {
    return (
        <div>
            <label className={styles.label}>{label}</label>
            <input
            style={{width:'200px'}}
                className={styles.input}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                readOnly={readonly}
                disabled={disabled}
                pattern={pattern}
                title={title}
            />
        </div>
    );
};

export default TextInput;
