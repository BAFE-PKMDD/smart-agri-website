"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import LoginButton from "@/components/login-button";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Modules", href: "#modules" },
  {
    label: "Training",
    children: [
      { label: "Schedule", href: "#schedule" },
      { label: "Details", href: "#details" },
      { label: "Assessments", href: "#assessments" },
    ],
  },
  {
    label: "Explore",
    children: [
      { label: "Groups", href: "/groups", isPage: true },
      { label: "References", href: "/references", isPage: true },
      { label: "Speakers", href: "/speakers", isPage: true },
    ],
  },
  { label: "Contact", href: "#contact" },
];

function NavDropdown({ item, onNavigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`nav__dropdown ${open ? "nav__dropdown--open" : ""}`}
      ref={ref}
    >
      <button
        className="nav__link nav__dropdown-trigger"
        onClick={() => setOpen(!open)}
        type="button"
        aria-expanded={open}
      >
        {item.label}
        <svg
          className="nav__dropdown-chevron"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className="nav__dropdown-menu">
        {item.children.map((child) =>
          child.isPage ? (
            <Link
              key={child.href}
              href={child.href}
              className="nav__dropdown-item"
              onClick={() => {
                setOpen(false);
                onNavigate();
              }}
            >
              {child.label}
            </Link>
          ) : (
            <a
              key={child.href}
              href={child.href}
              className="nav__dropdown-item"
              onClick={() => {
                setOpen(false);
                onNavigate();
              }}
            >
              {child.label}
            </a>
          )
        )}
      </div>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="header__inner">
        <a href="#" className="header__brand">
          <Image
            src="/logo.png"
            alt="Smart Agriculture Logo"
            width={50}
            height={50}
            className="header__logo"
          />
          <div className="header__title">
            BAFE Smart Agriculture
            <span>Instrumentation &amp; Electronics</span>
          </div>
          <span className="header__version">v1.3</span>
        </a>

        <nav className={`nav ${menuOpen ? "nav--open" : ""}`} id="nav-menu">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <NavDropdown
                key={item.label}
                item={item}
                onNavigate={handleNavClick}
              />
            ) : item.isPage ? (
              <Link
                key={item.href}
                href={item.href}
                className="nav__link"
                onClick={handleNavClick}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="nav__link"
                onClick={handleNavClick}
              >
                {item.label}
              </a>
            )
          )}
          <LoginButton />
        </nav>

        <button
          className="nav__toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}
