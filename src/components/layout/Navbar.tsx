import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../../constants/styles";
import { navLinks } from "../../constants";
import { logo, menu, close } from "../../assets";
import { config } from "../../constants/config";

const Navbar = () => {
  const [active, setActive] = useState<string | null>();
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setActive("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    const navbarHighlighter = () => {
      const sections = document.querySelectorAll("section[id]");

      sections.forEach((current) => {
        const sectionId = current.getAttribute("id");
        // @ts-ignore
        const sectionHeight = current.offsetHeight;
        const sectionTop =
          current.getBoundingClientRect().top - sectionHeight * 0.2;

        if (sectionTop < 0 && sectionTop + sectionHeight > 0) {
          setActive(sectionId);
        }
      });
    };

    window.addEventListener("scroll", navbarHighlighter);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", navbarHighlighter);
    };
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } fixed top-0 z-20 flex w-full items-center py-5 transition-all duration-300 ${
        scrolled 
          ? "bg-primary/90 backdrop-blur-sm shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="h-9 w-9 object-contain" />
          <p className="flex cursor-pointer text-[18px] font-bold text-white ">
            {config.html.title}
          </p>
        </Link>

        <ul className="hidden list-none flex-row gap-10 sm:flex">
          {navLinks.map((nav) => {
            const isActive = active === nav.id;
            return (
              <li key={nav.id} className="relative group">
                <a
                  href={`#${nav.id}`}
                  className={`relative inline-block px-2 py-1 text-[18px] font-medium transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-secondary hover:text-white'
                  }`}
                >
                  {nav.title}
                  <span 
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#915EFF] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
                {isActive && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#915EFF] to-[#B372FE] rounded-full" />
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex flex-1 items-center justify-end sm:hidden">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="h-[28px] w-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } black-gradient absolute right-0 top-20 z-10 mx-4 my-2 min-w-[140px] rounded-xl p-6`}
          >
            <ul className="flex flex-1 list-none flex-col items-start justify-end gap-4">
              {navLinks.map((nav) => {
                const isActive = active === nav.id;
                return (
                  <li key={nav.id} className="relative group">
                    <a
                      href={`#${nav.id}`}
                      className={`relative inline-block py-1 text-[16px] font-medium transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-secondary hover:text-white'
                      }`}
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    >
                      {nav.title}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#915EFF] to-[#B372FE] rounded-full" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
