import logo from "@/assets/logo/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { LuInstagram, LuYoutube } from "react-icons/lu";
import { MdOutlineMail, MdOutlineWhatsapp, MdPhone } from "react-icons/md";
import { TiSocialFacebook } from "react-icons/ti";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-zinc-100 mt-20">
      <div className="w-full container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 px-8 py-10  pt-10">
        <div className="space-y-5">
          <Image
            width={80}
            height={80}
            src={logo}
            alt="logo"
            className="mx-auto md:mx-0 rounded-full"
          />
          <p className="text-center md:text-start">
            The future of the horticulture industry is in your hands. Become a
            business and advertise your company with us today or be a supporter
            of the industry by buying from our marketplace! Either way, we are
            here to help, helping you help local businesses!
          </p>
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-primary text-center md:text-start">
            Quick Link
          </h1>
          <ul className="flex flex-col gap-3 mt-5 text-center md:text-start">
            <li>
              <Link href={"/"} className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href={"/marketplace"} className="hover:text-primary">
                Marketplace
              </Link>
            </li>
            <li>
              <Link href={"/locate"} className="hover:text-primary">
                Locate
              </Link>
            </li>
            <li>
              <Link href={"/about-us"} className="hover:text-primary">
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className=" text-2xl font-semibold text-primary text-center md:text-start">
            Help
          </h1>
          <ul className="flex flex-col gap-3 mt-5 text-center md:text-start">
            <li>
              <Link href={"/terms-condition"} className="hover:text-primary">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href={"/privacy-policy"} className="hover:text-primary">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href={"/contact-us"} className="hover:text-primary">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary text-center md:text-start">
            Contact us
          </h1>
          <ul className="flex flex-col gap-5 mt-5 text-center md:text-start">
            <Link
              href={"mailto:horticulturespecialists@gmail.com"}
              className="flex items-center gap-3"
            >
              <li className="flex items-center gap-4 justify-center md:justify-start">
                <MdOutlineMail size={24} className="text-primary" />{" "}
                horticulturespecialists@gmail.com
              </li>
            </Link>
            <div className="w-full flex justify-center md:justify-start gap-5">
              <Link href={"https://www.facebook.com/HortSpec/"} target="_blank">
                <div className="flex justify-center items-center bg-primary hover:bg-white transition-all duration-300 rounded-full p-2.5 hover:text-[#333333] cursor-pointer text-white">
                  <TiSocialFacebook size={25} />
                </div>
              </Link>
              <Link
                href={"https://www.instagram.com/hortspec/"}
                target="_blank"
              >
                <div className="flex justify-center items-center bg-primary hover:bg-white transition-all duration-300 rounded-full p-2.5 hover:text-[#333333] cursor-pointer text-white">
                  <LuInstagram size={23} />
                </div>
              </Link>
              <Link
                href={"https://www.youtube.com/@hortspec9909"}
                target="_blank"
              >
                <div className="flex justify-center items-center bg-primary hover:bg-white transition-all duration-300 rounded-full p-2.5 hover:text-[#333333] cursor-pointer text-white">
                  <LuYoutube size={23} />
                </div>
              </Link>
            </div>
          </ul>
        </div>
      </div>
      <hr />
      <p className="text-center py-5">
        &copy; {year} Horticulture Specialists. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
