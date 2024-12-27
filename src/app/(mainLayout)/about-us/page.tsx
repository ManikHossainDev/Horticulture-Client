import AboutUs from '@/components/Pages/AboutUs/AboutUs';
import { Metadata } from 'next';
export const metadata : Metadata = {
  title: 'About Us | Horticulture Specialists',
  description: 'This is the about us page for our application',
  keywords: ['about us', 'page', 'example'],
}
const AboutUsPage = () => {
  return <AboutUs/>;
};

export default AboutUsPage;