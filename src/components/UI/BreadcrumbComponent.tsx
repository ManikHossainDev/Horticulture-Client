'use client';
import React from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import Link from 'next/link';

interface BreadcrumbItem {
  href?: string;
  title: React.ReactNode;
}

interface BreadcrumbComponentProps {
  items: BreadcrumbItem[];
}

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({ items }) => {
  // Map through the items and format them for the Ant Design `items` prop
  const breadcrumbItems = items.map((item) => ({
    title: item.href ? <Link href={item.href}>{item.title}</Link> : item.title,
  }));

  return <AntBreadcrumb className="text-[16px]" items={breadcrumbItems} />;
};

export default BreadcrumbComponent;
