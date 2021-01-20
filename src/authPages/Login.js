import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import CompleteDataContext from '../Context';
import loginHttpServices from '../services/login';
import dataHttpServices from '../services/devices';

import HiddenInputLabel from '../smallComponents/HiddenInputLabel';
import OutlinedInput from '../smallComponents/OutlinedInput';
import SocialCluster from '../smallComponents/SocialCluster';

function Login() {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { setUserData } = useContext(CompleteDataContext);

  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ username, password }) => {
    try {
      const user = await loginHttpServices.login({
        username: username,
        password: password,
      });

      window.localStorage.setItem('loggedWyreUser', JSON.stringify(user));

      dataHttpServices.setToken(user.data.token);
      dataHttpServices.setUserId(user.data.id);
      setUserData(user);
    } catch (exception) {
      setErrorMessage(exception.response.data.error);
    }
  };

  const removeErrorMessage = () => {
    setErrorMessage(undefined);
  };

  return (
    <div className='auth-page-container'>
      <form
        className='signup-login-contact-form'
        action='#'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='signup-login-heading first-heading--auth'>
          Welcome Back
        </h1>

        <p className='outlined-input-container'>
          <HiddenInputLabel htmlFor='username' labelText='Username' />
          <OutlinedInput
            className='signup-login-contact-input'
            type='text'
            name='username'
            id='username'
            placeholder='Username'
            autoComplete='username'
            required={true}
            autoFocus={true}
            register={register}
            onChange={removeErrorMessage}
          />
        </p>

        <p className='outlined-input-container'>
          <HiddenInputLabel htmlFor='password' labelText='Password' />
          <OutlinedInput
            className='signup-login-contact-input'
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            autoComplete='new-password'
            required={true}
            autoFocus={false}
            register={register}
            onChange={removeErrorMessage}
          />
        </p>

        <p className='signup-login-contact-error-message'>{errorMessage}</p>

        <div className='forgot-password-wrapper'>
          <Link className='forgot-password' to='/reset-password'>
            Forgot Password?
          </Link>
        </div>

        <button className='signup-login-contact-button'>Log in</button>
      </form>

      <SocialCluster />
    </div>
  );
}

export default Login;
