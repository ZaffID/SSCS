import { Component, createSignal } from 'solid-js';
import { A } from '@solidjs/router';

const AuthRegister: Component = () => {
  const [showPwd, setShowPwd] = createSignal(false);
  const [company] = createSignal('PT Pertamina');
  const onSubmit = (e: Event) => {
    e.preventDefault();
    // company is locked to PT Pertamina
    alert(`Register submitted (mock) for company: ${company()}`);
  };

  return (
    <div class="min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-red-50 via-white to-red-50">
      <section class="flex items-center justify-center p-6">
        <div class="w-full max-w-md bg-white/95 backdrop-blur shadow-xl rounded-2xl p-6 md:p-7">
          <div class="text-[10px] tracking-widest uppercase text-slate-500 mb-2">Pertamina · Smart SPBU</div>
          <h1 class="text-3xl font-bold tracking-tight text-slate-900 leading-tight mb-2">Buat Akun</h1>
          <p class="text-slate-500 mb-5">Daftar untuk mulai menggunakan dashboard SPBU.</p>

          <form class="space-y-4" onSubmit={onSubmit}>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Company</label>
              <div class="relative">
                <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🏢</span>
                <select
                  class="peer w-full appearance-none rounded-lg pl-9 pr-9 py-2 bg-slate-50 ring-1 ring-slate-300 text-slate-600 cursor-not-allowed"
                  value={company()}
                  disabled
                >
                  <option value={company()}>{company()}</option>
                </select>
                <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-300">▾</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Nama lengkap</label>
              <input type="text" required class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[--brand-red] transition-colors duration-150" placeholder="Nama lengkap" />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <div class="relative">
                <svg aria-hidden="true" viewBox="0 0 24 24" class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="3"/><path d="M4 20a8 8 0 0 1 16 0"/></svg>
                <input type="email" required class="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[--brand-red] placeholder:text-slate-400 transition-colors duration-150" placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div class="relative">
                <svg aria-hidden="true" viewBox="0 0 24 24" class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"><path fill="currentColor" d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm3 8H9V6a3 3 0 0 1 6 0v3Z"/></svg>
                <input type={showPwd() ? 'text' : 'password'} required class="w-full border border-slate-300 rounded-xl pl-10 pr-10 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[--brand-red] placeholder:text-slate-400 transition-colors duration-150" placeholder="Enter your password" />
                <button type="button" aria-label="toggle password" class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-2 rounded" onClick={() => setShowPwd(!showPwd())}>
                  {showPwd() ? (
                    <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-11-8  .73-1.96 1.92-3.62 3.44-4.82M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 11 8-.46 1.23-1.09 2.35-1.86 3.33M10.58 10.58A3 3 0 0 0 13.42 13.42M3 3l18 18"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" class="w-full text-white rounded-xl py-2.5 shadow-md transition duration-150 ease-out active:translate-y-[1px] active:scale-[0.99] flex items-center justify-center gap-2 bg-gradient-to-r from-[#f37a7f] to-[var(--brand-red)] hover:shadow-lg hover:brightness-105 active:ring-4 active:ring-[--brand-red]/30 active:shadow-[0_0_0_4px_rgba(237,28,36,0.15)]">Register Now →</button>
          </form>

          <p class="mt-4 text-sm text-slate-600">
            Sudah punya akun?{' '}<A href="/login" class="text-[var(--brand-red)] hover:underline">Masuk</A>
          </p>
        </div>
      </section>

      <aside class="hidden md:flex relative items-center justify-center overflow-hidden p-8 bg-gradient-to-br from-red-200/50 via-red-100/30 to-slate-200/40">
        <div class="absolute inset-0 bg-gradient-to-br from-[--brand-red]/15 via-transparent to-red-900/20" />
        <div class="absolute -right-24 -bottom-24 w-[520px] h-[520px] rounded-3xl bg-white/10 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
        <div class="relative z-10 max-w-xl text-slate-900">
          <img src="/src/assets/logo/icon.png" alt="Pertamina" class="h-10 mb-6 drop-shadow" />
          <div class="mb-6">
            <div class="text-xl md:text-2xl font-extrabold tracking-[0.18em] uppercase text-slate-900/95 drop-shadow-sm">BERGABUNG DENGAN</div>
            <div class="text-5xl md:text-6xl font-black leading-[1.08] tracking-tight">
              <span class="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(2,6,23,0.15)]">PERTA</span>
              <span class="bg-gradient-to-r from-[#ff1f3d] via-[#ff4d4d] to-[#ff1f3d] bg-clip-text text-transparent drop-shadow-[0_6px_20px_rgba(255,31,61,0.35)]">MINA</span>
            </div>
            <div class="mt-2 h-1 w-32 rounded-full bg-gradient-to-r from-[#ff1f3d] via-[#ff4d4d] to-transparent" />
          </div>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-800">
            <li class="flex items-center gap-2"><span class="size-2.5 rounded-full bg-[--brand-red]"></span> Akses global kapan saja</li>
            <li class="flex items-center gap-2"><span class="size-2.5 rounded-full bg-[--brand-red]"></span> Setup cepat</li>
            <li class="flex items-center gap-2"><span class="size-2.5 rounded-full bg-[--brand-red]"></span> Enkripsi & keamanan</li>
            <li class="flex items-center gap-2"><span class="size-2.5 rounded-full bg-[--brand-red]"></span> Dukungan teknis</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default AuthRegister;
