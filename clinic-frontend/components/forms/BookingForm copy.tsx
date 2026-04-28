import api from "@/lib/api";
import { bookingSchema } from "@/validations/clinic";
import flatpickr from "flatpickr";
import { use, useEffect, useRef, useState } from "react";
import "flatpickr/dist/flatpickr.css"; 
import TimeDropdown from "./TimeSlots";

export default function BookingForm({clinicData,theme,onClose}:{clinicData:any,theme:any,onClose?: () => void}) {
    const [loading,setLoading] = useState<boolean>(false);
    const [patientName,setPatientName] = useState<string>('');
    const [date,setDate] =  useState<string>('');
    const [email,setEmail] = useState<string>('');
    const [mobile,setMobile] = useState<string>('');
    const [time,setTime] = useState<string>('');
    const [service,setService] = useState<string>('');
    const dateRef = useRef<HTMLInputElement | null>(null);
    const [error, setError] = useState<Record<string, string>>({});
    const {services} = clinicData;

    useEffect(() => {
        if (dateRef.current) {
        flatpickr(dateRef.current, {
            minDate: new Date().fp_incr(1),
            disable: [
                function(date) {
                    return date.getDay() === 0; // 0 = Sunday
                }
            ],
        onChange: function(selectedDates, dateStr, instance) {
            setDate(dateStr); // 👉 "2026-04-24 09:30"
        }
        });
        }
    }, []);

    const handleSubmit = async (e: (any)) => {        
        e.preventDefault();
        setLoading(true);
        const {id} = clinicData.clinic
        const {doctor_id} = clinicData.doctor
        try {
            const payload = {
                clinic_id: id,
                doctor_id:doctor_id,
                patientName: patientName,
                patientEmail:email,
                patientMobile:mobile,
                date:date,
                time:time,
                service:service
            };

            const result = bookingSchema.safeParse(payload);

            if (!result.success) {
                const fieldErrors = result.error.flatten().fieldErrors;

                const formattedErrors: Record<string, string> = {};

                Object.entries(fieldErrors).forEach(([key, value]) => {
                    if (value && value.length > 0) {
                    formattedErrors[key] = value[0]; // take first error only
                    }
                });
                setError(formattedErrors);
                console.log(result.error.format());
                return;
            }
            const res = await api.post("/api/public/book", payload);

            console.log('console',res.data);

            onClose?.(); // close modal
            // optionally refresh list (SWR / router refresh)

        }catch (err) {
            console.error(err);
        }finally {
            setLoading(false);
        }
    };

    const handleChange = (time:string) => {
        setTime(time);
    }
    
    return (
        <div className="p-3 bg-white rounded-2xl w-full max-w-full text-black">
            <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Date */}
                <div className="flex gap-5 justtify-between">
                    <div className="w-full">
                        <p className="text-left">Date</p>
                        <input
                        ref={dateRef}
                        placeholder="Select Date"
                        onChange={(e)=>(setDate(e.target.value))}
                        className={`w-full border p-2 h-[45px] rounded ${error?.date ? 'border-red-300': ''}`}
                        />
                        {error?.date && ( <p className="text-xs text-red-500 m-0 text-left">{error.date}</p> )}
                    </div>
                    <div className="w-full">
                                        {/* Time */}
                        <p className="text-left">Time</p>
                        <TimeDropdown onChange={handleChange} classes={error.time ? 'border-red-300' : ''}/>
                        {error?.time && ( <p className="text-xs text-red-500 m-0 text-left">{error.time }</p> )}
                    </div>
                </div>




                {/* Name */}
                <div>
                    <p className="text-left">Full Name</p>
                    <input
                    type="text"
                    onChange={(e)=>(setPatientName(e.target.value))}
                    placeholder="Patient Name"
                    className={`w-full border p-2 rounded ${error?.patientName ? 'border-red-300': ''}`}
                    />
                    {error?.patientName && ( <p className="text-xs text-red-500 m-0 text-left">{error.patientName}</p> )}
                </div>

                {/* Email */}
                <div>
                    <p className="text-left">Email</p>
                    <input
                    type="text"
                    onChange={(e)=>(setEmail(e.target.value))}
                    placeholder="Patient Email"
                    className={`w-full border p-2 rounded ${error?.patientEmail ? 'border-red-300': ''}`}
                    />
                    {error?.patientEmail && ( <p className="text-xs text-red-500 m-0 text-left">{error.patientEmail}</p> )}
                </div>

                {/* Mobile */}
                <div>
                    <p className="text-left">Mobile Number</p>
                    <input
                    type="tel"
                    onChange={(e)=>(setMobile(e.target.value))}
                    placeholder="Mobile Number"
                    className={`w-full border p-2 rounded ${error?.patientMobile ? 'border-red-300': ''}`}
                    />
                    {error?.patientMobile && ( <p className="text-xs text-red-500 m-0 text-left">{error.patientMobile}</p> )}
                </div>

                {/* Services */}
                <div>
                    <p className="text-left">Service</p>
                    <select className={`w-full border p-2 rounded ${error?.service ? 'border-red-300': ''}`} defaultValue={''} onChange={(e)=>(setService(e.target.value))}>
                        <option hidden value ="">Select Service</option>
                        {services.map((service:any) => {
                            return (
                                <option key={service.id} value={service.id}>{service.name} -  {service.price}</option>
                            );
                        })}
                    </select>
                    {error?.service && ( <p className="text-xs text-red-500 m-0 text-left">{error.service}</p> )}
                </div>


                <button className={`w-full bg-green-600 text-white py-3 mt-2 rounded-sm ${theme.primary}`}>
                    {loading ? 'Booking' : 'Submit Request'}
                </button>
            </form>
        </div>
    )
}
