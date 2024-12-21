import React from 'react';
import { Form, Input, message } from 'antd';
import '../styles/RegisterStyles.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { BASE_URL } from '../environment/environment';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Form handler
    const onfinishHandler = async (values) => {
        const { email, password } = values; // destructure email and password
        try {
            dispatch(showLoading());
            const res = await axios.post(`${BASE_URL}/api/user/PatientLogin`, { email, password }); // Pass email and password
            dispatch(hideLoading());

            if (res.data.success) {
                localStorage.setItem("token", res.data.data);
                localStorage.setItem("_id", res.data.Id);
                localStorage.setItem('UserEmail', email); 
                console.log("email", email);
                console.log("_ID", res.data.Id);
                console.log(res.data.data);
                message.success('Login Successful');
                navigate('/Patient-home');
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Something Went Wrong!');
        }
    };

    return (
        <div className="form-container">
            <Form layout="vertical" onFinish={onfinishHandler} className='register-form'>
                <h3 className='text-center'>Login Form</h3>
                
                <Form.Item label="Email" name="email">
                    <Input type="email" required />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password" required />
                </Form.Item>
                {/* <Link to='/register' className='ms-2'>Not a User? Register</Link> */}

                <button className="btn btn-primary" type="submit" style={{backgroundColor:'#53c373',color:'white'}}>Login</button>
            </Form>
        </div>
    );
};

export default Login;
