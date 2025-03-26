
const ResourcesSection = () => {


  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          About us
        </h2>
        
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {resources.map((resource, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {resource.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {resource.description}
              </p>
              <a 
                href={resource.link} 
                className="text-blue-600 hover:text-blue-800 inline-flex items-center"
              >
                Learn More
                <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          ))}
        </div> */}

        <div className="max-w-1xl mx-auto text-md text-gray-600">
            Prime White Stallions is dedicated to transforming healthcare financing for the poor and vulnerable through participatory investment. We bridge the gap between donors, investors, entrepreneurs, and the Nigerian Basic Healthcare Provision Fund (BHCPF) to create sustainable healthcare solutions. 
        </div>
        <div className="max-w-1xl mx-auto text-md text-gray-600">
          By blending donor funds with private capital, we enable innovative financing models that empower businesses and enhance healthcare access. Our mission is to foster strategic partnerships that drive impactful investments, ensuring quality healthcare reaches those who need it most.
        </div>
        
        <div className="text-center mt-10">
          <a 
            href="#" 
            className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50"
          >
            View All Resources
          </a>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            What's More For Founders & Investors...
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ResourcesSection;