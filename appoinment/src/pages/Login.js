import React from 'react'
import { Form, Input, message } from "antd";
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import "../styles/RegisterStyles.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { setUser } from '../redux/features/userSlice';
function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading())
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        dispatch(setUser(res.data.user));  // Save user data in Redux
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error("Something went wrong")
    }
  }
  return (
    <div>
      <div className='pt-5'>
        <div className='form-container container pt-3 w-50 pb-5'>
          <Form layout='vertical' onFinish={onfinishHandler}>
            <h1 className='text-center'>Login Form</h1>

            <Form.Item label='Email' name="email">
              <Input type='email' required></Input>
            </Form.Item>
            <Form.Item label='Password' name="password">
              <Input type='password' required></Input>
            </Form.Item>
            <div style={{ position: 'relative', left: '40%' }}>
              <Link style={{ textDecoration: 'none' }} to={'/register'}>New User? Click Here</Link><br />
              <button className="btn btn-primary ps-3 ms-4 mt-3" type="submit">Login</button>
            </div>

          </Form>

        </div>
      </div>
    </div>
  )
}

export default Login