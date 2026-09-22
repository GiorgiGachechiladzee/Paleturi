import React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F5EFE6] border-t border-[#E8E0D5] pt-12 pb-6 text-[#3D2314]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <Link to="/" className="text-2xl font-black tracking-tight">
            პალეტური
          </Link>
          <p className="text-sm text-[#6E5343] mt-3">
            ეკოლოგიური, სტილური და გამძლე ხის ავეჯი თქვენი სიმყუდროვისთვის.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase mb-3">ნავიგაცია</h4>
          <ul className="space-y-2 text-sm text-[#6E5343]">
            <li><Link to="/" className="hover:text-[#8C4A1A]">მთავარი</Link></li>
            <li><Link to="/catalog" className="hover:text-[#8C4A1A]">კატალოგი</Link></li>
            <li><Link to="/custom-order" className="hover:text-[#8C4A1A]">ინდივიდუალური შეკვეთა</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase mb-3">საკონტაქტო</h4>
          <ul className="space-y-2 text-sm text-[#6E5343]">
            <li>📞 +995 555 12 34 56</li>
            <li>✉️ info@paleturi.ge</li>
            <li>📍 თბილისი, საქართველო</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase mb-3">სამუშაო საათები</h4>
          <p className="text-sm text-[#6E5343]">ორშ - შაბ: 10:00 - 19:00</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-[#E8E0D5] text-xs text-center text-[#6E5343]">
        © {new Date().getFullYear()} პალეტური. ყველა უფლება დაცულია.
      </div>
    </footer>
  );
};