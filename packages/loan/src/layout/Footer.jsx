import { SITE_NAME, SITE_SLOGAN } from "@/helpers";
import { IconLogo } from "kifanga-ui-icons";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white shadow-md p-6 mt-8">
      <div className="container mx-auto text-center">
        <div className="flex justify-center items-center">
          <Link href="/" className="font-bold text-gray-700 text-xl">
            <IconLogo
              title={SITE_NAME}
              firstPart="Loan"
              secondPart="App"
              firstPartColor="#2F855A"
              secondPartColor="#4A5568"
            />
          </Link>
        </div>
        <p className="text-gray-600 mt-2 mb-4 text-lg">{SITE_SLOGAN}</p>
        <hr className="border-gray-200 mb-4" />
        <div className="text-gray-600 text-md">
          {`© 2025 ${SITE_NAME}. All rights reserved.`}
        </div>
      </div>
    </footer>
  );
};

export default Footer;