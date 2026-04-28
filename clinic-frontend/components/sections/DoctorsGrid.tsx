export default function DoctorsGrid({ clinic }: any) {
    const {name,email,image,doctor_id} = clinic.doctor;
    console.log('here',{clinic});
    return (
        <section id="doctors" className="py-10 px-6 bg-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 text-center">
                Doctor
            </h2>
            <div className="w-full flex justify-center py-5">
            <div className="w-full max-w-5xl px-4">

                {/* SECTION CONTAINER (NOT CARD) */}
                <div className="flex flex-col md:flex-row min-h-[300px]">

                {/* LEFT: IMAGE 50% */}
                <div className="md:w-1/2 w-full bg-gray-100 flex items-center justify-center overflow-hidden rounded-l-2xl">
                    {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                    ) : (
                    <div className="h-60 md:h-full w-full flex items-center justify-center text-gray-500">
                        No Image
                    </div>
                    )}
                </div>

                {/* RIGHT: CONTENT 50% */}
                <div className="md:w-1/2 w-full flex flex-col items-start justify-start p-8 bg-white rounded-r-2xl">

                    <h2 className="text-2xl font-bold text-gray-800">
                    {name ? name : 'Dr. John Doe' }
                    </h2>

                    <p className="text-gray-500 mt-1">
                    {email ? email : 'john.doe@email.com' }
                    </p>

                    <p className="text-sm text-gray-400 mt-2">
                    General Specialist
                    </p>

                    <p className="text-gray-600 mt-4 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>

                    {/* Dummy stats / info */}
                    <div className="mt-6 flex gap-3 flex-wrap mt-auto">
                    <span className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full">
                        Available Today
                    </span>
                    <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                        12 Years Experience
                    </span>
                    <span className="text-xs px-3 py-1 bg-purple-100 text-purple-600 rounded-full">
                        4.9 Rating
                    </span>
                    </div>

                </div>
                </div>
            </div>
            </div>
        </section>
    );
}