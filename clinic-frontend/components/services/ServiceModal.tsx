"use client";

import { useState } from "react";

export default function ServiceModal({
    service,
    mode = "edit",
    onClose,
    onSave,
}: {
    service?: any;
    mode?: "edit" | "request";
    onClose: () => void;
    onSave: (data: any) => void;
}) {
    const [form, setForm] = useState({
        name: service?.name ?? "",
        price: service?.price ?? service?.default_price ?? "",
        duration: service?.duration ?? service?.default_duration ?? "",
        description: service?.description ?? "",
    });

    const isRequest = mode === "request";

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* backdrop */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* modal */}
            <div className="relative bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
                
                <h2 className="text-lg font-semibold mb-4">
                    {isRequest ? "Request New Service" : "Edit Service"}
                </h2>

                <div className="space-y-3">

                    {/* Name (only for request mode) */}
                    {isRequest && (
                        <div>
                            <label className="text-sm">Service Name</label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                                className="w-full border rounded-lg px-3 py-2 mt-1"
                            />
                        </div>
                    )}

                    {/* Price */}
                    <div>
                        <label className="text-sm">Price</label>
                        <input
                            type="number"
                            value={form.price}
                            onChange={(e) =>
                                setForm({ ...form, price: e.target.value })
                            }
                            className="w-full border rounded-lg px-3 py-2 mt-1"
                        />
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="text-sm">Duration (mins)</label>
                        <input
                            type="number"
                            value={form.duration}
                            onChange={(e) =>
                                setForm({ ...form, duration: e.target.value })
                            }
                            className="w-full border rounded-lg px-3 py-2 mt-1"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm">Description</label>
                        <textarea
                            value={form.description}
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                            className="w-full border rounded-lg px-3 py-2 mt-1"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 mt-5">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-100 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => onSave(form)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                        {isRequest ? "Submit Request" : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}