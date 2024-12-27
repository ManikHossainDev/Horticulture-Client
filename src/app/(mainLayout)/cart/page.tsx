import Cart from '@/components/Pages/Cart/Cart';
import { Metadata } from 'next';

export const metadata : Metadata = {
  title: 'Cart | Horticulture Specialists',
  description: 'This is the cart page for your shopping cart',
  keywords: ['cart', 'page', 'example'],
};
const page = () => {
  return <Cart />;
};

export default page;
