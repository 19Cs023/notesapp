import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import useAuthStore from '../store/useAuthStore';
import './SignIn.css';

const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const SignIn = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', {
        email: data.email,
        password: data.password
      });
      // Save global state (also Syncs to local storage automatically)
      login(response.data.user, response.data.token);
      
      toast.success(`Welcome back, ${response.data.user.name}!`);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      
    } catch (error) {
      // Backend returns { error: "User not found" } or { error: "Email and password don't match." }
      toast.error(error.response?.data?.error || 'Sign in failed. Check your credentials.');
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign In</h2>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register('email')}
          />
          {errors.email && <span className="error-text" style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register('password')}
          />
          {errors.password && <span className="error-text" style={{ color: 'red', fontSize: '0.8rem' }}>{errors.password.message}</span>}
        </div>

        <button type="submit" className="btn-signin" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Log In'}
        </button>
        <p className="register-link">
          Don't have an account? <Link to="/register">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;