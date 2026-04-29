export default function Footer({ clinic }: any) {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h3 className="text-white text-lg font-semibold">
            {clinic?.clinic?.name || "Clinova Clinic"}
          </h3>

          <p className="text-sm text-gray-400 mt-3">
            {clinic?.clinic_details.description || "Modern healthcare made simple. Book appointments, meet doctors,and get care faster."}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-medium mb-3">Quick Links</h4>

          <ul className="space-y-2 text-sm">
            <li>Services</li>
            <li>Doctors</li>
            <li>Map</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-medium mb-3">Contact</h4>

          <ul className="space-y-2 text-sm">
            <li>{clinic?.clinic_details.address || "Quezon City, Philippines"}</li>
            <li>{clinic?.clinic_details.contact_phone || "+63 900 000 0000"}</li>
            <li>{clinic?.clinic_details.contact_email || "clinic@example.com"}</li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} {clinic?.clinic?.name || "Clinova"}. All rights reserved. 
        <a href="/">Clinova</a>
      </div>

    </footer>
  );
}