import type { Component } from 'solid-js';

const Users: Component = () => {
  return (
    <div class="p-6">
      <div class="mb-4">
        <h1 class="text-2xl font-semibold tracking-tight">Users</h1>
        <p class="text-slate-500 text-sm">Manage application users and roles</p>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div class="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <div class="text-sm text-slate-600">User list</div>
          <button class="px-3 py-1.5 text-sm rounded-lg bg-[var(--brand-blue)] text-white">Add User</button>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-slate-50 text-slate-600">
              <tr>
                <th class="text-left px-4 py-2">Name</th>
                <th class="text-left px-4 py-2">Email</th>
                <th class="text-left px-4 py-2">Role</th>
                <th class="text-left px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-t">
                <td class="px-4 py-2">Naufal</td>
                <td class="px-4 py-2">naufal@example.com</td>
                <td class="px-4 py-2">Admin</td>
                <td class="px-4 py-2">
                  <span class="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">Active</span>
                </td>
              </tr>
              <tr class="border-t">
                <td class="px-4 py-2">Siti</td>
                <td class="px-4 py-2">siti@example.com</td>
                <td class="px-4 py-2">Operator</td>
                <td class="px-4 py-2">
                  <span class="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">Pending</span>
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
