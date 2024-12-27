import ContactUs from '@/components/Pages/ContactUs/ContactUs';
import { Metadata } from 'next';
export const metadata : Metadata = {
  title: 'Contact Us | Horticulture Specialists',
  description: 'This is the contact us page for our application',
  keywords: ['contact', 'us', 'page', 'example'],
};

const ContactUsPage = () => {
  return <ContactUs/>;
};

export default ContactUsPage;