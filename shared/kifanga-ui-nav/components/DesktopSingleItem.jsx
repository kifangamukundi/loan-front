import Link from 'next/link';

const DesktopSingleItem = ({ href, label }) => {
  return (
    <li className="relative group hidden md:block px-3 py-2">
      {' '}
      {/* Hide on mobile, show on desktop */}
      <Link href={href} className="hover:opacity-50 cursor-pointer">
        {label}
      </Link>
    </li>
  );
};

export default DesktopSingleItem;
