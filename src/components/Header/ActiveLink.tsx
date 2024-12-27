'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface IActiveProps {
  label: string;
  href: string;
}

const ActiveLink = ({ label, href }: IActiveProps) => {
  const pathName = usePathname();
  const isActive = pathName == href;
  return (
    <Link
      href={href}
      className={`text-[17px] p-4 ${isActive ? 'text-gray-950 border-b-[5px] border-primary' : 'text-gray-500'}`}
    >
      {label}
    </Link>
  );
};

export default ActiveLink;
