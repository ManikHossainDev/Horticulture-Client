import Register from '@/components/Pages/Auth/Register/Register';
import { Metadata } from 'next';
import React from 'react';

export const metadata : Metadata = {
    title: 'Register | Horticulture Specialists',
    description: 'This is the registration page for our application',
    keywords: ['registration', 'page', 'example']
};
const RegisterPage = () => {
  return <Register/>;
};

export default RegisterPage;