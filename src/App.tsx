import React, { useState, useEffect } from "react";

// ტიპების განსაზღვრა
interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  dimensions: string;
  image: string;
}

interface User {
  email: string;
  name: string;
}

// საწყისი ავეჯის კოლექცია რეალური ფოტოებით
const initialProducts: Product[] = [
  {
    id: "1",
    title: "L-ფორმის კუთხის დივანი ტერასისთვის",
    description:
      "მყუდრო და ტევადი კუთხის დივანი ხის ორმაგი პადონის ბაზით, სქელი წყალგაუმტარი ლეიბებითა და რბილი ბალიშებით.",
    price: 890,
    category: "sofas",
    dimensions: "240 x 200 x 75 სმ",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    title: "ჟურნალების / ეზოს მაგიდა",
    description:
      "ორდონიანი პალეტის კონსტრუქცია გამძლე ინდუსტრიული გორგოლაჭებითა და მინის ზედაპირით.",
    price: 290,
    category: "tables",
    dimensions: "80 x 60 x 42 სმ",
    image:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    title: "ეზოს შეზლონგი",
    description:
      "მყარი ხის შეზლონგი რეგულირებადი საზურგითა და პრემიუმ საზაფხულო რბილი ლეიბით.",
    price: 350,
    category: "custom",
    dimensions: "195 x 70 x 32 სმ",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    title: "პალეტის ბარის დახლი სკამებით",
    description:
      "სტილური ბარის კუთხე ვერანდისთვის თაროებითა და ჭიქების სათავსოებით.",
    price: 640,
    category: "tables",
    dimensions: "160 x 60 x 105 სმ",
    image:
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "5",
    title: "ეკო-ჰამაკის სავარძელი",
    description:
      "დაკიდებული ხის სავარძელი რბილი ბალიშით, იდეალურია ეზოში დასასვენებლად.",
    price: 220,
    category: "sofas",
    dimensions: "90 x 90 x 120 სმ",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800",
  },
];

