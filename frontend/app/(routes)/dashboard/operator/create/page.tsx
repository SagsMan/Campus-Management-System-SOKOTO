"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "@/app/services/api";
import { toast } from "sonner";

const CAMPUS_OFFICES = [
  "Registry",
  "Bursary",
  "Faculty Office",
  "Departmental Office",
  "Student Affairs",
] as const;

export default function CreateQueuePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", location: "", capacity: 50 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await apiService.post("/queues", formData, true); // true = include auth
      if (res.success) {
        toast.success("Queue created successfully.");
        router.push("/dashboard/operator/queues");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create queue";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl animate-in fade-in zoom-in">
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">
           Create Campus Office Queue
        </h1>
         <p className="mb-6 text-sm leading-6 text-slate-600">
           Choose a common Sokoto campus office or enter another student or
           visitor service.
         </p>
        {error && (
          <p className="text-red-500 mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Queue Name
            </label>
            <select
              required
              className="mt-1 block w-full rounded-lg border border-slate-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            >
              <option value="" disabled>
                Select a campus office
              </option>
              {CAMPUS_OFFICES.map((office) => (
                <option key={office} value={office}>
                  {office}
                </option>
              ))}
              <option value="Other Student Service">Other student service</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Location
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
               placeholder="e.g., Main campus, Block A"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Capacity
            </label>
            <input
              type="number"
              min={1}
              className="mt-1 block w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              placeholder="Maximum tokens allowed"
              value={formData.capacity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  capacity: Number(e.target.value),
                })
              }
            />
            <p className="text-xs text-slate-500 mt-1">
              Queue will stop accepting joins when waiting tokens reach this number.
            </p>
           <p className="mt-3 rounded-lg bg-sky-50 p-3 text-xs leading-5 text-sky-800">
             Staff can register a student or visitor who has limited data
             access. Keep the record to the minimum needed to call the token.
           </p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Queue"}
          </button>
        </form>
      </div>
    </div>
  );
}
