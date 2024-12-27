
import About from '@/components/Pages/Home/About';
import BannerSection from '@/components/Pages/Home/BannerSection';
import CallToAction from '@/components/Pages/Home/CallToAction';
import PopularCategory from '@/components/Pages/Home/PopularCategory';
import QA from '@/components/Pages/Home/QA';
import Service from '@/components/Pages/Home/Service';
const HomePage = () => {
  return (
    <section>
      <BannerSection />
      <PopularCategory/>
      <Service />
      <CallToAction />
      <QA />
    </section>
  );
};

export default HomePage;
