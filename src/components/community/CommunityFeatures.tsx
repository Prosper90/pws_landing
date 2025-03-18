
const CommunityFeatures = () => {
  return (
    <div className="pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="h-full w-0.5 bg-yellow-400"></div>
          </div>
          
          <div className="relative z-10">
            {/* Feature 1: Community & Network */}
            <div className="md:flex items-center mb-24">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white mb-4">1</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">SDG 1 (No poverty)</h3>
                <p className="text-gray-600 mb-4">
                  We provide financial protection in healthcare for the vulnerable, reducing out-of-pocket expenses to combat poverty
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
                <h3 className="text-xl font-semibold text-gray-900 mb-3">SDG 3 (Good Health and Well-being)</h3>
                <p className="text-gray-600">
                  Our initiatives and enhances healthcare access and quality for underserved populations
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
                <h3 className="text-xl font-semibold text-gray-900 mb-3">SDG 8 (Decent work and economic growth)</h3>
                <p className="text-gray-600 mb-4">
                  We create sustainable financial models that promote economic stability in the health factor
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
                      <img src="/card 3.png" alt="" />
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
                <h3 className="text-xl font-semibold text-gray-900 mb-3">SDG 17 (partnership for the Goals)</h3>
                <p className="text-gray-600">
                  We collaborate with governments,  NGO's and private sectors to improve healthcare financing and sustainability
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