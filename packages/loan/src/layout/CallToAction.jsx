import Link from 'next/link';

const CallToAction = ({ title, description, buttonText, buttonLink }) => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto text-center px-4 md:px-0">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-8">
          {title}
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          {description}
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-4">
          <Link
            href={buttonLink}
            className="mt-6 inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;