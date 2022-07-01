import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './LoginForm.css';

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to='/' />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className="login-container">
      <img className="form-logo" src="/images/lonote-logo.png" alt="lonote-logo" />
      <form className='login-form' onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <input className="login-username"
          type='text'
          placeholder="Username or Email"
          value={credential}
          onChange={e => setCredential(e.target.value)}
          required
        />
        <input className="login-password"
          type='password'
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="login-submit" type='submit'>Log In</button>
        <div className="to-elsewhere">
          <Link className="to-signup" to="/signup">New Here? Sign Up!</Link>
          <Link className="to-home" to="/">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginFormPage;
