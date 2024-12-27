import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="w-full bg-primary text-white px-5 py-28">
      <div className="w-full md:container mx-auto text-center">
        <h1 className="text-2xl md:text-4xl font-semibold mb-8 leading-relaxed tracking-wide">
          Need someone to take care of your garden & lawn? <br />
          Just inform us and sit with relax!!
        </h1>
        <div className="flex justify-center gap-4">
          <Link href="/contact-us">
            <button className="px-8 py-3 border border-white text-white  rounded-lg duration-300 hover:bg-white hover:text-green-500 transition-all">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
