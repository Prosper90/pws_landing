
const StatsSection = () => {

  return (
    <div className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
             Participatory Investment 
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Healthcare manufacturers investing in the West African region can leverage Prime White Stallions to participate in a collaborative finance framework aimed at achieving universal health coverage.
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
                We aim to unlock investment in the healthcare value chain for the Economic Community of
                West African States (ECOWAS) to achieve universal health coverage
              </div>
          </div>
          {/* Second one */}
          <div className="text-center mb-12">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Mission
              </h2>
              <div className="max-w-3xl mx-auto text-md text-gray-600">
                We leverage volume guarantees and framed contracts from national health insurance schemes to our manufacturers as a means to reduce investment risk for capital providers
              </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-20">
            HOW PARTICIPANTS BLEND FOR UNIVERSAL HEALTH COVERAGE.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;