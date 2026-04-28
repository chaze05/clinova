export const clinicThemes = {
  green: {
    primary: "from-green-600 to-emerald-500",
    button: "bg-green-600 hover:bg-green-700",
    accent: "text-green-600",
  },

  blue: {
    primary: "from-blue-600 to-sky-500",
    button: "bg-blue-600 hover:bg-blue-700",
    accent: "text-blue-600",
  },

  purple: {
    primary: "from-purple-700 to-violet-600",
    button: "bg-purple-600 hover:bg-purple-700",
    accent: "text-purple-400",
  },
} as const;

// ✅ Strict type derived from keys
export type ClinicThemeKey = keyof typeof clinicThemes;

// Optional: type your clinic object (recommended)
export type Clinic = {
  theme?: ClinicThemeKey;
};

// ✅ Safe theme resolver
export function getClinicTheme(clinic?: Clinic) {
  const themeKey: ClinicThemeKey = clinic?.theme ?? "green";
  return clinicThemes[themeKey];
}

// ✅ usage example
// const theme = getClinicTheme(clinic);