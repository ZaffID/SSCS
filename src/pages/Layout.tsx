import type { Component, ParentProps } from 'solid-js';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Layout: Component<ParentProps> = (props) => {
  return (
    <div class="min-h-screen bg-slate-50 text-slate-900" style={{ "padding-left": 'var(--sidebar-width)' }}>
      <Sidebar />
      <main class="min-w-0">
        <Navbar />
        {props.children}
      </main>
    </div>
  );
};

export default Layout;
