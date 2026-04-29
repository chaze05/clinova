import { Share2, AtSign, X } from "lucide-react";

export default function MapSection({ clinic,theme }: any) {
  // fallback dummy data
  const data = {
    address: clinic?.clinic_details.address || "123 Medical Street, Quezon City, Philippines",
    phone: clinic?.clinic_details.contact_phone || "+63 900 000 0000",
    email: clinic?.clinic_details.contact_email || "clinic@example.com",
    map:
      clinic?.map_embed_url ||
      "https://www.google.com/maps?q=Quezon+City&output=embed",
    fb:clinic?.clinic_details.facebook_url,
    insta:clinic?.clinic_details.instagram_url,
    x:clinic?.clinic_details.twittter_url,

  };

  return (
    <section id="map" className="py-16 px-6 bg-white">

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Find Us</h2>
        <p className="text-gray-500 mt-2">
          Visit our clinic or get in touch anytime
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">

        {/* MAP */}
        <div className="rounded-2xl overflow-hidden shadow-sm border bg-white">
          <iframe
            src={data.map}
            className="w-full h-[320px] md:h-full min-h-[320px]"
            loading="lazy"
          />
        </div>

        {/* INFO CARD */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col justify-center">

          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Clinic Information
          </h3>

          <div className="space-y-4 text-gray-600 text-sm">

            <div>
              <p className="text-gray-400 text-xs uppercase">Address</p>
              <p className="mt-1">{data.address}</p>
            </div>

            <div>
              <p className="text-gray-400 text-xs uppercase">Phone</p>
              <p className="mt-1">{data.phone}</p>
            </div>

            <div>
              <p className="text-gray-400 text-xs uppercase">Email</p>
              <p className="mt-1">{data.email} asd</p>
            </div>

            <div className="flex gap-4">
              <a href={`${data?.fb}`}><Share2 color="#E4405F" size={24} /></a>
              <a href={`${data?.insta}`}><X color="#1DA1F2" size={24} /></a>
              <a href={`${data?.x}`}><AtSign color="#1877F2" size={24} /></a>
            </div>
          </div>

          {/* CTA feel (optional but subtle) */}
          <div className="mt-6">
            <button className={`text-sm ${theme.button} text-white px-4 py-2 rounded-lg transition`}>
              Get Directions
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}