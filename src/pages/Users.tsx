import type { Component } from 'solid-js';

const Users: Component = () => {
  return (
    <div class="p-4 md:p-6 space-y-4">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Users</h1>
        <p class="text-slate-500 text-sm">Manage application users and roles</p>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div class="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <div class="text-sm text-slate-600">User list</div>
          <button class="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-[var(--brand-blue)] text-white hover:brightness-95 active:brightness-90">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add User
          </button>
        </div>
        <div class="relative w-full overflow-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-slate-50 text-slate-600 sticky top-0 z-10">
              <tr>
                <th class="text-left px-4 py-3 border-b font-medium">Name</th>
                <th class="text-left px-4 py-3 border-b font-medium">Email</th>
                <th class="text-left px-4 py-3 border-b font-medium">Role</th>
                <th class="text-left px-4 py-3 border-b font-medium">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr class="hover:bg-slate-50">
                <td class="px-4 py-3">
                  <span class="inline-flex items-center gap-3">
                    <span class="w-8 h-8 rounded-full bg-slate-100 text-slate-700 grid place-items-center text-xs font-semibold">NA</span>
                    <span class="font-medium text-slate-800">Naufal</span>
                  </span>
                </td>
                <td class="px-4 py-3 text-slate-700">naufal@example.com</td>
                <td class="px-4 py-3">
                  <span class="inline-flex items-center px-2 py-1 text-xs rounded-md bg-slate-100 border border-slate-200 text-slate-700">Admin</span>
                </td>
                <td class="px-4 py-3">
                  <span class="inline-flex items-center gap-2 px-2 py-1 rounded-full border text-xs bg-green-50 text-green-700 border-green-200">
                    <span class="w-2.5 h-2.5 rounded-full bg-green-500" /> Active
                  </span>
                </td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-4 py-3">
                  <span class="inline-flex items-center gap-3">
                    <span class="w-8 h-8 rounded-full bg-slate-100 text-slate-700 grid place-items-center text-xs font-semibold">SI</span>
                    <span class="font-medium text-slate-800">Siti</span>
                  </span>
                </td>
                <td class="px-4 py-3 text-slate-700">siti@example.com</td>
                <td class="px-4 py-3">
                  <span class="inline-flex items-center px-2 py-1 text-xs rounded-md bg-slate-100 border border-slate-200 text-slate-700">Operator</span>
                </td>
                <td class="px-4 py-3">
                  <span class="inline-flex items-center gap-2 px-2 py-1 rounded-full border text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                    <span class="w-2.5 h-2.5 rounded-full bg-yellow-500" /> Pending
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
