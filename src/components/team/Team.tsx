import { useState } from "react";

export default function Team() {
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const teamMembers = [
    {
      name: "ANTHONY DOUGLAS",
      img: "./bobby.png",
      title: "CEO",
      bio: "Glavi amet ritnil libero molestie ante ut fringilla purus eros quis glavrid from dolor amet iquam lorem bibendum",
      socials: ["linkedin", "twitter"],
    },
    {
      name: "NDUKWE KENECHUKWU",
      img: "./kene.jpg",
      title: "HEAD OF PARTNERSHIPS",
      bio: "Glavi amet ritnil libero molestie ante ut fringilla purus eros quis glavrid from dolor amet iquam lorem bibendum",
      socials: ["linkedin", "twitter"],
    },
    {
      name: "Onyekosor Prosper",
      img: "./prosper.png",
      title: "CTO",
      bio: "Glavi amet ritnil libero molestie ante ut fringilla purus eros quis glavrid from dolor amet iquam lorem bibendum",
      socials: ["linkedin", "twitter"],
    },
  ];

  const SocialIcon = ({ type }: { type: string }) => {
    switch (type) {
      case "linkedin":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
          </svg>
        );
      case "twitter":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Meet The Team</h2>
          <p className="text-gray-600">
            Our experts are ready to help you succeed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className="p-4">
                <div className="w-full aspect-square bg-gray-200 mb-4 rounded-lg overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-auto object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-center">
                  {member.name.toUpperCase()}
                </h3>
                <p className="text-gray-600 text-center mb-4">{member.title}</p>

                {/* <p className="text-gray-500 text-center text-sm mb-6">{member.bio}</p> */}

                <div className="flex justify-center space-x-4">
                  {member.socials.map((social, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className={`transition-transform duration-300 ${
                        isHovered === index ? "scale-110" : ""
                      }`}
                    >
                      <SocialIcon type={social} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-gray-100 py-3 px-4 mt-2">
                <a
                  href="#"
                  className="flex items-center justify-center text-blue-500 hover:text-blue-700 transition-colors"
                >
                  <span className="mr-2">Visit profile</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
