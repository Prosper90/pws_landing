
const HeroSection = () => {
  return (
    <div className="pt-16 md:pt-24 pb-12 md:pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-4xl font-bold text-gray-900 leading-tight mb-4 text-wrap ">
              We're unlocking the health care value chain for the Economic community of West African States (ECOWAS)
            </h1>
            {/* <p className="text-lg text-gray-600 mb-6">
              Strengthening partnership to coordinate the Investment for the vulnerable group fund (VGF)
            </p> */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#5C97FF] hover:bg-blue-700"
              >
                Join the Community
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#5C97FF] text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12 relative">
            {/* Profile circles */}
            {/* <div className="grid grid-cols-3 gap-2 relative">
              {[...Array(9)].map((_, index) => (
                <div 
                  key={index} 
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 ${
                    index % 2 === 0 ? 'animate-pulse' : ''
                  }`}
                  style={{ 
                    position: 'relative',
                    top: index % 3 === 0 ? '20px' : index % 3 === 1 ? '0px' : '40px'
                  }}
                >
                 <img src={`/Ellipse ${index}.png`} alt="" />  
                </div>
              ))}
            </div> */}
            <div className="h-full rounded-lg">
              <img src="comingSoon.png" alt="Hero Illustration" className="h-auto md:h-96 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 text-sm text-gray-500">
        {/* <div className="flex items-center">
          <span>Made with</span>
          <span className="ml-1 inline-block">
            <span className="font-semibold text-blue-600">Softr</span>
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default HeroSection;