import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");

    Promise.resolve().then(() => {
      navigate("/Login");
    });
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
         
          <div className="flex items-center">
            {localStorage.getItem("isLoggedIn") === "false" ? (
              <NavLink
                to="/"
                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Home
              </NavLink>
            ) : null}
          </div>

          <div className="flex items-center lg:order-2">
            {localStorage.getItem("isLoggedIn") === "false" ? (
              <>
                <Link
                  to="/Login"
                  className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Log in
                </Link>
                <Link
                  to="/Register"
                  className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Register
                </Link>
              </>
            ) : (
              <Link
                onClick={handleLogout}
                className="text-white hover:text-gray-100 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none bg-red-500 hover:bg-red-600"
              >
                Log out
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
