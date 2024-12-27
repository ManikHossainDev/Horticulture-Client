import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import AuthValidationProviders from "@/lib/AuthValidationProviders";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <AuthValidationProviders>
        <Header />
        {children}
        <Footer />
      </AuthValidationProviders>
    </section>
  );
};

export default MainLayout;
