import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Hamburger from "../../assets/hamburger-menu.svg";
import Close from "../../assets/close.svg";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="py-3 shadow bg-[#FDE68A]">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link>
              <Logo width="100px" />
            </Link>
          </div>
          <ul className="hidden sm:flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 text-[#1E293B] py-2 duration-200  hover:bg-orange-500 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn className="inline-bock px-6 text-[#1E293B] py-2 duration-200  hover:bg-orange-500 rounded-full" />
              </li>
            )}
          </ul>
          <ul className="flex sm:hidden ml-auto mr-5 justify-end items-center">
            <li>
              <button onClick={toggleNavbar}>
                {!isOpen ? (
                  <img src={Hamburger} width="25px" />
                ) : (
                  <img src={Close} width="25px" />
                )}
              </button>
            </li>
          </ul>
        </nav>
        {/* Mobile Navbar Drawer */}
        <div
          className={`fixed top-0 left-0 z-[999] w-72 h-full bg-[rgba(253,230,138,0.95)] shadow-lg transform transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } sm:hidden`}
        >
          <nav className="flex flex-col mt-[5px] p-[7px] h-full">
            <div className="mr-4">
              <Link onClick={() => setIsOpen(false)}>
                <Logo width="100px" />
              </Link>
            </div>
            <ul className="flex flex-col mt-5">
              {navItems.map((item) =>
                item.active ? (
                  <li
                    className="mb-3 border-b-2 border-[#a25802] rounded-2xl"
                    key={item.name}
                  >
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setIsOpen(false);
                      }}
                      className="inline-bock px-6 text-[#1E293B] py-2 duration-200 hover:text-orange-600"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className="mb-3 border-b-2 border-[#a25802] rounded-2xl">
                  <LogoutBtn
                    className="inline-bock px-6 text-[#1E293B] py-2 duration-200 rounded-full hover:text-orange-600"
                    onClick={() => setIsOpen(false)}
                  />
                </li>
              )}
            </ul>
          </nav>
        </div>
        {/* Overlay for mobile menu */}
        <div
          className={`fixed inset-0 z-[998] bg-black/30 transition-opacity duration-300 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } sm:hidden`}
          onClick={() => setIsOpen(false)}
        />
      </Container>
    </header>
  );
}

export default Header;
