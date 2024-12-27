import VerifyEmail from '@/components/Pages/Auth/VerifyEmail/VefiyEmail';
import { Metadata } from 'next';
import React from 'react';
export const metadata : Metadata = {
  title: 'Verify Email | Horticulture Specialists',
  description: 'This is the verify email page for our application',
  keywords: ['verify Email', 'page', 'example'],
};
const VerifyEmailPage = () => {
  return <VerifyEmail />;
};

export default VerifyEmailPage;
