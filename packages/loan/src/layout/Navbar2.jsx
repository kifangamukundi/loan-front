import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-semibold text-gray-800">
            FulusAfrica
          </span>
        </Link>

        {/* Centered Links for Desktop */}
        <div className="hidden md:flex flex-grow justify-center space-x-8">
          <Link
            href="/blog"
            className="text-gray-800 hover:text-blue-600 font-medium text-sm transition duration-300"
          >
            Blog
          </Link>
          <Link
            href="/admin/dashboard"
            className="text-gray-800 hover:text-blue-600 font-medium text-sm transition duration-300"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/posts"
            className="text-gray-800 hover:text-blue-600 font-medium text-sm transition duration-300"
          >
            Posts
          </Link>
          <Link
            href="/admin/countries"
            className="text-gray-800 hover:text-blue-600 font-medium text-sm transition duration-300"
          >
            Countries
          </Link>
          <Link
            href="/admin/regions"
            className="text-gray-800 hover:text-blue-600 font-medium text-sm transition duration-300"
          >
            Regions
          </Link>
          <Link
            href="/admin/cities"
            className="text-gray-800 hover:text-blue-600 font-medium text-sm transition duration-300"
          >
            Cities
          </Link>
        </div>

        {/* Login Button on Right */}
        <div className="hidden md:block">
          <Link
            href="/login"
            className="text-gray-800 hover:text-blue-600 font-medium text-sm transition duration-300"
          >
            Login
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button className="md:hidden text-gray-800 focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden bg-white shadow-md p-4">
        <Link
          href="/blog"
          className="block text-gray-800 hover:text-blue-600 font-medium text-sm py-2"
        >
          Blog
        </Link>
        <Link
          href="/admin/dashboard"
          className="block text-gray-800 hover:text-blue-600 font-medium text-sm py-2"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/posts"
          className="block text-gray-800 hover:text-blue-600 font-medium text-sm py-2"
        >
          Posts
        </Link>
        <Link
          href="/admin/countries"
          className="block text-gray-800 hover:text-blue-600 font-medium text-sm py-2"
        >
          Countries
        </Link>
        <Link
          href="/admin/regions"
          className="block text-gray-800 hover:text-blue-600 font-medium text-sm py-2"
        >
          Regions
        </Link>
        <Link
          href="/admin/cities"
          className="block text-gray-800 hover:text-blue-600 font-medium text-sm py-2"
        >
          Cities
        </Link>
        <Link
          href="/login"
          className="block text-gray-800 hover:text-blue-600 font-medium text-sm py-2"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
