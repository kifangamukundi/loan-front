import Link from 'next/link';
import {
  DesktopUserDropdown2,
  MobileNav,
} from 'kifanga-ui-nav';
import { mobile1, mobile2, mobile3, mobile4, mobile5, userMenu } from '@/data/nav';
import { IconLogo } from 'kifanga-ui-icons';
import { BASE_URL, SITE_NAME } from '@/helpers';


const Navbar = () => {
  return (
    <header className="container mx-auto px-4 py-6 flex items-center justify-between bg-white text-gray-700">
      {/* Logo */}
      <Link href="/" className="font-bold text-gray-700 text-lg">
        <IconLogo
          title={SITE_NAME}
          firstPart="Loan"
          secondPart="App"
          firstPartColor="#2F855A"
          secondPartColor="#4A5568"
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex flex-grow">
      </nav>

      {/* User Dropdown */}
      <DesktopUserDropdown2 url={BASE_URL} />

      {/* Mobile Navigation */}
      <MobileNav 
        url={BASE_URL}
        first='Loan'
        second='App'
        userMenu={userMenu} 
        menu1={mobile1} 
        menu2={mobile2} 
        menu3={mobile3} 
        menu4={mobile4} 
        menu5={mobile5} 
      />
    </header>
  );
};

export default Navbar;