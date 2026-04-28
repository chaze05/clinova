// import { notFound } from "next/navigation";
// import api from "@/lib/api";
// export default async function Page({ params }: { params: { slug: string } }) {
//   const { slug } = params;

//   // const res = await api.get(`api/clinic/${slug}`, {
//   //   cache: "no-store",
//   // });

//   // if (!res.ok) return notFound();

//   // const clinic = await res.json();

//   return (
//     <div>
//       <h1>test</h1>
//       <p>Slug: {slug}</p>
//     </div>
//   );
// }
import { notFound } from "next/navigation";
import { getClinicTheme } from "@/lib/theme";
import { templates } from "@/lib/template";

export default async function ClinicPage({ params }: any) {
  const { slug } = params;

  const res = await fetch(
    `https://clinova.onrender.com/api/public/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return notFound();

  const clinic = await res.json();

  if (!clinic) return notFound();

  const theme = getClinicTheme(clinic.theme);
  const Template = templates[clinic.layout_template || "modern"];

  return <Template clinic={clinic} theme={theme} />;
}