"use client";

export default function ServicesSlider({ clinic }: any) {
  return (
    <section id="services" className="py-16 px-6">
      
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          Our Services
        </h2>
        <p className="text-gray-500 mt-2">
          Quality healthcare services tailored for you
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6">

        {clinic?.services?.map((service: any, i: number) => (
          <div
            key={i}
            className="bg-white border rounded-2xl p-6 text-center hover:shadow-md transition"
          >

            {/* Icon */}
            <div className="w-14 h-14 mx-auto bg-green-100 text-green-600 flex items-center justify-center rounded-full text-xl">
              🏥
            </div>

            {/* Name */}
            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              {service?.service?.name || "General Checkup"}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-500 mt-2">
              {service?.service?.description ||
                "Basic consultation and health assessment for patients."}
            </p>

          </div>
        ))}

      </div>
    </section>
  );
}