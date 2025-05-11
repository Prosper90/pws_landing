
const CommunityFeatures = () => {
  return (
    <div className="pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="hidden absolute inset-0 md:flex items-center justify-center z-0">
            <div className="h-full w-0.5 bg-yellow-400"></div>
          </div>
          
          <div className="relative z-10">
            {/* Feature 1: Community & Network */}
            <div className="md:flex items-center mb-24">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white mb-4">1</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">PWS Donors</h3>
                <p className="text-gray-600 mb-4">
                  Our donors help attract private capital to the ECOWAS region. Through our collaboration with
                  supply chain traceability systems, each country can maintain authentic data on drug supply
                  across the universal health coverage framework. 
                </p>
                {/* <p className="text-gray-600">
                  The community is designed to help you easily find the most 
                  relevant conversations, get help, and network with others. Our 
                  community spaces are specific to the stage, startup building, 
                  raising funds, getting the first customer, connecting with 
                  partners, startup topics and more.
                </p> */}
              </div>
              <div className="md:w-1/2 md:pl-12">
                <div className="relative rounded-md overflow-hidden shadow-lg">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    {/* This would be an image in the actual implementation */}
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <img src="/card 1.png" alt="" />
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-red-500 rounded-full"></div>
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Feature 2: Member Events */}
            <div className="md:flex items-center flex-row-reverse">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pl-12">
                <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white mb-4">2</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Capital Providers:</h3>
                <p className="text-gray-600">
                  We collaborate with capital providers to secure investment funds for manufacturers that come
                  to West Africa. Our donor funds serve as a key incentive for private capital providers.
                </p>
              </div>
              <div className="md:w-1/2 md:pr-12">
                <div className="relative rounded-md overflow-hidden shadow-lg">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    {/* This would be an image in the actual implementation */}
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <img src="/card 2.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Feature 3: Further more */}
            <div className="md:flex items-center mb-24">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white mb-4">3</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Manufacturers:</h3>
                <p className="text-gray-600 mb-4">
                  Our primary focus is pharmaceutical manufacturers making foreign direct investments in the
                  region. Additionally, we connect these manufacturers with capital providers who have pledged
                  funding through our initiative, which utilises a blended finance structure.
                </p>
                {/* <p className="text-gray-600">
                  The community is designed to help you easily find the most 
                  relevant conversations, get help, and network with others. Our 
                  community spaces are specific to the stage, startup building, 
                  raising funds, getting the first customer, connecting with 
                  partners, startup topics and more.
                </p> */}
              </div>
              <div className="md:w-1/2 md:pl-12">
                <div className="relative rounded-md overflow-hidden shadow-lg">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    {/* This would be an image in the actual implementation */}
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <img src="/card 3.png" alt=""  />
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-red-500 rounded-full"></div>
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Feature 4: Again more */}
            <div className="md:flex items-center flex-row-reverse">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pl-12">
                <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white mb-4">4</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">National Governments:</h3>
                <p className="text-gray-600">
                  We assist manufacturers in securing framed contracts and volume guarantees that align with
                  national universal health coverage policies. This ensures that enrollees in the National Health
                  Insurance Scheme can access products from these manufacturers.
                </p>
              </div>
              <div className="md:w-1/2 md:pr-12">
                <div className="relative rounded-md overflow-hidden shadow-lg">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    {/* This would be an image in the actual implementation */}
                    <div className="w-full h-full  flex items-center justify-center text-white">
                      <img src="/card 4.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityFeatures;