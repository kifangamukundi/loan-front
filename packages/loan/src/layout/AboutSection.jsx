const AboutSection = ({ missionTitle, missionDescription, sections }) => {
  return (
    <section className="bg-white py-16 px-6">
      <div className="container mx-auto text-center px-4 md:px-0">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          {missionTitle}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-8 text-lg text-left">
          {missionDescription}
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8">
          {sections.map((section, index) => (
            <div key={index} className="md:w-1/3 mb-8 md:mb-0">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {section.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg text-left">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;