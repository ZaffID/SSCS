import type { Component } from 'solid-js';

const Profile: Component = () => {
  return (
    <div class="p-4 md:p-6 space-y-4">
      <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-full text-white flex items-center justify-center text-xl font-semibold" style={{ background: 'linear-gradient(135deg, #FACC15, #FFC107)' }}>N</div>
          <div>
            <h1 class="text-xl font-semibold tracking-tight">My Profile</h1>
            <p class="text-slate-500 text-sm">Manage your account information</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
          <h2 class="font-semibold mb-3">Basic Information</h2>
          <form class="space-y-3" onSubmit={(e) => { e.preventDefault(); }}>
            <div>
              <label class="block text-sm mb-1">Name</label>
              <input class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]" value="User Name" />
            </div>
            <div>
              <label class="block text-sm mb-1">Email</label>
              <input type="email" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]" value="user@example.com" />
            </div>
            <div class="pt-2">
              <button class="px-3 py-2 text-sm rounded-lg bg-[var(--brand-blue)] text-white hover:brightness-95">Save</button>
            </div>
          </form>
        </div>
        <div class="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
          <h2 class="font-semibold mb-3">Security</h2>
          <form class="space-y-3" onSubmit={(e) => { e.preventDefault(); }}>
            <div>
              <label class="block text-sm mb-1">New Password</label>
              <input type="password" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]" />
            </div>
            <div>
              <label class="block text-sm mb-1">Confirm Password</label>
              <input type="password" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]" />
            </div>
            <div class="pt-2">
              <button class="px-3 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-50">Change Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
