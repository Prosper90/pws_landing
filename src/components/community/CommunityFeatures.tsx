
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
                <h3 className="text-xl font-semibold text-gray-900 mb-3">SDG 1 (No poverty)</h3>
                <p className="text-gray-600 mb-4">
                   Poverty is a complex issue impacting many lives. The World Health Organization (WHO) highlights that out-of-pocket healthcare expenses worsen poverty in low- and middle-income countries, underscoring the need for Universal Health Coverage. In Nigeria, the National Health Insurance Authority (NHIA) Law helps provide essential healthcare for vulnerable populations through the Basic Health Care Provision Fund. Together, we can ensure everyone has access to necessary healthcare.
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
                   The Federal Ministry of Health, in collaboration with various stakeholders including regulators such as NAFDAC, NHIA, PCN, and NPHCDA, along with private sector partners and civil society organizations, is actively addressing the challenges facing the nation in improving the health and well-being of Nigerians. Access to essential healthcare remains a primary focus. One of our key strengths is the Medical Relief Program implemented by the Nigerian government, which aims to reduce the cost of pharmaceutical products and consumables. This initiative involves purchasing drugs from local manufacturers and distributing them through the 8,800 primary healthcare centers, 37 general hospitals across the states, and federal teaching hospitals Nationally.
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
                   The government of Nigeria is actively pursuing the industrialization of the health sector to enhance job opportunities for its citizens. By investing in healthcare infrastructure, technology, and services, this initiative seeks to build a self-sufficient medical system that not only improves the quality of healthcare available within the country but also aims to diminish the trend of medical tourism, where Nigerians travel abroad for medical treatment. Through these efforts, the government envisions a robust health sector that will not only provide decent work but also promote economic growth and development within the nation.
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
                <h3 className="text-xl font-semibold text-gray-900 mb-3">SDG 17 (partnership for the Goals)</h3>
                <p className="text-gray-600">
                   In alignment with the Executive Order issued by the President to enhance the healthcare value chain, this initiative ensures that manufacturers entering Nigeria will pay zero tariffs on machinery imports needed to establish manufacturing plants in the country. Additionally, there are special waivers for active pharmaceutical ingredients and excipients imported by these manufacturers. This effort is further supported by NAFDAC's 5 + 5 policies and NHIA's commitment to prioritize locally manufactured health products. Ultimately, this will create more employment opportunities for Nigerians and improve both the sectorial and national economic status.
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