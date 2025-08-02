import { Home, Search, Heart, ListMusic } from "lucide-react";
import { NavLink } from "react-router-dom";

function BottomNav() {
  return (
    <nav className="lg:hidden bottom-0 left-0 z-40 fixed bg-light dark:bg-dark px-4 w-full">
      <ul className="flex justify-between items-center py-2">
        <NavItem icon={<Home size={22} />} label="Home" to="/" />
        <NavItem icon={<Search size={22} />} label="Search" to="/search" />
        <NavItem icon={<Heart size={22} />} label="Favorite" to="/favorite" />
        <NavItem
          icon={<ListMusic size={22} />}
          label="Playlist"
          to="/playlist"
        />
      </ul>
    </nav>
  );
}

function NavItem({ icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col justify-center items-center transition cursor-pointer ${
          isActive
            ? "text-indigo-500"
            : "text-gray-600 dark:text-gray-300 hover:text-indigo-500"
        }`
      }
    >
      {icon}
      <span className="mt-1 text-xs">{label}</span>
    </NavLink>
  );
}
export default BottomNav;
