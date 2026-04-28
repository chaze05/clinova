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

import { getClinic } from "@/lib/auth";
import api, { publicApi } from "@/lib/api";
import axios from "axios";
import { getClinicTheme } from "@/lib/theme";
import { templates } from "@/lib/template";

export default async function ClinicPage({ params }: any) {
  const {slug} = await params;


  const res = await publicApi.get(`/api/public/${slug}`);
  const clinic = res.data;

  if (!clinic) return notFound();

  const theme = getClinicTheme(clinic.theme);
  const Template = templates[clinic.layout_template || "modern"];

  return (
    <Template clinic={clinic} theme={theme} />
  );
}