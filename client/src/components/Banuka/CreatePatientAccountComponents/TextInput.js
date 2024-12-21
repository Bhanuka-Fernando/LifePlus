// TextInput.js
import React from 'react';
import styles from './CreateAccountForm.module.css'; // Import the CSS module

const TextInput = ({ label, name, value, onChange, placeholder, type = 'text', required = false,pattern,title }) => {
    return (
        <div>
            <label className={styles.label}>{label}</label>
            <input
                style={{width:'200px'}}
                className={styles.input}
                pattern={pattern}
                title={title}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};

export default TextInput;
