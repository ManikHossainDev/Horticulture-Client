import ForgotPassword from '@/components/Pages/Auth/ForgotPassword/ForgotPassword';
import { Metadata } from 'next';
import React from 'react';

export const metadata : Metadata = {
  title: 'Forgot Password | Horticulture Specialists',
  description: 'This is the forgot password page for our application',
  keywords: ['forgot password', 'page', 'example'],
};
const ForgotPasswordPage = () => {
  return <ForgotPassword />;
};

export default ForgotPasswordPage;
