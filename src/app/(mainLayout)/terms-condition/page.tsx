import TermsConditions from '@/components/Pages/TermsConditions/TermsConditions'
import { Metadata } from 'next'
import React from 'react'
export const metadata:Metadata = {
  title: 'Terms and Conditions | Horticulture Specialists',
  description: 'This is the terms and conditions page for our application',
  keywords: ['terms and conditions', 'page', 'example'],
}
const page = () => {
  return <TermsConditions/>
}

export default page