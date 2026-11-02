import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
        <nav>
          <Link to="/">Home</Link>
          {" | "}
          <Link to="/favourites">Favourites</Link>
        </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}