import React from 'react';

const StatsSection = () => {
  const stats = [
    { value: '1500+', label: 'Active Slack Members' },
    { value: '4000+', label: 'Posts & Conversations' },
    { value: '$600k+', label: 'Fund Raised By Community Founders' }
  ];

  return (
    <div className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our vision
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Our vision is to create a brighter future for all Nigerians, and we are determined to make it a reality by 2030.
            Explore our websites to learn more about our initiatives, get involved and join us in our journey towards a brighter future for all.
          </p>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-lg text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div> */}

        <div className="flex flex-col md:flex-row md:justify-between items-center">
          {/* First one */}
          <div className="text-center mb-12">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Our vision
              </h2>
              <div className="max-w-4xl mx-auto text-md text-gray-600">
                Our vision is to strenghten the Basic Healthcare through participatory investment, ensuring sustainable healthcare for the poor and vulnerable
              </div>
          </div>
          {/* Second one */}
          <div className="text-center mb-12">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Our focus
              </h2>
              <div className="max-w-3xl mx-auto text-md text-gray-600">
                We strive to unite the industry regulators, local industrial manufacturers, and a of tech entrepreneurs towards a common goa.
                 We aspire to become an inspiration by being the first third world country to achieve all sustainable development goals set by the United nation
              </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-20">
            Prime white stallion plans
          </h3>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;