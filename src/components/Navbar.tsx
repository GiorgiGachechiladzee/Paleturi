import React from "react";
import { Link, NavLink } from "react-router-dom";

export const Navbar: React.FC = () => {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg font-medium transition-colors ${
      isActive
        ? "bg-[#8C4A1A] text-white"
        : "text-[#3D2314] hover:bg-[#F5EFE6]"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E8E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* ლოგო */}
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-[#8C4A1A] text-white px-2.5 py-1 rounded-md text-sm font-bold">
            პ
          </span>
          <span className="text-2xl font-black tracking-tight text-[#3D2314]">
            პალეტური
          </span>
        </Link>

        {/* ნავიგაცია */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={linkStyle}>
            მთავარი
          </NavLink>
          <NavLink to="/catalog" className={linkStyle}>
            კატალოგი
          </NavLink>
          <NavLink to="/custom-order" className={linkStyle}>
            ინდივიდუალური შეკვეთა
          </NavLink>
          <NavLink to="/about" className={linkStyle}>
            ჩვენ შესახებ
          </NavLink>
          <NavLink to="/contact" className={linkStyle}>
            კონტაქტი
          </NavLink>
        </nav>

        {/* მარჯვენა ღილაკი */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/995555123456"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white px-4 py-2.5 rounded-full font-semibold text-sm transition-all shadow-sm"
          >
            WhatsApp კონსულტაცია
          </a>
        </div>
      </div>
    </header>
  );
};