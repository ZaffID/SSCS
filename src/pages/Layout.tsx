import type { Component, ParentProps } from 'solid-js';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Layout: Component<ParentProps> = (props) => {
  return (
    <div class="min-h-screen bg-slate-50 text-slate-900">
      <div class="flex">
        <Sidebar />
        <main class="flex-1 min-w-0">
          <Navbar />
          {props.children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
