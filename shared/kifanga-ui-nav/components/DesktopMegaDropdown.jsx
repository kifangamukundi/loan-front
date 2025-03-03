import Link from 'next/link';

const DesktopMegaDropdown = ({ title, items }) => {
  return (
    <li className="relative group hidden md:block px-3 py-2 cursor-pointer">
      <button className="text-lg font-semibold text-gray-800 hover:text-green-600 transition duration-300">
        {title}
      </button>
      <div className="absolute top-0 left-0 transition-all group-hover:translate-y-6 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out z-50 min-w-[560px]">
        <div className="relative top-6 p-6 bg-gray-200 rounded-2xl shadow-xl w-full">
          <div className="w-8 h-8 bg-white transform rotate-45 absolute top-0 z-0 left-6 transition-transform group-hover:translate-x-[12rem] duration-500 ease-in-out rounded-sm"></div>
          <div className="relative z-10">
            <div className="grid grid-cols-2 gap-8">
              {items.map((category, index) => (
                <div key={index}>
                  <p className="uppercase tracking-wider text-gray-700 font-semibold text-sm mb-3">
                    {category.title}
                  </p>
                  <ul className="space-y-3">
                    {category.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          className="block p-3 -mx-2 rounded-lg transition ease-in-out duration-300 bg-white text-gray-800 font-medium hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:via-green-200 hover:text-green-800 shadow-md hover:shadow-lg"
                        >
                          <div className="flex justify-between items-center">
                            <span>{link.label}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default DesktopMegaDropdown;
