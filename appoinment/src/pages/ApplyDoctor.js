import React from 'react'
import Layout from '../components/Layout'
import { Form, Row, Col, Input, TimePicker, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import axios from 'axios'

function ApplyDoctor() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user);
    //handle form
    const handleFinish = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/apply-doctor', { ...values, userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.success);
                navigate("/")
            } else {
                message.error(res.data.success)
            }

        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error("Something went Wrong")
        }
    }
    return (
        <Layout>
            <h1 className='text-center'>APPLY DOCTOR</h1>
            <Form layout="vertical" onFinish={handleFinish}>
                <h4 className='ps-3'>Personal Details</h4>
                <Row gutter={20} className='ps-3 pe-3'>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="First Name" name="firstName" required rules={[{ required: true }]}>
                            <Input type='text' placeholder='Your First Name'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Last Name" name="lastName" required rules={[{ required: true }]}>
                            <Input type='text' placeholder='Your Last Name'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Phone Number" name="phone" required rules={[{ required: true }]}>
                            <Input type='text' placeholder='Your Phone Number'></Input>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Email" name="email" required rules={[{ required: true }]}>
                            <Input type='email' placeholder='Your Email'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Website" name="website">
                            <Input type='text' placeholder='Your Website'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Address" name="address" required rules={[{ required: true }]}>
                            <Input type='text' placeholder='Your Address'></Input>
                        </Form.Item>
                    </Col>
                </Row>

                <h4 className='ps-3'>Professional Details</h4>
                <Row gutter={20} className='ps-3 pe-3'>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Specialization" name="specialization" required rules={[{ required: true }]}>
                            <Input type='text' placeholder='Your Specialization'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Experience" name="experience" required rules={[{ required: true }]}>
                            <Input type='text' placeholder='Your Experience'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Fees Per Consultaion" name="feesPerCunsaltation" required rules={[{ required: true }]}>
                            <Input type='number' placeholder='Your Fees Per Consultaion'></Input>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Timings" name="timings" required >
                            <TimePicker.RangePicker format="HH:mm" />
                        </Form.Item>
                    </Col>
                </Row>
                <div className="d-flex justify-content-center ">
                    <button className='btn btn-primary'>Submit</button>
                </div>
            </Form>
        </Layout>
    )
}

export default ApplyDoctor