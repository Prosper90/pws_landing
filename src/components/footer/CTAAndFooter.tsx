
const CTAAndFooter = () => {
  // const footerLinks = [
  //   {
  //     title: 'Crew & Resources',
  //     links: [
  //       { name: 'All Resources', href: '#' },
  //       { name: 'Discount Tools', href: '#', isNew: true },
  //       { name: 'Startup Workshop', href: '#', isNew: true },
  //       { name: 'Investors Talk', href: '#', isNew: true },
  //       { name: 'Co-founder Match', href: '#' },
  //       { name: 'Job & Hire', href: '#', isNew: true },
  //       { name: 'Startups Blogs', href: '#', isNew: true },
  //       { name: 'Startup Demo Day', href: '#', isNew: true }
  //     ]
  //   },
  //   {
  //     title: 'Knowledge Hub',
  //     links: [
  //       { name: 'Learn', href: '#' },
  //       { name: 'Launch & Scale', href: '#', isNew: true },
  //       { name: 'Fundraising', href: '#', isNew: true },
  //       { name: 'Growth/Marketing', href: '#', isNew: true },
  //       { name: 'Startup School', href: '#', isNew: true },
  //       { name: 'Demo Days', href: '#', isNew: true }
  //     ]
  //   },
  //   {
  //     title: 'Members',
  //     links: [
  //       { name: 'Community', href: '#' },
  //       { name: 'Member Directory', href: '#', isNew: true },
  //       { name: 'Member Calendar', href: '#', isNew: true }
  //     ]
  //   },
  //   {
  //     title: 'About & Contact',
  //     links: [
  //       { name: 'About Us', href: '#' },
  //       { name: 'Contact US', href: '#' },
  //       { name: 'VCs Newsletter', href: '#' },
  //       { name: 'VC Daily Updates', href: '#' },
  //       { name: 'Newsletter Ads', href: '#' }
  //     ]
  //   }
  // ];

  return (
    <>
      {/* CTA Section */}
      <div className="py-12 bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Join The Community & Be The Part Of Conversation!
              </h2>
              <p className="text-gray-600">
                Join Other 1000+ Investors, Founders, Operators, Startups & VC Enthusiasts!
              </p>
            </div>
            <div>
              <a 
                href="#" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#5C97FF] hover:bg-blue-700"
              >
                Join Now →
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <div className="mb-8">
            <div className="flex items-center">
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div> */}
          
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((column, idx) => (
              <div key={idx}>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href={link.href} className="text-sm text-gray-600 hover:text-gray-900">
                        {link.name}
                        {link.isNew && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">✨</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div> */}
          
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <p className="text-sm text-gray-600">Made by Pws.</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {/* <a href="#" className="hover:text-gray-900">Contact Us</a>
              <a href="#" className="hover:text-gray-900">Terms and Conditions (T&C)</a>
              <a href="#" className="hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900">Fulfillment & Refund Policy</a> */}

                <a href="#" className="hover:text-gray-900">© 2025 PWS. All Rights Reserved.</a>

            </div>
          </div>
          
          {/* <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-500">Made with</span>
            <span className="ml-1 font-semibold text-blue-600">Softr</span>
          </div> */}
        </div>
      </footer>
    </>
  );
};

export default CTAAndFooter;