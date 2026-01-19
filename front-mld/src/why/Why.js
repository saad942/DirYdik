import React from 'react';
import { DollarSign, Users, Heart, GraduationCap } from 'lucide-react';

function Why() {
  const missionCards = [
    {
      icon: DollarSign,
      title: "Industry-Leading Wages",
      description: "Our staff are full-time, W2 employees that are the highest-paid housekeepers in Austin, with wages ranging from $19-28 an hour, reflecting our recognition of their hard work and dedication."
    },
    {
      icon: Users,
      title: "Supporting Working Mothers",
      description: "We understand the dual responsibilities of work and family. Our scheduling ensures almost all our staff, many of whom are mothers, can finish their workday by 3 pm for family time."
    },
    {
      icon: Heart,
      title: "Comprehensive Health Benefits",
      description: "We provide full health insurance coverage for our employees and their families, ensuring peace of mind and access to quality healthcare when they need it most."
    },
    {
      icon: GraduationCap,
      title: "Educational Scholarships",
      description: "We invest in our team's future by offering educational scholarships and professional development opportunities to help them achieve their personal and career goals."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Our Mission</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Building a better workplace while delivering exceptional service
          </p>
        </div>
      </div>

      {/* Mission Cards */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {missionCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {card.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Family Section */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-800">
                The MoreHands Family
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                As a family business, we take care of each other, our employees, and you.
                And then everyone gets to go home, happy.
              </p>
              <div className="pt-4">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
                  Learn More About Us
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-video rounded-2xl shadow-2xl overflow-hidden">
                <video
                  src="/images/House Cleaning.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  aria-label="House Cleaning Video"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-5xl font-bold text-blue-600 mb-2">$19-28</div>
              <div className="text-gray-600 font-medium">Hourly Wage Range</div>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-blue-600 mb-2">3 PM</div>
              <div className="text-gray-600 font-medium">Family Time Starts</div>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Health Coverage</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Why;