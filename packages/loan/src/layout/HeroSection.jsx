import Link from "next/link";

const HeroSection = ({ title, description, linkText, linkHref, imgSrc, imgAlt }) => {
  return (
    <section className="py-4 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            {title}
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            {description}
          </p>
          <Link href={linkHref} className="mt-6 inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
              {linkText}
          </Link>
        </div>
        <div className="md:w-1/2">
          <img
            src={imgSrc}
            alt={imgAlt}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;