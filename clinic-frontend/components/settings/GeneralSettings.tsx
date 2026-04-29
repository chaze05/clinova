"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";

export default function GeneralSettings() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    description: "",
    address: "",
    contact_email: "",
    contact_phone: "",
    logo: "",

    primary_color: "#16a34a",
    secondary_color: "#0f172a",
    theme: "green",
    template_key: "modern",

    booking_enabled: true,
    auto_confirm_appointments: false,
    max_appointments_per_slot: 1,
    buffer_minutes: 10,

    email_notifications: true,
    sms_notifications: false,

    notify_patient_on_booking: true,
    notify_clinic_on_booking: true,
    notify_before_appointment: true,
    reminder_hours_before: 24,

    allow_walk_ins: true,
    require_patient_approval: false,
    same_day_booking: true,
  });

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/settings");
        setForm(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.post("/settings", form);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Branding */}
      <Card className="rounded-2xl shadow">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Branding</h2>

          <Textarea
            placeholder="Clinic Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <Input
            placeholder="Address"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />

          <Input
            placeholder="Email"
            value={form.contact_email}
            onChange={(e) => handleChange("contact_email", e.target.value)}
          />

          <Input
            placeholder="Phone"
            value={form.contact_phone}
            onChange={(e) => handleChange("contact_phone", e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Primary Color</Label>
              <Input
                type="color"
                value={form.primary_color}
                onChange={(e) => handleChange("primary_color", e.target.value)}
              />
            </div>

            <div>
              <Label>Secondary Color</Label>
              <Input
                type="color"
                value={form.secondary_color}
                onChange={(e) => handleChange("secondary_color", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking */}
      <Card className="rounded-2xl shadow">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Booking Settings</h2>

          <div className="flex justify-between">
            <Label>Enable Booking</Label>
            <Switch
              checked={form.booking_enabled}
              onCheckedChange={(v) => handleChange("booking_enabled", v)}
            />
          </div>

          <div className="flex justify-between">
            <Label>Auto Confirm</Label>
            <Switch
              checked={form.auto_confirm_appointments}
              onCheckedChange={(v) =>
                handleChange("auto_confirm_appointments", v)
              }
            />
          </div>

          <Input
            type="number"
            placeholder="Max per slot"
            value={form.max_appointments_per_slot}
            onChange={(e) =>
              handleChange("max_appointments_per_slot", Number(e.target.value))
            }
          />

          <Input
            type="number"
            placeholder="Buffer Minutes"
            value={form.buffer_minutes}
            onChange={(e) =>
              handleChange("buffer_minutes", Number(e.target.value))
            }
          />
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="rounded-2xl shadow">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Notifications</h2>

          <div className="flex justify-between">
            <Label>Email Notifications</Label>
            <Switch
              checked={form.email_notifications}
              onCheckedChange={(v) => handleChange("email_notifications", v)}
            />
          </div>

          <div className="flex justify-between">
            <Label>SMS Notifications</Label>
            <Switch
              checked={form.sms_notifications}
              onCheckedChange={(v) => handleChange("sms_notifications", v)}
            />
          </div>

          <div className="flex justify-between">
            <Label>Notify Patient</Label>
            <Switch
              checked={form.notify_patient_on_booking}
              onCheckedChange={(v) =>
                handleChange("notify_patient_on_booking", v)
              }
            />
          </div>

          <div className="flex justify-between">
            <Label>Notify Clinic</Label>
            <Switch
              checked={form.notify_clinic_on_booking}
              onCheckedChange={(v) =>
                handleChange("notify_clinic_on_booking", v)
              }
            />
          </div>

          <div className="flex justify-between">
            <Label>Reminder Before Appointment</Label>
            <Switch
              checked={form.notify_before_appointment}
              onCheckedChange={(v) =>
                handleChange("notify_before_appointment", v)
              }
            />
          </div>

          <Input
            type="number"
            placeholder="Reminder Hours Before"
            value={form.reminder_hours_before}
            onChange={(e) =>
              handleChange("reminder_hours_before", Number(e.target.value))
            }
          />
        </CardContent>
      </Card>

      {/* Behavior */}
      <Card className="rounded-2xl shadow">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Clinic Behavior</h2>

          <div className="flex justify-between">
            <Label>Allow Walk-ins</Label>
            <Switch
              checked={form.allow_walk_ins}
              onCheckedChange={(v) => handleChange("allow_walk_ins", v)}
            />
          </div>

          <div className="flex justify-between">
            <Label>Require Approval</Label>
            <Switch
              checked={form.require_patient_approval}
              onCheckedChange={(v) =>
                handleChange("require_patient_approval", v)
              }
            />
          </div>

          <div className="flex justify-between">
            <Label>Same Day Booking</Label>
            <Switch
              checked={form.same_day_booking}
              onCheckedChange={(v) => handleChange("same_day_booking", v)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="rounded-xl bg-green-600 hover:bg-green-700"
        >
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
