const InfographicSection = ({ title, backgroundImage, items }) => {
  return (
    <section
      className="py-16 px-6 bg-cover"
      style={{ backgroundImage: `url("${backgroundImage}")` }}
    >
      <div className="container mx-auto px-4 md:px-0">
        <div className="bg-opacity-90 p-8 md:p-12 rounded-lg shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            {title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 bg-opacity-50 p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                  {item.heading}
                </h3>
                <p className="text-gray-900 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfographicSection;