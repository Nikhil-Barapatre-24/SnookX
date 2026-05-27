import type { Metadata } from "next";

export const metadata: Metadata = { title: "Settings — SnookX Management" };

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">

      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-100">Settings</h2>
        <p className="text-sm text-slate-500 mt-0.5">Manage your venue and account preferences.</p>
      </div>

      {/* Venue settings */}
      <div className="bg-[#0d1520]/70 border border-[#1e3048] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1e3048]">
          <h3 className="font-semibold text-slate-200">Venue Info</h3>
          <p className="text-xs text-slate-600 mt-0.5">Basic details about your snooker club.</p>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Venue Name
            </label>
            <input
              type="text"
              defaultValue="SnookX Nagpur"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a1018] border border-[#1e3048] text-slate-200 text-sm focus:outline-none focus:border-green-700/50 focus:ring-1 focus:ring-green-700/30 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Address
            </label>
            <textarea
              rows={2}
              defaultValue="Civil Lines, Nagpur, Maharashtra 440001"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a1018] border border-[#1e3048] text-slate-200 text-sm focus:outline-none focus:border-green-700/50 focus:ring-1 focus:ring-green-700/30 transition-all resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                defaultValue="+91 71234 56789"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a1018] border border-[#1e3048] text-slate-200 text-sm focus:outline-none focus:border-green-700/50 focus:ring-1 focus:ring-green-700/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Opening Time
              </label>
              <input
                type="text"
                defaultValue="10:00 AM – 11:00 PM"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a1018] border border-[#1e3048] text-slate-200 text-sm focus:outline-none focus:border-green-700/50 focus:ring-1 focus:ring-green-700/30 transition-all"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-green-700 hover:bg-green-600 text-white transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-[#0d1520]/70 border border-[#1e3048] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1e3048]">
          <h3 className="font-semibold text-slate-200">Security</h3>
          <p className="text-xs text-slate-600 mt-0.5">Update your account password.</p>
        </div>
        <div className="p-5 space-y-4">
          {["Current Password", "New Password", "Confirm New Password"].map((label) => (
            <div key={label}>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                {label}
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a1018] border border-[#1e3048] text-slate-200 text-sm focus:outline-none focus:border-green-700/50 focus:ring-1 focus:ring-green-700/30 transition-all"
              />
            </div>
          ))}
          <div className="flex justify-end pt-2">
            <button className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-green-700 hover:bg-green-600 text-white transition-colors">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-red-950/20 border border-red-900/40 rounded-2xl p-5">
        <h3 className="font-semibold text-red-400 mb-1">Danger Zone</h3>
        <p className="text-xs text-slate-600 mb-4">These actions are irreversible. Proceed with caution.</p>
        <button
          className="px-4 py-2 rounded-xl text-sm font-medium text-red-400 border border-red-800/40 hover:bg-red-900/20 transition-all disabled:opacity-40"
          disabled
        >
          Delete Venue Data
        </button>
      </div>

    </div>
  );
}
