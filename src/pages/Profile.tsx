import type { Component } from 'solid-js';
import { createSignal, Show, createMemo, onMount, onCleanup } from 'solid-js';
import { FaSolidUser, FaSolidEnvelope, FaSolidLock, FaSolidCamera, FaSolidCalendar, FaSolidCheck } from 'solid-icons/fa';

const tile = 'rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4';
const softCard = 'rounded-[28px] bg-white border border-slate-200 shadow-[0_10px_30px_rgba(2,6,23,0.07)]';

const Profile: Component = () => {
  // Edit mode and form state
  const [isEditing, setIsEditing] = createSignal(false);
  const [avatarUrl, setAvatarUrl] = createSignal<string | null>(null);
  const [fullName, setFullName] = createSignal('Super Admin');
  const [email, setEmail] = createSignal('admin@relogica.com');
  const [phone, setPhone] = createSignal('+1 (555) 123-4567');
  const [address, setAddress] = createSignal('123 Business District, Jakarta');

  const [errors, setErrors] = createSignal<{
    fullName?: string; email?: string; phone?: string; address?: string;
  }>({});

  // Dates and time formatting
  const [now, setNow] = createSignal(new Date());
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const formatDate = (d: Date) => `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  const formatTime = (d: Date) => {
    let h = d.getHours();
    const m = d.getMinutes();
    const am = h < 12 ? 'AM' : 'PM';
    h = h % 12; if (h === 0) h = 12;
    const mm = String(m).padStart(2, '0');
    const hh = String(h).padStart(2, '0');
    return `${hh}:${mm} ${am}`;
  };
  const [accountCreated, setAccountCreated] = createSignal<Date>(now());
  const [memberSince, setMemberSince] = createSignal<Date>(now());
  const [lastLogin, setLastLogin] = createSignal<Date>(now());
  // Live clock like Navbar
  const timer = setInterval(() => setNow(new Date()), 1000);
  onCleanup(() => clearInterval(timer));

  // Initials from full name
  const initials = createMemo(() => {
    const parts = fullName().trim().split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? '';
    const second = parts[1]?.[0] ?? '';
    return (first + second).toUpperCase() || 'U';
  });

  const validate = () => {
    const e: any = {};
    if (!fullName().trim()) e.fullName = 'Full name is required';
    const em = email().trim();
    if (!em) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(em)) e.email = 'Email format is invalid';
    const ph = phone().trim();
    if (!ph) e.phone = 'Phone number is required';
    else if (ph.replace(/\D/g, '').length < 7) e.phone = 'Phone number seems too short';
    if (!address().trim()) e.address = 'Address is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: Event) => {
    ev.preventDefault();
    if (!validate()) return;
    // Simulate saving...
    console.log('Saved profile', { fullName: fullName(), email: email(), phone: phone(), address: address(), avatarUrl: avatarUrl() });
    setLastLogin(new Date());
    // Persist to localStorage
    const payload = {
      fullName: fullName(),
      email: email(),
      phone: phone(),
      address: address(),
      avatarUrl: avatarUrl(),
      accountCreated: accountCreated().toISOString(),
      memberSince: memberSince().toISOString(),
      lastLogin: new Date().toISOString()
    };
    try { localStorage.setItem('profileData', JSON.stringify(payload)); } catch {}
    setIsEditing(false);
  };

  const onCancel = () => {
    setErrors({});
    // Optionally reset to defaults or last saved (kept as-is here)
    setIsEditing(false);
  };

  const onAvatarChange = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarUrl(String(reader.result));
    reader.readAsDataURL(file);
  };

  const removeAvatar = () => {
    setAvatarUrl(null);
    // Update storage immediately if exists
    try {
      const saved = localStorage.getItem('profileData');
      if (saved) {
        const obj = JSON.parse(saved);
        obj.avatarUrl = null;
        localStorage.setItem('profileData', JSON.stringify(obj));
      }
    } catch {}
  };

  onMount(() => {
    try {
      const saved = localStorage.getItem('profileData');
      if (saved) {
        const obj = JSON.parse(saved);
        if (obj.fullName) setFullName(obj.fullName);
        if (obj.email) setEmail(obj.email);
        if (obj.phone) setPhone(obj.phone);
        if (obj.address) setAddress(obj.address);
        if (typeof obj.avatarUrl !== 'undefined') setAvatarUrl(obj.avatarUrl);
        if (obj.accountCreated) setAccountCreated(new Date(obj.accountCreated));
        if (obj.memberSince) setMemberSince(new Date(obj.memberSince));
        if (obj.lastLogin) setLastLogin(new Date(obj.lastLogin));
      } else {
        // First-time open: set dates to now and persist baseline
        localStorage.setItem('profileData', JSON.stringify({
          fullName: fullName(), email: email(), phone: phone(), address: address(), avatarUrl: avatarUrl(),
          accountCreated: accountCreated().toISOString(), memberSince: memberSince().toISOString(), lastLogin: lastLogin().toISOString()
        }));
      }
    } catch {}
  });

  return (
    <div class="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/70">
      <div class="px-6 md:px-8 pt-8 pb-6 max-w-7xl mx-auto">
        <h1 class="text-[32px] md:text-[36px] leading-tight font-extrabold tracking-tight text-slate-800">My Profile</h1>
        <p class="text-base text-slate-500">Manage your personal information and account settings</p>
      </div>

      <div class="px-6 md:px-8 pb-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-7">
        {/* Left summary card */}
        <div class={`${softCard} lg:col-span-1 p-7`}>
          <div class="flex items-center gap-5">
            <div class="relative">
              <div class="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-sm grid place-items-center text-white text-3xl font-bold"
                   style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #ef4444 55%, #fb7185 100%)' }}>
                <Show when={avatarUrl()} fallback={<span>{initials()}</span>}>
                  <img src={avatarUrl()!} alt="Avatar" class="w-full h-full object-cover" />
                </Show>
              </div>
              <label class="absolute -bottom-1 -right-1 bg-white text-red-600 border border-slate-200 rounded-full p-2.5 shadow hover:bg-red-50 cursor-pointer" title="Change photo">
                <FaSolidCamera class="w-4 h-4" />
                <input type="file" accept="image/*" class="hidden" onChange={(e) => onAvatarChange((e.currentTarget.files?.[0]) as File)} />
              </label>
              <Show when={avatarUrl()}>
                <button type="button" onClick={removeAvatar} class="absolute -top-2 -right-2 bg-white/90 hover:bg-white text-slate-600 border border-slate-200 rounded-full px-2 py-0.5 text-xs shadow">x</button>
              </Show>
            </div>
            <div>
              <h3 class="text-2xl md:text-[26px] font-extrabold">{fullName()}</h3>
              <p class="text-slate-500 -mt-0.5 text-[15px]">{email()}</p>
              <span class="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-100">Administrator</span>
            </div>
          </div>

          <div class="mt-7 grid grid-cols-1 gap-4">
            <div class="rounded-2xl bg-gradient-to-r from-red-50 to-red-100/60 border border-red-100 p-4">
              <div class="text-sm text-slate-500">Member Since</div>
              <div class="text-base font-semibold">{formatDate(now())}</div>
            </div>
            <div class="rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100/60 border border-emerald-100 p-4">
              <div class="text-sm text-slate-500">Last Active</div>
              <div class="text-base font-semibold text-emerald-700">Online now</div>
            </div>
          </div>
        </div>

        {/* Right personal info card */}
        <div class={`${softCard} lg:col-span-2`}>
          <div class="p-7 pb-4 flex items-center justify-between">
            <h3 class="text-lg md:text-xl font-semibold">Personal Information</h3>
            <Show when={!isEditing()} fallback={
              <div class="flex items-center gap-3">
                <button onClick={onCancel} class="px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 hover:bg-slate-50">Cancel</button>
                <button form="profile-form" type="submit" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm">Save</button>
              </div>
            }>
              <button onClick={() => setIsEditing(true)} class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm">
                Edit Profile
              </button>
            </Show>
          </div>
          <div class="px-7 pb-7">
            <form id="profile-form" onSubmit={onSubmit} class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium text-slate-600 mb-1.5">Full Name</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaSolidUser class="h-5 w-5 text-slate-400" /></div>
                  <input
                    class={`block w-full pl-10 pr-3 py-3 rounded-xl border text-[15px] focus:outline-none focus:ring-2 ${errors().fullName ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-red-500 focus:border-red-500'}`}
                    value={fullName()}
                    onInput={(e) => setFullName(e.currentTarget.value)}
                    required
                    disabled={!isEditing()}
                    name="fullName"
                  />
                </div>
                <Show when={!!errors().fullName}><p class="mt-1 text-xs text-red-600">{errors().fullName}</p></Show>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-600 mb-1.5">Email Address</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaSolidEnvelope class="h-5 w-5 text-slate-400" /></div>
                  <input
                    type="email"
                    class={`block w-full pl-10 pr-3 py-3 rounded-xl border text-[15px] focus:outline-none focus:ring-2 ${errors().email ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-red-500 focus:border-red-500'}`}
                    value={email()}
                    onInput={(e) => setEmail(e.currentTarget.value)}
                    required
                    disabled={!isEditing()}
                    name="email"
                  />
                </div>
                <Show when={!!errors().email}><p class="mt-1 text-xs text-red-600">{errors().email}</p></Show>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-600 mb-1.5">Phone Number</label>
                <input
                  class={`block w-full px-3 py-3 rounded-xl border text-[15px] focus:outline-none focus:ring-2 ${errors().phone ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-red-500 focus:border-red-500'}`}
                  value={phone()}
                  onInput={(e) => setPhone(e.currentTarget.value)}
                  required
                  inputmode="tel"
                  pattern="[+()\-0-9\s]+"
                  disabled={!isEditing()}
                  name="phone"
                />
                <Show when={!!errors().phone}><p class="mt-1 text-xs text-red-600">{errors().phone}</p></Show>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-600 mb-1.5">Address</label>
                <input
                  class={`block w-full px-3 py-3 rounded-xl border text-[15px] focus:outline-none focus:ring-2 ${errors().address ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-red-500 focus:border-red-500'}`}
                  value={address()}
                  onInput={(e) => setAddress(e.currentTarget.value)}
                  required
                  disabled={!isEditing()}
                  name="address"
                />
                <Show when={!!errors().address}><p class="mt-1 text-xs text-red-600">{errors().address}</p></Show>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Account details tiles */}
      <div class="px-6 md:px-8 pb-14 max-w-7xl mx-auto">
        <div class={`${softCard} p-7`}>
          <h3 class="text-lg md:text-xl font-semibold mb-5 inline-flex items-center gap-2">
            <span class="inline-block w-1.5 h-4 rounded bg-red-500"></span>
            Account Details
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div class={`${tile} bg-gradient-to-r from-sky-50 to-indigo-50`}>
              <div class="shrink-0 grid place-items-center w-10 h-10 rounded-xl bg-white text-sky-600 border border-sky-100"><FaSolidUser class="w-5 h-5" /></div>
              <div>
                <div class="text-sm text-slate-500">Account Type</div>
                <div class="text-base font-semibold">Administrator</div>
              </div>
            </div>

            <div class={`${tile} bg-gradient-to-r from-emerald-50 to-lime-50`}>
              <div class="shrink-0 grid place-items-center w-10 h-10 rounded-xl bg-white text-emerald-600 border border-emerald-100"><FaSolidCalendar class="w-5 h-5" /></div>
              <div>
                <div class="text-sm text-slate-500">Account Created</div>
                <div class="text-base font-semibold">{formatDate(now())}</div>
              </div>
            </div>

            <div class={`${tile} bg-gradient-to-r from-orange-50 to-rose-50`}>
              <div class="shrink-0 grid place-items-center w-10 h-10 rounded-xl bg-white text-orange-600 border border-orange-100"><FaSolidCalendar class="w-5 h-5" /></div>
              <div>
                <div class="text-sm text-slate-500">Last Login</div>
                <div class="text-base font-semibold">Today at {formatTime(now())}</div>
              </div>
            </div>

            <div class={`${tile} bg-gradient-to-r from-fuchsia-50 to-purple-50`}>
              <div class="shrink-0 grid place-items-center w-10 h-10 rounded-xl bg-white text-fuchsia-600 border border-fuchsia-100"><FaSolidCheck class="w-5 h-5" /></div>
              <div>
                <div class="text-sm text-slate-500">Status</div>
                <div class="text-base font-semibold text-emerald-700">Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
