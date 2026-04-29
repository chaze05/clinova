"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* ---------------- TYPES ---------------- */

type ClinicDetails = {
  name: string;
  description: string;
  address: string;
  contact_email: string;
  contact_phone: string;
  website: string;
  facebook_url: string;
  instagram_url: string;
  x_url: string;
};

type ClinicSettings = {
  allow_online_booking: boolean;
  auto_approve_appointments: boolean; // ✅ FIXED TYPO
  appointment_slot_duration: number;

  max_appointments_per_day: number; // ✅ MOVED HERE

  enable_email_notifications: boolean;
  enable_sms_notifications: boolean;

  require_approval_for_appointments: boolean;
  allow_walk_in: boolean;

  timezone: string;

  theme_color: "blue" | "green" | "purple";
  template: "modern" | "minimal" | "medical";
};

/* ---------------- COMPONENT ---------------- */

export default function GeneralSettings() {
  const [details, setDetails] = useState<ClinicDetails | null>(null);
  const [settings, setSettings] = useState<ClinicSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/api/settings");
      setDetails(res.data[0].clinic_details) ;
      setSettings(res.data[0].clinic_settings);

      setLoading(false);
    };

    fetchData();
  }, []);

  /* ---------------- UPDATE HELPERS ---------------- */

  const updateDetails = (key: keyof ClinicDetails, value: any) => {
    if (!details) return;
    setDetails({ ...details, [key]: value });
  };

  const updateSettings = (key: keyof ClinicSettings, value: any) => {
    if (!settings) return;
    setSettings({ ...settings, [key]: value });
  };

  const saveAll = async () => {
    console.log([details,settings]);
    return;
    await api.put("/api/settings", {
      details,
      settings,
    });

    alert("Settings updated successfully!");
  };
  if (loading) return <p>Loading settings...</p>;
  return (
    <div className="grid gap-6">
        <div className="flex flex-wrap sm:flex-nowrap gap-6">
        {/* 🏥 CLINIC DETAILS */}
            <Card>
                <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-semibold">Clinic Details</h2>

                <div>
                    <Label>Name</Label>
                    <Input
                    value={details?.name || ""}
                    onChange={(e) => updateDetails("name", e.target.value)}
                    />
                </div>

                <div>
                    <Label>Address</Label>
                    <Textarea
                    value={details?.address || ""}
                    onChange={(e) => updateDetails("address", e.target.value)}
                    />
                </div>

                <div>
                    <Label>Description</Label>
                    <Textarea
                    value={details?.description || ""}
                    onChange={(e) => updateDetails("description", e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <Label>Email</Label>
                    <Input
                        value={details?.contact_email || ""}
                        onChange={(e) =>
                        updateDetails("contact_email", e.target.value)
                        }
                    />
                    </div>
                    <div>
                    <Label>Phone</Label>
                    <Input
                        value={details?.contact_phone || ""}
                        onChange={(e) =>
                        updateDetails("contact_phone", e.target.value)
                        }
                    />
                    </div>
                </div>

                <div>
                    <Label>Facebook</Label>
                    <Input
                    value={details?.facebook_url || ""}
                    onChange={(e) =>
                        updateDetails("facebook_url", e.target.value)
                    }
                    />
                </div>

                <div>
                    <Label>Instagram</Label>
                    <Input
                    value={details?.instagram_url || ""}
                    onChange={(e) =>
                        updateDetails("instagram_url", e.target.value)
                    }
                    />
                </div>

                <div>
                    <Label>X (Twitter)</Label>
                    <Input
                    value={details?.x_url || ""}
                    onChange={(e) => updateDetails("x_url", e.target.value)}
                    />
                </div>
                </CardContent>
            </Card>

            {/* ⚙️ SYSTEM SETTINGS */}
            <Card>
                <CardContent className="p-6 space-y-5">
                <h2 className="text-lg font-semibold">Clinic Settings</h2>

                {/* Theme */}
                <div>
                    <Label>Theme Color</Label>
                    <select
                    className="w-full border rounded p-2"
                    value={settings?.theme_color}
                    onChange={(e) =>
                        updateSettings("theme_color", e.target.value)
                    }
                    >
                    <option value="blue">Blue (Default)</option>
                    <option value="green">Green</option>
                    <option value="purple">Purple</option>
                    </select>
                </div>

                {/* Template */}
                <div>
                    <Label>Template SOON!</Label>
                    <select
                    disabled={true}
                    className="w-full border rounded p-2"
                    value={settings?.template}
                    onChange={(e) =>
                        updateSettings("template", e.target.value)
                    }
                    >
                    <option value="modern">Modern</option>
                    <option value="minimal">Minimal</option>
                    <option value="medical">Medical</option>
                    </select>
                </div>

                {/* 📅 LIMIT PER DAY (FIXED LOCATION) */}
                <div>
                    <Label>Maximum Appointments Per Day</Label>
                    <Input
                    type="number"
                    value={settings?.max_appointments_per_day || 10}
                    onChange={(e) =>
                        updateSettings(
                        "max_appointments_per_day",
                        Number(e.target.value)
                        )
                    }
                    />
                </div>

                {/* Toggles */}
                <div className="flex items-center justify-between">
                    <Label>Online Booking</Label>
                    <Switch
                    checked={settings?.allow_online_booking}
                    onCheckedChange={(val) =>
                        updateSettings("allow_online_booking", val)
                    }
                    />
                </div>

                <div className="flex items-center justify-between">
                    <Label>Auto Approve Appointments</Label>
                    <Switch
                    checked={settings?.auto_approve_appointments}
                    onCheckedChange={(val) =>
                        updateSettings("auto_approve_appointments", val)
                    }
                    />
                </div>

                <div className="flex items-center justify-between">
                    <Label>Email Notifications</Label>
                    <Switch
                    checked={settings?.enable_email_notifications}
                    onCheckedChange={(val) =>
                        updateSettings("enable_email_notifications", val)
                    }
                    />
                </div>

                <div className="flex items-center justify-between">
                    <Label>SMS Notifications</Label>
                    <span className="text-xs text-gray-400 ml-2">SOON</span>
                    <Switch
                    disabled
                    checked={settings?.enable_sms_notifications}
                    onCheckedChange={(val) =>
                        updateSettings("enable_sms_notifications", val)
                    }
                    />
                </div>
                </CardContent>
            </Card>
        </div>
      {/* 💾 SAVE */}
      <Button onClick={saveAll} className="w-full sm:w-1/2 py-5 cursor-pointer">
        Save Settings   
      </Button>
    </div>
  );
}