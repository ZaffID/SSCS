import { Component } from 'solid-js';
import { A } from '@solidjs/router';

const AuthForgotPassword: Component = () => {
  const onSubmit = (e: Event) => {
    e.preventDefault();
    // TODO: integrate API forgot password
    alert('Password reset link sent (mock)');
  };

  return (
    <div class="min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-red-50 via-white to-red-50">
      <section class="flex items-center justify-center p-6">
        <div class="w-full max-w-md bg-white/95 backdrop-blur shadow-xl rounded-2xl p-6 md:p-7">
          <div class="text-xs font-medium text-[--brand-red] mb-2">Pertamina · Smart SPBU Operations Center</div>
          <h1 class="text-2xl font-semibold text-slate-900 mb-1">Lupa Password</h1>
          <p class="text-slate-600 mb-6">Masukkan email terdaftar Anda. Kami akan mengirimkan tautan untuk mengatur ulang password.</p>

          <form class="space-y-4" onSubmit={onSubmit}>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" required class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[--brand-red] transition-colors duration-150" placeholder="you@example.com" />
            </div>

            <button type="submit" class="w-full text-white rounded-xl py-2.5 shadow-md transition duration-150 ease-out active:translate-y-[1px] active:scale-[0.99] flex items-center justify-center gap-2 bg-gradient-to-r from-[#f37a7f] to-[var(--brand-red)] hover:shadow-lg hover:brightness-105 active:ring-4 active:ring-[--brand-red]/30 active:shadow-[0_0_0_4px_rgba(237,28,36,0.15)]">
              Kirim tautan reset
            </button>
          </form>

          <p class="mt-4 text-sm text-slate-600">
            <A href="/login" class="text-[var(--brand-red)] hover:underline">Kembali ke login</A>
          </p>
        </div>
      </section>

      <aside class="hidden md:flex relative items-center justify-center overflow-hidden p-8 bg-gradient-to-br from-red-200/50 via-red-100/30 to-slate-200/40">
        <div class="absolute inset-0 bg-gradient-to-br from-[--brand-red]/15 via-transparent to-red-900/20" />
        <div class="absolute -right-24 -bottom-24 w-[520px] h-[520px] rounded-3xl bg-white/10 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
        <div class="relative z-10 max-w-xl text-slate-900">
          <img src="/src/assets/logo/icon.png" alt="Pertamina" class="h-10 mb-6 drop-shadow" />
          <div class="mb-6">
            <div class="text-3xl font-extrabold tracking-wide text-slate-900">BANTUAN AKSES</div>
            <div class="text-4xl font-extrabold"><span class="text-slate-900">PERTA</span><span class="text-[--brand-red]">MINA</span></div>
          </div>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-800">
            <li class="flex items-center gap-2"><span class="size-2.5 rounded-full bg-[--brand-red]"></span> Proses aman & cepat</li>
            <li class="flex items-center gap-2"><span class="size-2.5 rounded-full bg-[--brand-red]"></span> Tautan via email</li>
            <li class="flex items-center gap-2"><span class="size-2.5 rounded-full bg-[--brand-red]"></span> Dukungan 24/7</li>
            <li class="flex items-center gap-2"><span class="size-2.5 rounded-full bg-[--brand-red]"></span> Privasi terjaga</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default AuthForgotPassword;
