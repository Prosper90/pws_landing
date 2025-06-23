import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 mr-2 flex items-center justify-center text-xs font-bold">
                <img src="/logo.png" alt="" />
              </div>
              <span className="font-bold text-xl">Prime White Stallions</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* <a href="#" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600">
              Buy Discounted SaaS Products
            </a> */}
            <div className="relative">
              <button
                className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600 inline-flex items-center"
                // onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              >
                Team
                {/* <ChevronDown className="ml-1 h-4 w-4" /> */}
              </button>
              {/* {isResourcesOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">All Resources</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Community</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Events</a>
                </div>
              )} */}
            </div>
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600"
            >
              Contact Us
            </a>
            {/* <a href="#" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600">
              Advertise
            </a> */}
            <a
              href="/manufacturers"
              className="ml-4 px-4 py-2 text-sm font-medium text-white bg-[#5C97FF] rounded-md hover:bg-blue-700"
            >
              Become A Member
            </a>

            <div className="flex justify-center items-center">
              {/* <a href="#" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600">
                SignUp
              </a>       
              | */}
              <a
                href="/login"
                className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600"
              >
                LogIn
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#">Team</a>
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
            >
              Contact Us
            </a>
            <a
              href="/manufacturers"
              className="block px-3 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Become A Member
            </a>
            <a
              href="/login"
              className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600"
            >
              LogIn
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
