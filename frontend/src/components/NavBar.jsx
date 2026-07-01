import { Music4, Play, House, Heart, Radio, Clock } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navItems = [
    { to: "/", icon: House, label: "Inicio" },
    { to: "/liked", icon: Heart, label: "Favoritos" },
    { to: "/sync-room", icon: Radio, label: "Sync Room" },
    { to: "/history", icon: Clock, label: "Historial" },
  ];

  const handleLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };

  return (
    <header className="bg-black/10 backdrop-blur-xl text-white fixed top-0 left-0 w-full z-50">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Navegación principal"
      >
        <Link to="/" className="flex items-center gap-2 group">
          <Music4 className="h-5 w-5 text-white" aria-hidden="true" />
          <h1 className="font-bold text-lg">
            <span className="text-white">Sync</span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#1bc6b7] to-[#0D9488]">
              Playlist
            </span>
          </h1>
        </Link>

        <input
          type="text"
          id="search-input"
          name="search-input"
          placeholder="Buscar música..."
          className=" bg-white/10 border border-white/20 rounded-xl px-2 py-2 pl-10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#1bc6b7] focus:border-transparent transition-all duration-200"
          
        />

        <ul className="hidden md:flex items-center gap-1" role="menubar">
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to} role="none">
              <NavLink
                to={to}
                role="menuitem"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-300
                  ${
                    isActive
                      ? "bg-white/15 text-[#1bc6b7]"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`
                }
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        {isLoggedIn ? (
          <button onClick={handleLogin}>logout</button>
        ) : (
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-[#1bc6b7] to-[#0D9488] font-medium text-white px-5 py-2.5 rounded-lg shadow-lg shadow-[#1bc6b7]/25 hover:shadow-[#1bc6b7]/40 hover:scale-105 transition-all duration-300"
            onClick={handleLogin}
          >
            <Play className="h-4 w-4 fill-current" aria-hidden="true" />
            <span>Comenzar</span>
          </button>
        )}
      </nav>
    </header>
  );
}
