export default function About() {
  const stats = [
    { number: "5000+", label: "Happy Members" },
    { number: "15+", label: "Years Experience" },
    { number: "50+", label: "Certified Trainers" },
    { number: "24/7", label: "Gym Access" }
  ];

  const features = [
    {
      icon: "💪",
      title: "Expert Trainers",
      description: "Certified personal trainers with years of experience to guide you on your fitness journey."
    },
    {
      icon: "🥗",
      title: "Nutrition Guidance",
      description: "Personalized meal plans and nutrition counseling to complement your workout routine."
    },
    {
      icon: "🏋️",
      title: "Modern Equipment",
      description: "State-of-the-art fitness equipment and facilities to support all your training needs."
    },
    {
      icon: "📱",
      title: "Mobile App",
      description: "Track your workouts, monitor progress, and access exclusive content through our mobile app."
    },
    {
      icon: "👥",
      title: "Community Support",
      description: "Join a supportive community of like-minded individuals working towards their fitness goals."
    },
    {
      icon: "🎯",
      title: "Goal Tracking",
      description: "Set, track, and achieve your fitness goals with our comprehensive progress monitoring system."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-poppins">
            About FitLife Gym
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're more than just a gym - we're your partner in achieving a healthier, stronger, and more confident you.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-red-600 mb-2 font-poppins">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 font-poppins">Our Mission</h3>
          <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
            To empower individuals to transform their lives through fitness, nutrition, and wellness. 
            We believe that everyone deserves access to quality fitness resources and personalized guidance 
            to achieve their health and fitness goals, regardless of their starting point.
          </p>
        </div>
      </div>
    </section>
  );
}
