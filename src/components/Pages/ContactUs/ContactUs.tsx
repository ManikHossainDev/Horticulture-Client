"use client";
import locateImage from "@/assets/locate/locate.png";
import Button from "@/components/UI/Button";
import InputComponent from "@/components/UI/InputComponent";
import { useContactToAdminMutation } from "@/redux/features/contact/contactApi";
import { Form } from "antd";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuInstagram, LuYoutube } from "react-icons/lu";
import { TiSocialFacebook } from "react-icons/ti";
import { toast } from "sonner";
import { useJoinNewsLetterMutation } from "@/redux/features/newsletter/newsLetterApi";
import { FormEvent } from "react";

interface IFormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const ContactUs = () => {
  const [crateContact, { isLoading }] = useContactToAdminMutation();
  const [joinNewsLetter] = useJoinNewsLetterMutation();
  const handleContact = async (values: IFormValues) => {
    try {
      await crateContact(values).unwrap();
      toast.success("Message sent successfully");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };
  const handleNewsLetterSubscribe = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    if(!email) return
    try {
      const res = await joinNewsLetter({ email }).unwrap();
      toast.success(res.message);
      form.reset();
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <section className="w-full">
      {/* Header Section with Background Image */}
      <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ type: "tween", duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={locateImage}
            alt="PrivacyPolicy"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="absolute inset-0 z-0"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </motion.div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-5">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold"
          >
            Contact Us
          </motion.h1>
        </div>
      </div>
      {/* Map Section */}
      {/* <div className="w-full h-[300px] md:h-[500px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9023120277136!2d90.39205331536322!3d23.750920884589988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bfc29ef6c17d%3A0x9479d3a69756541d!2sDhaka!5e0!3m2!1sen!2sbd!4v1617176829393!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          loading="lazy"
          className="border-none"
        ></iframe>
      </div> */}

      {/* Contact Form and Address Section */}
      <div className="w-full md:container flex flex-col md:flex-row px-5 py-20 gap-10">
        {/* Contact Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Send Us a Message
          </h2>
          <Form
            layout="vertical"
            onFinish={handleContact}
            className="space-y-4 mt-8"
          >
            <div className="w-full flex flex-col md:flex-row gap-4">
              <Form.Item
                name="fullName"
                className="w-full"
                rules={[
                  { required: true, message: "Please enter your full name" },
                ]}
              >
                <InputComponent placeholder="Full Name" />
              </Form.Item>
              <Form.Item
                className="w-full"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
              >
                <InputComponent placeholder="Email" />
              </Form.Item>
            </div>
            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <InputComponent placeholder="Phone Number" type="tel" />
            </Form.Item>
            <Form.Item
              name="message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <InputComponent
                placeholder="Message"
                isTextArea={true}
                rows={5}
              />
            </Form.Item>
            <Button type="submit" loading={isLoading}>
              SEND
            </Button>
          </Form>
        </div>

        {/* Address Section */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold">Follow Us</h2>
          <p>
            🌿 Stay connected with us! 🌿 Follow us on Instagram, Facebook, and
            YouTube for the latest on plants, services, and how we support local
            businesses. From lush greenery to expert tips, we’ve got everything
            you need to keep your garden thriving. 📩 Contact us anytime at: {" "}
            <a href="mailto:horticulturespecialists@gmail.com" className="underline text-blue-500">horticulturespecialists@gmail.com</a> Don’t miss out—join our growing
            community today! 🌱✨
          </p>
          <div className="flex gap-5 text-gray-800">
            <Link href={"https://www.facebook.com/HortSpec/"} target="_blank">
              <div className=" size-12 flex justify-center items-center bg-primary hover:bg-white transition-all duration-300 rounded-full p-2.5 hover:text-[#333333] cursor-pointer text-white">
                <TiSocialFacebook size={25} />
              </div>
            </Link>
            <Link href={"https://www.instagram.com/hortspec/"} target="_blank">
              <div className="size-12  flex justify-center items-center bg-primary hover:bg-white transition-all duration-300 rounded-full p-2.5 hover:text-[#333333] cursor-pointer text-white">
                <LuInstagram size={23} />
              </div>
            </Link>
            <Link
              href={"https://www.youtube.com/@hortspec9909"}
              target="_blank"
            >
              <div className=" size-12  flex justify-center items-center bg-primary hover:bg-white transition-all duration-300 rounded-full p-2.5 hover:text-[#333333] cursor-pointer text-white">
                <LuYoutube size={23} />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Subscription Section */}
      <div className="w-full bg-green-500 py-10">
        <div className="w-full md:container py-6 px-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3 text-white">
            <h3 className="text-xl md:text-2xl lg:text-4xl font-semibold">
              Subscribe Now!!
            </h3>
            <p className="text-sm md:text-base">
              Get the latest updates, news, and special offers from our company.
            </p>
          </div>
          <form
            onSubmit={handleNewsLetterSubscribe}
            className="flex w-full md:w-auto items-center bg-white rounded-lg"
          >
            <input
              name="email"
              type="text"
              placeholder="Enter your email"
              className="px-4 py-3 w-full outline-none rounded-l-lg"
            />
            <button className="px-4 py-3 bg-secondary text-white rounded-r-lg">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
