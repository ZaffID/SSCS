import { Component, createSignal, Show } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';

const AuthLogin: Component = () => {
  const [role, setRole] = createSignal<'user' | 'admin'>('user');
  const [showPwd, setShowPwd] = createSignal(false);
  const [company, setCompany] = createSignal('');
  const [submitted, setSubmitted] = createSignal(false);

  const navigate = useNavigate();
  const onSubmit = (e: Event) => {
    e.preventDefault();
    setSubmitted(true);
    // Require company selection for 'user' role
    if (role() === 'user' && !company()) {
      return; // stop submit until company selected
    }
    // TODO: replace with real auth; for now redirect to dashboard
    navigate('/dashboard', { replace: true });
  };

  return (
    <div class="min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-red-50 via-white to-red-50">
      <section class="flex items-center justify-center p-6">
        <div class="w-full max-w-md bg-white/95 backdrop-blur shadow-xl rounded-2xl p-6 md:p-7">
          <div class="text-[10px] tracking-widest uppercase text-slate-500 mb-2">Pertamina · Smart SPBU</div>
          <h1 class="text-3xl font-bold tracking-tight text-slate-900 leading-tight mb-2">Masuk ke Dashboard</h1>
          <p class="text-slate-500 mb-4">Pantau SPBU Anda secara real‑time.</p>

          <div class="mb-5 rounded-2xl p-1 grid grid-cols-2 text-sm bg-white border border-slate-200 shadow-sm">
            <button
              type="button"
              class={`h-9 rounded-xl flex items-center justify-center gap-2 transition duration-150 ease-out outline-none active:translate-y-[1px] active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[--brand-red] ${role()==='user' ? 'bg-gradient-to-r from-[#f37a7f] to-[var(--brand-red)] text-white shadow' : 'text-slate-600 hover:bg-slate-50'}`}
              onClick={() => setRole('user')}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" class={`${role()==='user' ? 'text-white' : 'text-slate-400'} h-4 w-4`} fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="3"/><path d="M4 20a8 8 0 0 1 16 0"/></svg>
              <span>User</span>
            </button>
            <button
              type="button"
              class={`h-9 rounded-xl flex items-center justify-center gap-2 transition duration-150 ease-out outline-none active:translate-y-[1px] active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[--brand-red] ${role()==='admin' ? 'bg-gradient-to-r from-[#f37a7f] to-[var(--brand-red)] text-white shadow' : 'text-slate-600 hover:bg-slate-50'}`}
              onClick={() => setRole('admin')}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" class={`${role()==='admin' ? 'text-white' : 'text-slate-400'} h-4 w-4`} fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l7 4v5c0 5-3.5 9.74-7 11-3.5-1.26-7-6-7-11V6l7-4Z"/></svg>
              <span>Admin</span>
            </button>
          </div>

          <form class="space-y-4" onSubmit={onSubmit}>
            {role()==='user' && (
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Perusahaan</label>
                <div class="relative">
                  <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🏢</span>
                  <select
                    class={`peer w-full appearance-none rounded-lg pl-10 pr-9 py-2 bg-white border focus:outline-none transition duration-150 ${submitted() && !company() ? 'border-red-400 focus:ring-2 focus:ring-red-300' : 'border-slate-300 focus:ring-2 focus:ring-[--brand-red]'}`}
                    value={company()}
                    onChange={(e) => setCompany(e.currentTarget.value)}
                  >
                    <option value="">Select Company</option>
                    <option>PT Pertamina</option>
                  </select>
                  <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-[--brand-red] transition-colors">▾</span>
                </div>
                <Show when={submitted() && !company()}>
                  <p class="mt-1 text-xs text-red-600">Silakan pilih perusahaan terlebih dahulu.</p>
                </Show>
              </div>
            )}

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <div class="relative">
                {/* Left user icon */}
                <svg aria-hidden="true" viewBox="0 0 24 24" class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="3"/><path d="M4 20a8 8 0 0 1 16 0"/></svg>
                <input type="email" required class="w-full border border-slate-300 rounded-xl pl-10 pr-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[--brand-red] placeholder:text-slate-400 transition-colors duration-150" placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="block text-sm font-medium text-slate-700">Password</label>
              </div>
              <div class="relative">
                {/* Left lock icon */}
                <svg aria-hidden="true" viewBox="0 0 24 24" class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"><path fill="currentColor" d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm3 8H9V6a3 3 0 0 1 6 0v3Z"/></svg>
                <input type={showPwd() ? 'text' : 'password'} required class="w-full border border-slate-300 rounded-xl pl-10 pr-10 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[--brand-red] placeholder:text-slate-400 transition-colors duration-150" placeholder="Enter your password" />
                {/* Right eye toggle */}
                <button type="button" aria-label="toggle password" class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-2 rounded" onClick={() => setShowPwd(!showPwd())}>
                  {showPwd() ? (
                    <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-11-8  .73-1.96 1.92-3.62 3.44-4.82M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 11 8-.46 1.23-1.09 2.35-1.86 3.33M10.58 10.58A3 3 0 0 0 13.42 13.42M3 3l18 18"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <label class="inline-flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" class="size-4 rounded border-slate-300" />
                Ingat saya
              </label>
              <A href="/forgot-password" class="text-sm text-[var(--brand-red)] hover:underline">Lupa Password?</A>
            </div>

            <button type="submit" class="w-full text-white rounded-xl py-2.5 shadow-md transition duration-150 ease-out flex items-center justify-center gap-2 bg-gradient-to-r from-[#f37a7f] to-[var(--brand-red)] hover:shadow-lg hover:brightness-105 active:translate-y-[1px] active:scale-[0.99] active:ring-4 active:ring-[--brand-red]/30 active:shadow-[0_0_0_4px_rgba(237,28,36,0.15)] disabled:opacity-60" disabled={role()==='user' && !company()}>
              <span>Masuk</span>
              <span>→</span>
            </button>
          </form>

          <p class="mt-5 text-sm text-slate-600">
            Belum punya akun?{' '}
            <A href="/register" class="text-[var(--brand-red)] hover:underline">Daftar di sini</A>
          </p>
        </div>
      </section>

      <aside class="hidden md:flex relative items-center justify-center overflow-hidden p-10 bg-gradient-to-br from-red-100/60 via-white/30 to-slate-200/50">
        {/* subtle background wash */}
        <div class="absolute inset-0 bg-gradient-to-br from-[--brand-red]/10 via-transparent to-red-900/10" />
        {/* decorative blurred blobs */}
        <div class="pointer-events-none absolute -left-24 -top-24 w-80 h-80 rounded-full bg-[--brand-red]/20 blur-3xl" />
        <div class="pointer-events-none absolute -right-28 -bottom-28 w-96 h-96 rounded-full bg-red-200/40 blur-3xl" />
        <div class="absolute -right-24 -bottom-24 w-[520px] h-[520px] rounded-3xl bg-white/10 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />

        <div class="relative z-10 max-w-xl text-slate-900">
          <img src="/src/assets/logo/icon.png" alt="Pertamina" class="h-10 mb-6 drop-shadow" />
          <div class="mb-6">
            <div class="text-xl md:text-2xl font-extrabold tracking-[0.18em] uppercase text-slate-900/95 drop-shadow-sm">SELAMAT DATANG DI</div>
            <div class="text-5xl md:text-6xl font-black leading-[1.08] tracking-tight">
              <span class="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(2,6,23,0.15)]">PERTA</span>
              <span class="bg-gradient-to-r from-[#ff1f3d] via-[#ff4d4d] to-[#ff1f3d] bg-clip-text text-transparent drop-shadow-[0_6px_20px_rgba(255,31,61,0.35)]">MINA</span>
            </div>
            <div class="mt-2 h-1 w-32 rounded-full bg-gradient-to-r from-[#ff1f3d] via-[#ff4d4d] to-transparent" />
            <div class="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[13px] font-medium text-[--brand-red] bg-white/60 ring-1 ring-[--brand-red]/30">Smart SPBU Operations Center</div>
          </div>

          <p class="text-slate-700/90 leading-relaxed mb-6">
            Platform operasional untuk memonitor SPBU secara terpusat: peta GIS real‑time, status konektivitas, dan kapabilitas teknisi nasional.
          </p>

          <div class="h-px w-24 bg-gradient-to-r from-[--brand-red] to-transparent mb-6" />

          <div class="grid grid-cols-2 gap-4">
            <div class="group relative rounded-2xl bg-white/50 backdrop-blur p-4 ring-1 ring-red-400/40 transition-all duration-300 shadow-[0_0_0_0_rgba(255,31,61,0)] hover:ring-red-500/80 hover:shadow-[0_0_28px_6px_rgba(255,31,61,0.35)]">
              <div class="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#ff1f3d] via-[#ff4d4d] to-[#ff1f3d] text-transparent bg-clip-text bg-[length:200%_100%] bg-[position:0_0] transition-all duration-500 ease-out [filter:drop-shadow(0_0_8px_rgba(255,31,61,0.35))] group-hover:bg-[position:100%_0] hover:[filter:drop-shadow(0_0_16px_rgba(255,31,61,0.65))]">150+</div>
              <div class="text-xs tracking-wide uppercase text-slate-500">Teknisi nasional</div>
            </div>
            <div class="group relative rounded-2xl bg-white/50 backdrop-blur p-4 ring-1 ring-red-400/40 transition-all duration-300 shadow-[0_0_0_0_rgba(255,31,61,0)] hover:ring-red-500/80 hover:shadow-[0_0_28px_6px_rgba(255,31,61,0.35)]">
              <div class="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#ff1f3d] via-[#ff4d4d] to-[#ff1f3d] text-transparent bg-clip-text bg-[length:200%_100%] bg-[position:0_0] transition-all duration-500 ease-out [filter:drop-shadow(0_0_8px_rgba(255,31,61,0.35))] group-hover:bg-[position:100%_0] hover:[filter:drop-shadow(0_0_16px_rgba(255,31,61,0.65))]">99.5%</div>
              <div class="text-xs tracking-wide uppercase text-slate-500">Target uptime</div>
            </div>
            <div class="group relative rounded-2xl bg-white/50 backdrop-blur p-4 ring-1 ring-red-400/40 transition-all duration-300 shadow-[0_0_0_0_rgba(255,31,61,0)] hover:ring-red-500/80 hover:shadow-[0_0_28px_6px_rgba(255,31,61,0.35)]">
              <div class="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#ff1f3d] via-[#ff4d4d] to-[#ff1f3d] text-transparent bg-clip-text bg-[length:200%_100%] bg-[position:0_0] transition-all duration-500 ease-out [filter:drop-shadow(0_0_8px_rgba(255,31,61,0.35))] group-hover:bg-[position:100%_0] hover:[filter:drop-shadow(0_0_16px_rgba(255,31,61,0.65))]">24/7</div>
              <div class="text-xs tracking-wide uppercase text-slate-500">Monitoring real‑time</div>
            </div>
            <div class="group relative rounded-2xl bg-white/50 backdrop-blur p-4 ring-1 ring-red-400/40 transition-all duration-300 shadow-[0_0_0_0_rgba(255,31,61,0)] hover:ring-red-500/80 hover:shadow-[0_0_28px_6px_rgba(255,31,61,0.35)]">
              <div class="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#ff1f3d] via-[#ff4d4d] to-[#ff1f3d] text-transparent bg-clip-text bg-[length:200%_100%] bg-[position:0_0] transition-all duration-500 ease-out [filter:drop-shadow(0_0_8px_rgba(255,31,61,0.35))] group-hover:bg-[position:100%_0] hover:[filter:drop-shadow(0_0_16px_rgba(255,31,61,0.65))]">520+</div>
              <div class="text-xs tracking-wide uppercase text-slate-500">SPBU terintegrasi</div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default AuthLogin;
