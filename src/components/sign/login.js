import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post('http://localhost:5000/login', values);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.name);
      alert('Login successful');
      navigate('/chat');
    } catch (error) {
      console.error(error.response?.data?.error || 'Error during login');
    }
  };
  return (
    <div className="center-form-container"> {/* Apply centering class here */}
      <Form
        onFinish={handleSubmit}
        name="login-form"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              type: 'email',
              message: 'Please input a valid email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
        <Button type="secondry" onClick={()=>{navigate('/register')}}>
            register?
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
