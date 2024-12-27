import Checkout from '@/components/Pages/Checkout/Checkout';
import { Metadata } from 'next';
import React from 'react';
export const metadata : Metadata = {
  title: 'Checkout | Horticulture Specialists',
  description: 'Checkout page for your order',
  keywords: ['checkout', 'order', 'payment'],
};
const page = () => {
  return <Checkout/>;
};

export default page;
