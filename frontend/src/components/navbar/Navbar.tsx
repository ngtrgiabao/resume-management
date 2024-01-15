import { useId, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DarkMode, LightMode, Menu } from "@mui/icons-material";
import { ToggleButton } from "@mui/material";
import { ThemeContext } from "../../context/theme.context.tsx";

import "./navbar.scss";

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/companies",
    label: "Companies",
  },
  {
    href: "/jobs",
    label: "Jobs",
  },
  {
    href: "/candidates",
    label: "Candidates",
  },
];

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  const menuStyles = open ? "menu open" : "menu";

  return (
    <div className="navbar">
      <div className="brand">
        <span>Resume Management</span>
      </div>
      <div className={menuStyles}>
        <ul>
          {links.map((link) => (
            <li key={useId()} onClick={toggleMenu}>
              <Link to={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="hamburger">
        <Menu onClick={toggleMenu} />
      </div>
      <div className="toggle">
        <ToggleButton
          value={"check"}
          selected={darkMode}
          onClick={toggleDarkMode}
        >
          {darkMode ? <LightMode /> : <DarkMode />}
        </ToggleButton>
      </div>
    </div>
  );
};

export default Navbar;