export function App() {
  const [activeTab, setActiveTab] = useState<
    "home" | "catalog" | "custom" | "login" | "register"
  >("home");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filter, setFilter] = useState<string>("all");
  
  // setLoading(true) პირდაპირ useState-ის ინიციალიზაციაშია
  const [loading, setLoading] = useState<boolean>(true);

  // ავტორიზაციის სტეიტი
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");

  // WhatsApp ფორმის სტეიტი
  const [customForm, setCustomForm] = useState({
    type: "დივანი / ლაუნჯი",
    length: "200",
    width: "80",
    height: "45",
    name: "",
    phone: "",
  });

  // API-დან ავეჯის მონაცემების წამოღება (DummyJSON Furniture API)
  useEffect(() => {
    let isMounted = true;

    fetch("https://dummyjson.com/products/category/furniture")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data && data.products) {
          const apiProducts: Product[] = data.products.map(
            (item: {
              id: number;
              title: string;
              description: string;
              price: number;
              category: string;
              thumbnail?: string;
              images: string[];
            }) => ({
              id: `api-${item.id}`,
              title: item.title,
              description: item.description,
              price: Math.round(item.price * 2.7),
              category: item.category === "furniture" ? "tables" : "sofas",
              dimensions: "180 x 80 x 45 სმ",
              image: item.thumbnail || item.images[0],
            })
          );

          setProducts((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const newItems = apiProducts.filter((p) => !existingIds.has(p.id));
            return [...prev, ...newItems];
          });
        }
      })
      .catch((err) => console.error("API შეცდომა:", err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFetchManual = () => {
    setLoading(true);
    fetch("https://dummyjson.com/products/category/furniture")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.products) {
          const apiProducts: Product[] = data.products.map(
            (item: {
              id: number;
              title: string;
              description: string;
              price: number;
              category: string;
              thumbnail?: string;
              images: string[];
            }) => ({
              id: `api-${item.id}`,
              title: item.title,
              description: item.description,
              price: Math.round(item.price * 2.7),
              category: item.category === "furniture" ? "tables" : "sofas",
              dimensions: "180 x 80 x 45 სმ",
              image: item.thumbnail || item.images[0],
            })
          );

          setProducts((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const newItems = apiProducts.filter((p) => !existingIds.has(p.id));
            return [...prev, ...newItems];
          });
        }
      })
      .catch((err) => console.error("API შეცდომა:", err))
      .finally(() => setLoading(false));
  };

  // ავტორიზაციის ფუნქციები
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authEmail && authPassword) {
      setCurrentUser({
        email: authEmail,
        name: authName || authEmail.split("@")[0],
      });
      setActiveTab("catalog");
      setAuthEmail("");
      setAuthPassword("");
      setAuthName("");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab("home");
  };

  // CRUD ოპერაციები
  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleAddProduct = () => {
    const newProd: Product = {
      id: Date.now().toString(),
      title: "ახალი პალეტის ავეჯი",
      description: "ხელით დამუშავებული ეკოლოგიური ხის ავეჯი.",
      price: 420,
      category: "sofas",
      dimensions: "180 x 80 x 40 სმ",
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
    };
    setProducts([newProd, ...products]);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    let text = `გამარჯობა „პალეტური“, მსურს ინდივიდუალური ავეჯის შეკვეთა:\n`;
    text += `🛋 ტიპი: ${customForm.type}\n`;
    text += `📏 ზომები: ${customForm.length}x${customForm.width}x${customForm.height} სმ\n`;
    if (customForm.name || currentUser?.name)
      text += `👤 სახელი: ${customForm.name || currentUser?.name}\n`;
    if (customForm.phone) text += `📞 ტელეფონი: ${customForm.phone}\n`;

    window.open(
      `https://wa.me/995555000000?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const filteredProducts =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#3D2314] font-sans flex flex-col justify-between">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#3D2314]/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div
            className="text-2xl font-bold tracking-tight text-[#3D2314] cursor-pointer"
            onClick={() => setActiveTab("home")}
          >
            პალეტური
          </div>
          <nav className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("home")}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "home" ? "bg-[#854d0e] text-white" : "hover:bg-[#3D2314]/5"}`}
            >
              მთავარი
            </button>
            <button
              onClick={() => setActiveTab("catalog")}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "catalog" ? "bg-[#854d0e] text-white" : "hover:bg-[#3D2314]/5"}`}
            >
              კატალოგი
            </button>
            <button
              onClick={() => setActiveTab("custom")}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "custom" ? "bg-[#854d0e] text-white" : "hover:bg-[#3D2314]/5"}`}
            >
              ინდივიდუალური შეკვეთა
            </button>

            {/* User Profile / Auth Status */}
            {currentUser ? (
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-[#3D2314]/20">
                <span className="text-xs font-bold text-[#854d0e]">
                  👤 {currentUser.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 bg-red-100 text-red-600 rounded-lg text-xs font-bold hover:bg-red-200"
                >
                  გამოსვლა
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <button
                  onClick={() => setActiveTab("login")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border border-[#3D2314]/20 ${activeTab === "login" ? "bg-[#3D2314] text-white" : ""}`}
                >
                  შესვლა
                </button>
                <button
                  onClick={() => setActiveTab("register")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold bg-[#854d0e] text-white hover:opacity-90`}
                >
                  რეგისტრაცია
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-16 max-w-7xl mx-auto px-6 flex-grow w-full">
        {/* HOME TAB */}
        {activeTab === "home" && (
          <div className="space-y-12">
            <div className="bg-[#fcf2eb] p-10 rounded-3xl border border-[#3D2314]/10 flex flex-col md:flex-row items-center gap-8">
              <div className="space-y-4 md:w-1/2">
                <span className="px-3 py-1 bg-[#22C55E]/10 text-[#22C55E] text-xs font-bold rounded-full">
                  100% ეკოლოგიური ავეჯი
                </span>
                <h1 className="text-4xl font-extrabold leading-tight text-[#3D2314]">
                  პალეტური — სტილური და გამძლე ეზოს ავეჯი
                </h1>
                <p className="text-[#524439]">
                  ხის ხარისხიანი პადონებისგან დამზადებული ავეჯი შენი ეზოს,
                  ტერასისა და ინტერიერისთვის.
                </p>
                <div className="flex gap-4 pt-2">
                  <button
                    onClick={() => setActiveTab("catalog")}
                    className="px-6 py-3 bg-[#854d0e] text-white font-bold rounded-xl shadow-md hover:opacity-90"
                  >
                    კატალოგის ნახვა
                  </button>
                  <button
                    onClick={() => setActiveTab("custom")}
                    className="px-6 py-3 bg-[#22C55E] text-white font-bold rounded-xl shadow-md hover:opacity-90"
                  >
                    ინდივიდუალური შეკვეთა
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 w-full h-80 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800"
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* CATALOG TAB */}
        {activeTab === "catalog" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold">ჩვენი კოლექცია</h2>
                <p className="text-sm text-[#524439]">
                  მართეთ პროდუქტები (CRUD და API ინტეგრაცია)
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddProduct}
                  className="px-4 py-2 bg-[#854d0e] text-white font-bold rounded-xl shadow hover:opacity-90 transition-all"
                >
                  + პროდუქტის დამატება
                </button>
              </div>
            </div>

            {loading && (
              <p className="text-center font-bold text-[#854d0e] animate-pulse">
                ⏳ იტვირთება ავეჯის ახალი მოდელები API-დან...
              </p>
            )}

            <div className="flex gap-2 border-b border-[#3D2314]/10 pb-4 overflow-x-auto">
              {[
                { id: "all", label: "ყველა" },
                { id: "sofas", label: "დივნები და ლაუნჯი" },
                { id: "tables", label: "მაგიდები" },
                { id: "custom", label: "სპეციალური შეკვეთები" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFilter(c.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${filter === c.id ? "bg-[#3D2314] text-white" : "bg-[#fcf2eb]"}`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-[#3D2314]/10 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 space-y-2">
                      <h3 className="font-bold text-lg">{p.title}</h3>
                      <p className="text-xs text-[#524439]">{p.description}</p>
                      <p className="text-xs font-semibold bg-[#fcf2eb] p-1.5 rounded-md inline-block">
                        ზომა: {p.dimensions}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 border-t border-[#3D2314]/5 flex justify-between items-center bg-[#fcf2eb]/30">
                    <span className="font-bold text-lg text-[#854d0e]">
                      ₾ {p.price}-დან
                    </span>
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-bold hover:bg-red-200"
                    >
                      წაშლა
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CUSTOM ORDERS TAB */}
        {activeTab === "custom" && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-[#3D2314]/10 shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-[#3D2314]">
              ინდივიდუალური შეკვეთის კალკულატორი
            </h2>
            <form onSubmit={handleSendWhatsApp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1">
                  ავეჯის ტიპი
                </label>
                <input
                  type="text"
                  value={customForm.type}
                  onChange={(e) =>
                    setCustomForm({ ...customForm, type: e.target.value })
                  }
                  className="w-full p-3 bg-[#fcf2eb] rounded-xl outline-none font-medium"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold mb-1">
                    სიგრძე (სმ)
                  </label>
                  <input
                    type="text"
                    value={customForm.length}
                    onChange={(e) =>
                      setCustomForm({ ...customForm, length: e.target.value })
                    }
                    className="w-full p-2 bg-[#fcf2eb] rounded-xl text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">
                    სიგანე (სმ)
                  </label>
                  <input
                    type="text"
                    value={customForm.width}
                    onChange={(e) =>
                      setCustomForm({ ...customForm, width: e.target.value })
                    }
                    className="w-full p-2 bg-[#fcf2eb] rounded-xl text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">
                    სიმაღლე (სმ)
                  </label>
                  <input
                    type="text"
                    value={customForm.height}
                    onChange={(e) =>
                      setCustomForm({ ...customForm, height: e.target.value })
                    }
                    className="w-full p-2 bg-[#fcf2eb] rounded-xl text-center font-bold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">
                  თქვენი სახელი
                </label>
                <input
                  type="text"
                  placeholder="გიორგი"
                  value={customForm.name || currentUser?.name || ""}
                  onChange={(e) =>
                    setCustomForm({ ...customForm, name: e.target.value })
                  }
                  className="w-full p-3 bg-[#fcf2eb] rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">
                  ტელეფონი / WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="+995 5xx xx xx xx"
                  value={customForm.phone}
                  onChange={(e) =>
                    setCustomForm({ ...customForm, phone: e.target.value })
                  }
                  className="w-full p-3 bg-[#fcf2eb] rounded-xl"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[#22C55E] text-white font-bold rounded-xl shadow-md hover:opacity-90 transition-all"
              >
                შეკვეთა WhatsApp-ში გაგზავნით
              </button>
            </form>
          </div>
        )}

        {/* LOGIN TAB */}
        {activeTab === "login" && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-[#3D2314]/10 shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-center text-[#3D2314]">
              ავტორიზაცია
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1">ელ-ფოსტა</label>
                <input
                  type="email"
                  required
                  placeholder="example@mail.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full p-3 bg-[#fcf2eb] rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">პაროლი</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full p-3 bg-[#fcf2eb] rounded-xl outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#854d0e] text-white font-bold rounded-xl shadow hover:opacity-90"
              >
                შესვლა
              </button>
            </form>
            <p className="text-center text-xs text-[#524439]">
              არ გაქვთ ანგარიში?{" "}
              <span
                className="font-bold text-[#854d0e] cursor-pointer"
                onClick={() => setActiveTab("register")}
              >
                რეგისტრაცია
              </span>
            </p>
          </div>
        )}

        {/* REGISTER TAB */}
        {activeTab === "register" && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-[#3D2314]/10 shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-center text-[#3D2314]">
              რეგისტრაცია
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1">სახელი</label>
                <input
                  type="text"
                  required
                  placeholder="გიორგი"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  className="w-full p-3 bg-[#fcf2eb] rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">ელ-ფოსტა</label>
                <input
                  type="email"
                  required
                  placeholder="example@mail.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full p-3 bg-[#fcf2eb] rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">პაროლი</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full p-3 bg-[#fcf2eb] rounded-xl outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#854d0e] text-white font-bold rounded-xl shadow hover:opacity-90"
              >
                ანგარიშის შექმნა
              </button>
            </form>
            <p className="text-center text-xs text-[#524439]">
              უკვე გაქვთ ანგარიში?{" "}
              <span
                className="font-bold text-[#854d0e] cursor-pointer"
                onClick={() => setActiveTab("login")}
              >
                შესვლა
              </span>
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#fcf2eb] border-t border-[#3D2314]/10 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-xl text-[#854d0e]">პალეტური</h3>
            <p className="text-xs text-[#524439] leading-relaxed">
              ეკოლოგიური, სტილური და გამძლე ავეჯი ხის ხარისხიანი პადონებისგან.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-[#3D2314] uppercase tracking-wider">
              კონტაქტი
            </h4>
            <p className="text-xs text-[#524439]">
              📍 თბილისი, კახეთის გზატკეცილი N45
            </p>
            <p className="text-xs text-[#524439]">📞 +995 555 00 00 00</p>
            <p className="text-xs text-[#524439]">✉️ info@paleturi.ge</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-[#3D2314] uppercase tracking-wider">
              სამუშაო საათები
            </h4>
            <p className="text-xs text-[#524439]">
              ორშაბათი - შაბათი: 10:00 - 19:00
            </p>
            <p className="text-xs text-[#524439]">კვირა: შეთანხმებით</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-[#3D2314]/5 flex justify-between text-xs text-[#524439]">
          <p>© 2026 პალეტური. ყველა უფლება დაცულია.</p>
          <p>დამზადებულია საქართველოში 🇬🇪</p>
        </div>
      </footer>
    </div>
  );
}

export default App;