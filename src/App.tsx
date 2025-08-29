import type { Component } from 'solid-js';
import Dashboard from './pages/Dashboard';
import LiveMap from './pages/LiveMap';
import Stations from './pages/Stations';
import Technician from './pages/Technician';
import Users from './pages/Users';
import { Router, Route } from '@solidjs/router';
import Layout from './pages/Layout';

const App: Component = () => {
  return (
    <Router>
      <Route path="/" component={Layout}>
        <Route path="/" component={Dashboard} />
        <Route path="/map" component={LiveMap} />
        <Route path="/stations" component={Stations} />
        <Route path="/technician" component={Technician} />
        <Route path="/users" component={Users} />
      </Route>
    </Router>
  );
};

export default App;
