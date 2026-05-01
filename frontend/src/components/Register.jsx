import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import useAuthStore from '../store/useAuthStore';
import './Register.css';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Register = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    try {
      // Matches userCtrl.create in backend expecting { name, email, password }
      const response = await axios.post('http://localhost:5000/api/users', {
        name: data.name,
        email: data.email,
        password: data.password
      });
      
      // Try to auto-login the user immediately after successful registration
      try {
        const loginResponse = await axios.post('http://localhost:5000/api/auth/signin', {
          email: data.email,
          password: data.password
        });
        
        login(loginResponse.data.user, loginResponse.data.token);
        toast.success(`Registration successful! Welcome, ${loginResponse.data.user.name}!`);
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } catch {
        // If login fails for some reason, just show success and go to sign in
        setSuccessMsg(response.data.message || 'Registration successful! Please sign in.');
        setTimeout(() => {
          navigate('/signin');
        }, 1500);
      }

    } catch (error) {
      // Backend catches model validation errors and responds with { error: "error message" }
      setErrorMsg(error.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Register</h2>
        
        {/* On-screen display for Backend Errors/Success instead of alerts */}
        {errorMsg && <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>{errorMsg}</div>}
        {successMsg && <div className="success-message" style={{ color: 'green', marginBottom: '15px' }}>{successMsg}</div>}

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            {...register('name')}
          />
          {errors.name && <span className="error-text" style={{ color: 'red', fontSize: '12px' }}>{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register('email')}
          />
          {errors.email && <span className="error-text" style={{ color: 'red', fontSize: '12px' }}>{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Create a password"
            {...register('password')}
          />
          {errors.password && <span className="error-text" style={{ color: 'red', fontSize: '12px' }}>{errors.password.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <span className="error-text" style={{ color: 'red', fontSize: '12px' }}>{errors.confirmPassword.message}</span>}
        </div>

        <button type="submit" className="btn-register" disabled={isSubmitting}>
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>
        <p className="login-link">
          Already have an account? <Link to="/signin">Sign in here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;