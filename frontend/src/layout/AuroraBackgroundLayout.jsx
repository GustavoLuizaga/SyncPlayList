import { Outlet } from 'react-router-dom';
import NorthenLights from './components/NorthenLights';
import { NavBar } from '../components/NavBar';
import './styles/northen-lights.css';

export default function AuroraBackgroundLayout() {
  return (
    <div className="relative min-h-screen">
      <NorthenLights />
      <NavBar />
      <main className="relative z-10 pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}