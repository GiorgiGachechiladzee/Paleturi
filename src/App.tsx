import React, { useState, useEffect } from "react";

// Tip-er sangga
interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  dimensions: string;
  image: string;
  badge?: string;
}

interface User {
  email: string;
  name: string;
}

// Satkorini avejis collection
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
    badge: "პოპულარული",
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
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Mobile Menu Toggle State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Anki product-er modal state (3 alada field dimensions-er jonno)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "sofas",
    length: "",
    width: "",
    height: "",
    image: "",
  });
  const [addProductErrors, setAddProductErrors] = useState<{
    [key: string]: string;
  }>({});

  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");

  // WhatsApp form state
  const [customForm, setCustomForm] = useState({
    type: "დივანი / ლაუნჯი",
    length: "200",
    width: "80",
    height: "45",
    name: "",
    phone: "",
  });

  // Validation errors
  const [authErrors, setAuthErrors] = useState<{ [key: string]: string }>({});
  const [customErrors, setCustomErrors] = useState<{ [key: string]: string }>(
    {},
  );

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
            }),
          );

          setProducts((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const newItems = apiProducts.filter((p) => !existingIds.has(p.id));
            return [...prev, ...newItems];
          });
        }
      })
      .catch((err) => console.error("API error:", err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const validateAuth = () => {
    const errors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (activeTab === "register" && !authName.trim()) {
      errors.name = "გთხოვთ მიუთითოთ სახელი";
    }

    if (!authEmail.trim()) {
      errors.email = "გთხოვთ მიუთითოთ ელ-ფოსტა";
    } else if (!emailRegex.test(authEmail)) {
      errors.email = "არასწორი ელ-ფოსტის ფორმატი";
    }

    if (!authPassword) {
      errors.password = "გთხოვთ შეიყვანოთ პაროლი";
    } else if (authPassword.length < 6) {
      errors.password = "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო";
    }

    setAuthErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAuth()) {
      setCurrentUser({
        email: authEmail,
        name: authName || authEmail.split("@")[0],
      });
      setActiveTab("catalog");
      setAuthEmail("");
      setAuthPassword("");
      setAuthName("");
      setAuthErrors({});
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab("home");
    setIsMobileMenuOpen(false);
  };

  const validateCustomForm = () => {
    const errors: { [key: string]: string } = {};

    if (!customForm.type.trim()) {
      errors.type = "მიუთითეთ ავეჯის ტიპი";
    }

    if (
      !customForm.length ||
      Number(customForm.length) <= 0 ||
      isNaN(Number(customForm.length))
    ) {
      errors.length = "არასწორი სიგრძე";
    }

    if (
      !customForm.width ||
      Number(customForm.width) <= 0 ||
      isNaN(Number(customForm.width))
    ) {
      errors.width = "არასწორი სიგანე";
    }

    if (
      !customForm.height ||
      Number(customForm.height) <= 0 ||
      isNaN(Number(customForm.height))
    ) {
      errors.height = "არასწორი სიმაღლე";
    }

    const nameToValidate = customForm.name || currentUser?.name || "";
    if (!nameToValidate.trim()) {
      errors.name = "გთხოვთ მიუთითოთ თქვენი სახელი";
    }

    const cleanPhone = customForm.phone.replace(/[^0-9]/g, "");
    if (!customForm.phone.trim()) {
      errors.phone = "გთხოვთ მიუთითოთ ტელეფონის ნომერი";
    } else if (cleanPhone.length < 9) {
      errors.phone = "ნომერი უნდა შეიცავდეს მინიმუმ 9 ციფრს";
    }

    setCustomErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCustomForm()) return;

    let text = `გამარჯობა „პალეტური“, მსურს ინდივიდუალური ავეჯის შეკვეთა:\n`;
    text += `🛋 ტიპი: ${customForm.type}\n`;
    text += `📏 ზომები: ${customForm.length}x${customForm.width}x${customForm.height} სმ\n`;
    text += `👤 სახელი: ${customForm.name || currentUser?.name}\n`;
    text += `📞 ტელეფონი: ${customForm.phone}\n`;

    window.open(
      `https://wa.me/995555000000?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  const handleDeleteProduct = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!newProduct.title.trim()) errors.title = "შეიყვანეთ დასახელება";
    if (!newProduct.description.trim()) errors.description = "შეიყვანეთ აღწერა";
    if (
      !newProduct.price ||
      Number(newProduct.price) <= 0 ||
      isNaN(Number(newProduct.price))
    ) {
      errors.price = "მიუთითეთ სწორი ფასი";
    }
    if (!newProduct.length || Number(newProduct.length) <= 0)
      errors.length = "არასწორი სიგრძე";
    if (!newProduct.width || Number(newProduct.width) <= 0)
      errors.width = "არასწორი სიგანე";
    if (!newProduct.height || Number(newProduct.height) <= 0)
      errors.height = "არასწორი სიმაღლე";

    setAddProductErrors(errors);

    if (Object.keys(errors).length === 0) {
      const createdProduct: Product = {
        id: Date.now().toString(),
        title: newProduct.title,
        description: newProduct.description,
        price: Number(newProduct.price),
        category: newProduct.category,
        dimensions: `${newProduct.length} x ${newProduct.width} x ${newProduct.height} სმ`,
        image:
          newProduct.image.trim() ||
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
        badge: "ახალი",
      };

      setProducts([createdProduct, ...products]);
      setIsAddModalOpen(false);
      setNewProduct({
        title: "",
        description: "",
        price: "",
        category: "sofas",
        length: "",
        width: "",
        height: "",
        image: "",
      });
      setAddProductErrors({});
    }
  };

  const handleNavClick = (
    tab: "home" | "catalog" | "custom" | "login" | "register",
  ) => {
    setActiveTab(tab);
    setAuthErrors({});
    setIsMobileMenuOpen(false);
  };

  const filteredProducts =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#3D2314] font-sans flex flex-col justify-between">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#3D2314]/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div
            className="text-2xl font-bold tracking-tight text-[#3D2314] cursor-pointer"
            onClick={() => handleNavClick("home")}
          >
            პალეტური
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <button
              onClick={() => handleNavClick("home")}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === "home"
                  ? "bg-[#854d0e] text-white"
                  : "hover:bg-[#3D2314]/5"
              }`}
            >
              მთავარი
            </button>
            <button
              onClick={() => handleNavClick("catalog")}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === "catalog"
                  ? "bg-[#854d0e] text-white"
                  : "hover:bg-[#3D2314]/5"
              }`}
            >
              კატალოგი
            </button>
            <button
              onClick={() => handleNavClick("custom")}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === "custom"
                  ? "bg-[#854d0e] text-white"
                  : "hover:bg-[#3D2314]/5"
              }`}
            >
              ინდივიდუალური შეკვეთა
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-[#3D2314]/20">
                <span className="text-xs font-bold text-[#854d0e]">
                  👤 {currentUser.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 bg-red-100 text-red-600 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors cursor-pointer"
                >
                  გამოსვლა
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <button
                  onClick={() => handleNavClick("login")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border border-[#3D2314]/20 cursor-pointer ${
                    activeTab === "login" ? "bg-[#3D2314] text-white" : ""
                  }`}
                >
                  შესვლა
                </button>
                <button
                  onClick={() => handleNavClick("register")}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#854d0e] text-white hover:opacity-90 transition-opacity cursor-pointer"
                >
                  რეგისტრაცია
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Hamburger Button (3 Lines / X) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#3D2314] focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg
                className="w-7 h-7 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#FDFBF7] border-b border-[#3D2314]/10 px-6 pt-2 pb-6 flex flex-col gap-3 shadow-lg animate-fade-in">
            <button
              onClick={() => handleNavClick("home")}
              className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === "home"
                  ? "bg-[#854d0e] text-white"
                  : "hover:bg-[#3D2314]/5"
              }`}
            >
              მთავარი
            </button>
            <button
              onClick={() => handleNavClick("catalog")}
              className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === "catalog"
                  ? "bg-[#854d0e] text-white"
                  : "hover:bg-[#3D2314]/5"
              }`}
            >
              კატალოგი
            </button>
            <button
              onClick={() => handleNavClick("custom")}
              className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === "custom"
                  ? "bg-[#854d0e] text-white"
                  : "hover:bg-[#3D2314]/5"
              }`}
            >
              ინდივიდუალური შეკვეთა
            </button>

            <div className="border-t border-[#3D2314]/10 pt-3 mt-1">
              {currentUser ? (
                <div className="flex justify-between items-center px-2">
                  <span className="text-sm font-bold text-[#854d0e]">
                    👤 {currentUser.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors cursor-pointer"
                  >
                    გამოსვლა
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleNavClick("login")}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border border-[#3D2314]/20 text-center cursor-pointer ${
                      activeTab === "login" ? "bg-[#3D2314] text-white" : ""
                    }`}
                  >
                    შესვლა
                  </button>
                  <button
                    onClick={() => handleNavClick("register")}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#854d0e] text-white text-center cursor-pointer"
                  >
                    რეგისტრაცია
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-16 max-w-7xl mx-auto px-6 flex-grow w-full">
        {/* HOME TAB */}
        {activeTab === "home" && (
          <div className="space-y-12">
            <div className="bg-[#fcf2eb] p-6 md:p-10 rounded-3xl border border-[#3D2314]/10 flex flex-col md:flex-row items-center gap-8">
              <div className="space-y-4 md:w-1/2">
                <span className="px-3 py-1 bg-[#22C55E]/10 text-[#22C55E] text-xs font-bold rounded-full">
                  100% ეკოლოგიური ავეჯი
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-[#3D2314]">
                  პალეტური — სტილური და გამძლე ეზოს ავეჯი
                </h1>
                <p className="text-[#524439] text-sm md:text-base">
                  ხის ხარისხიანი პადონებისგან დამზადებული ავეჯი შენი ეზოს,
                  ტერასისა და ინტერიერისთვის.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    onClick={() => handleNavClick("catalog")}
                    className="px-6 py-3 bg-[#854d0e] text-white font-bold rounded-xl shadow-md hover:opacity-90 transition-all cursor-pointer"
                  >
                    კატალოგის ნახვა
                  </button>
                  <button
                    onClick={() => handleNavClick("custom")}
                    className="px-6 py-3 bg-[#22C55E] text-white font-bold rounded-xl shadow-md hover:opacity-90 transition-all cursor-pointer"
                  >
                    ინდივიდუალური შეკვეთა
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
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
                  onClick={() => {
                    setIsAddModalOpen(true);
                    setAddProductErrors({});
                  }}
                  className="px-4 py-2 bg-[#854d0e] text-white font-bold rounded-xl shadow hover:opacity-90 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>+</span> პროდუქტის დამატება
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
                  className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    filter === c.id ? "bg-[#3D2314] text-white" : "bg-[#fcf2eb]"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className="bg-white rounded-2xl border border-[#3D2314]/10 overflow-hidden shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                >
                  <div>
                    <div className="relative h-48">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                      {p.badge && (
                        <span className="absolute top-3 left-3 px-3 py-1 bg-[#854d0e] text-white rounded-full text-xs font-bold shadow">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-bold text-lg text-[#3D2314]">
                        {p.title}
                      </h3>
                      <p className="text-xs text-[#524439] line-clamp-2">
                        {p.description}
                      </p>
                      <p className="text-xs font-semibold bg-[#fcf2eb] p-1.5 rounded-md inline-block">
                        ზომა: {p.dimensions}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 border-t border-[#3D2314]/5 flex justify-between items-center bg-[#fcf2eb]/30">
                    <span className="font-bold text-lg text-[#854d0e]">
                      ₾ {p.price}-დან
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleDeleteProduct(e, p.id)}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors cursor-pointer"
                      >
                        წაშლა
                      </button>
                      <a
                        href={`https://wa.me/995555000000?text=${encodeURIComponent(
                          `გამარჯობა, მაინტერესებს ${p.title}`,
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1 bg-[#22C55E] text-white rounded-lg text-xs font-bold hover:bg-[#1ea34d] transition-colors flex items-center gap-1"
                      >
                        შეკვეთა
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CUSTOM ORDERS TAB */}
        {activeTab === "custom" && (
          <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-3xl border border-[#3D2314]/10 shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-[#3D2314]">
              ინდივიდუალური შეკვეთის კალკულატორი
            </h2>
            <form
              onSubmit={handleSendWhatsApp}
              className="space-y-4"
              noValidate
            >
              <div>
                <label className="block text-xs font-bold mb-1">
                  ავეჯის ტიპი
                </label>
                <input
                  type="text"
                  value={customForm.type}
                  onChange={(e) => {
                    setCustomForm({ ...customForm, type: e.target.value });
                    if (customErrors.type)
                      setCustomErrors({ ...customErrors, type: "" });
                  }}
                  className={`w-full p-3 bg-[#fcf2eb] rounded-xl outline-none font-medium border ${
                    customErrors.type ? "border-red-500" : "border-transparent"
                  }`}
                />
                {customErrors.type && (
                  <p className="text-red-500 text-xs font-bold mt-1">
                    {customErrors.type}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold mb-1">
                    სიგრძე (სმ)
                  </label>
                  <input
                    type="number"
                    value={customForm.length}
                    onChange={(e) => {
                      setCustomForm({ ...customForm, length: e.target.value });
                      if (customErrors.length)
                        setCustomErrors({ ...customErrors, length: "" });
                    }}
                    className={`w-full p-2 bg-[#fcf2eb] rounded-xl text-center font-bold border ${
                      customErrors.length
                        ? "border-red-500"
                        : "border-transparent"
                    }`}
                  />
                  {customErrors.length && (
                    <p className="text-red-500 text-xs font-bold mt-1 text-center">
                      {customErrors.length}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">
                    სიგანე (სმ)
                  </label>
                  <input
                    type="number"
                    value={customForm.width}
                    onChange={(e) => {
                      setCustomForm({ ...customForm, width: e.target.value });
                      if (customErrors.width)
                        setCustomErrors({ ...customErrors, width: "" });
                    }}
                    className={`w-full p-2 bg-[#fcf2eb] rounded-xl text-center font-bold border ${
                      customErrors.width
                        ? "border-red-500"
                        : "border-transparent"
                    }`}
                  />
                  {customErrors.width && (
                    <p className="text-red-500 text-xs font-bold mt-1 text-center">
                      {customErrors.width}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">
                    სიმაღლე (სმ)
                  </label>
                  <input
                    type="number"
                    value={customForm.height}
                    onChange={(e) => {
                      setCustomForm({ ...customForm, height: e.target.value });
                      if (customErrors.height)
                        setCustomErrors({ ...customErrors, height: "" });
                    }}
                    className={`w-full p-2 bg-[#fcf2eb] rounded-xl text-center font-bold border ${
                      customErrors.height
                        ? "border-red-500"
                        : "border-transparent"
                    }`}
                  />
                  {customErrors.height && (
                    <p className="text-red-500 text-xs font-bold mt-1 text-center">
                      {customErrors.height}
                    </p>
                  )}
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
                  onChange={(e) => {
                    setCustomForm({ ...customForm, name: e.target.value });
                    if (customErrors.name)
                      setCustomErrors({ ...customErrors, name: "" });
                  }}
                  className={`w-full p-3 bg-[#fcf2eb] rounded-xl border ${
                    customErrors.name ? "border-red-500" : "border-transparent"
                  }`}
                />
                {customErrors.name && (
                  <p className="text-red-500 text-xs font-bold mt-1">
                    {customErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">
                  ტელეფონი / WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="+995 5xx xx xx xx"
                  value={customForm.phone}
                  onChange={(e) => {
                    setCustomForm({ ...customForm, phone: e.target.value });
                    if (customErrors.phone)
                      setCustomErrors({ ...customErrors, phone: "" });
                  }}
                  className={`w-full p-3 bg-[#fcf2eb] rounded-xl border ${
                    customErrors.phone ? "border-red-500" : "border-transparent"
                  }`}
                />
                {customErrors.phone && (
                  <p className="text-red-500 text-xs font-bold mt-1">
                    {customErrors.phone}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#22C55E] text-white font-bold rounded-xl shadow-md hover:opacity-90 transition-all cursor-pointer"
              >
                შეკვეთა WhatsApp-ში გაგზავნით
              </button>
            </form>
          </div>
        )}

        {/* LOGIN TAB */}
        {activeTab === "login" && (
          <div className="max-w-md mx-auto bg-white p-6 md:p-8 rounded-3xl border border-[#3D2314]/10 shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-center text-[#3D2314]">
              ავტორიზაცია
            </h2>
            <form onSubmit={handleLogin} className="space-y-4" noValidate>
              <div>
                <label className="block text-xs font-bold mb-1">ელ-ფოსტა</label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  value={authEmail}
                  onChange={(e) => {
                    setAuthEmail(e.target.value);
                    if (authErrors.email)
                      setAuthErrors({ ...authErrors, email: "" });
                  }}
                  className={`w-full p-3 bg-[#fcf2eb] rounded-xl outline-none border ${
                    authErrors.email ? "border-red-500" : "border-transparent"
                  }`}
                />
                {authErrors.email && (
                  <p className="text-red-500 text-xs font-bold mt-1">
                    {authErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">პაროლი</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={authPassword}
                  onChange={(e) => {
                    setAuthPassword(e.target.value);
                    if (authErrors.password)
                      setAuthErrors({ ...authErrors, password: "" });
                  }}
                  className={`w-full p-3 bg-[#fcf2eb] rounded-xl outline-none border ${
                    authErrors.password
                      ? "border-red-500"
                      : "border-transparent"
                  }`}
                />
                {authErrors.password && (
                  <p className="text-red-500 text-xs font-bold mt-1">
                    {authErrors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#854d0e] text-white font-bold rounded-xl shadow hover:opacity-90 transition-opacity cursor-pointer"
              >
                შესვლა
              </button>
            </form>
            <p className="text-center text-xs text-[#524439]">
              არ გაქვთ ანგარიში?{" "}
              <span
                className="font-bold text-[#854d0e] cursor-pointer"
                onClick={() => handleNavClick("register")}
              >
                რეგისტრაცია
              </span>
            </p>
          </div>
        )}

        {/* REGISTER TAB */}
        {activeTab === "register" && (
          <div className="max-w-md mx-auto bg-white p-6 md:p-8 rounded-3xl border border-[#3D2314]/10 shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-center text-[#3D2314]">
              რეგისტრაცია
            </h2>
            <form onSubmit={handleLogin} className="space-y-4" noValidate>
              <div>
                <label className="block text-xs font-bold mb-1">სახელი</label>
                <input
                  type="text"
                  placeholder="გიორგი"
                  value={authName}
                  onChange={(e) => {
                    setAuthName(e.target.value);
                    if (authErrors.name)
                      setAuthErrors({ ...authErrors, name: "" });
                  }}
                  className={`w-full p-3 bg-[#fcf2eb] rounded-xl outline-none border ${
                    authErrors.name ? "border-red-500" : "border-transparent"
                  }`}
                />
                {authErrors.name && (
                  <p className="text-red-500 text-xs font-bold mt-1">
                    {authErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">ელ-ფოსტა</label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  value={authEmail}
                  onChange={(e) => {
                    setAuthEmail(e.target.value);
                    if (authErrors.email)
                      setAuthErrors({ ...authErrors, email: "" });
                  }}
                  className={`w-full p-3 bg-[#fcf2eb] rounded-xl outline-none border ${
                    authErrors.email ? "border-red-500" : "border-transparent"
                  }`}
                />
                {authErrors.email && (
                  <p className="text-red-500 text-xs font-bold mt-1">
                    {authErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">პაროლი</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={authPassword}
                  onChange={(e) => {
                    setAuthPassword(e.target.value);
                    if (authErrors.password)
                      setAuthErrors({ ...authErrors, password: "" });
                  }}
                  className={`w-full p-3 bg-[#fcf2eb] rounded-xl outline-none border ${
                    authErrors.password
                      ? "border-red-500"
                      : "border-transparent"
                  }`}
                />
                {authErrors.password && (
                  <p className="text-red-500 text-xs font-bold mt-1">
                    {authErrors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#854d0e] text-white font-bold rounded-xl shadow hover:opacity-90 transition-opacity cursor-pointer"
              >
                ანგარიშის შექმნა
              </button>
            </form>
            <p className="text-center text-xs text-[#524439]">
              უკვე გაქვთ ანგარიში?{" "}
              <span
                className="font-bold text-[#854d0e] cursor-pointer"
                onClick={() => handleNavClick("login")}
              >
                შესვლა
              </span>
            </p>
          </div>
        )}
      </main>

      {/* ADD PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 relative shadow-2xl space-y-4 my-8">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer text-lg"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-[#3D2314]">
              ახალი ავეჯის დამატება
            </h3>

            <form
              onSubmit={handleAddProductSubmit}
              className="space-y-3"
              noValidate
            >
              <div>
                <label className="block text-xs font-bold mb-1">
                  დასახელება
                </label>
                <input
                  type="text"
                  placeholder="მაგ: პალეტის კუთხის დივანი"
                  value={newProduct.title}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, title: e.target.value })
                  }
                  className={`w-full p-2.5 bg-[#fcf2eb] rounded-xl border text-sm outline-none ${
                    addProductErrors.title
                      ? "border-red-500"
                      : "border-transparent"
                  }`}
                />
                {addProductErrors.title && (
                  <p className="text-red-500 text-xs font-bold mt-1">
                    {addProductErrors.title}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">აღწერა</label>
                <textarea
                  rows={2}
                  placeholder="მოკლე აღწერა პროდუქტზე..."
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className={`w-full p-2.5 bg-[#fcf2eb] rounded-xl border text-sm outline-none ${
                    addProductErrors.description
                      ? "border-red-500"
                      : "border-transparent"
                  }`}
                />
                {addProductErrors.description && (
                  <p className="text-red-500 text-xs font-bold mt-1">
                    {addProductErrors.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">
                    ფასი (₾)
                  </label>
                  <input
                    type="number"
                    placeholder="450"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    className={`w-full p-2.5 bg-[#fcf2eb] rounded-xl border text-sm outline-none ${
                      addProductErrors.price
                        ? "border-red-500"
                        : "border-transparent"
                    }`}
                  />
                  {addProductErrors.price && (
                    <p className="text-red-500 text-xs font-bold mt-1">
                      {addProductErrors.price}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">
                    კატეგორია
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    className="w-full p-2.5 bg-[#fcf2eb] rounded-xl border border-transparent text-sm outline-none font-medium cursor-pointer"
                  >
                    <option value="sofas">დივნები და ლაუნჯი</option>
                    <option value="tables">მაგიდები</option>
                    <option value="custom">სპეციალური</option>
                  </select>
                </div>
              </div>

              {/* Dimensions input fields */}
              <div>
                <label className="block text-xs font-bold mb-1">
                  ზომები (სმ)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <input
                      type="number"
                      placeholder="სიგრძე"
                      value={newProduct.length}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, length: e.target.value })
                      }
                      className={`w-full p-2 bg-[#fcf2eb] rounded-xl text-center text-sm border font-medium outline-none ${
                        addProductErrors.length
                          ? "border-red-500"
                          : "border-transparent"
                      }`}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="სიგანე"
                      value={newProduct.width}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, width: e.target.value })
                      }
                      className={`w-full p-2 bg-[#fcf2eb] rounded-xl text-center text-sm border font-medium outline-none ${
                        addProductErrors.width
                          ? "border-red-500"
                          : "border-transparent"
                      }`}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="სიმაღლე"
                      value={newProduct.height}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, height: e.target.value })
                      }
                      className={`w-full p-2 bg-[#fcf2eb] rounded-xl text-center text-sm border font-medium outline-none ${
                        addProductErrors.height
                          ? "border-red-500"
                          : "border-transparent"
                      }`}
                    />
                  </div>
                </div>
                {(addProductErrors.length ||
                  addProductErrors.width ||
                  addProductErrors.height) && (
                  <p className="text-red-500 text-xs font-bold mt-1 text-center">
                    შეიყვანეთ სამივე ზომა სწორად
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">
                  ფოტოს URL (არასავალდებულო)
                </label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={newProduct.image}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.value })
                  }
                  className="w-full p-2.5 bg-[#fcf2eb] rounded-xl border border-transparent text-sm outline-none"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-1/2 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors cursor-pointer text-sm"
                >
                  გაუქმება
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-[#854d0e] text-white font-bold rounded-xl shadow hover:opacity-90 transition-opacity cursor-pointer text-sm"
                >
                  დამატება
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-md flex justify-center items-center z-50 p-4 transition-all overflow-y-auto">
          <div className="bg-white border border-gray-100 rounded-3xl max-w-2xl w-full p-6 relative shadow-2xl overflow-hidden animate-fade-in my-8">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors cursor-pointer z-10"
            >
              ✕
            </button>

            <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden mb-6">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full h-full object-cover"
              />
              {selectedProduct.badge && (
                <span className="absolute top-3 left-3 px-3 py-1 bg-[#854d0e] text-white rounded-full text-xs font-bold shadow">
                  {selectedProduct.badge}
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedProduct.title}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-sm">
              {selectedProduct.description}
            </p>

            <div className="bg-gray-50 border border-gray-200 text-gray-700 p-3 rounded-xl mb-6 text-sm font-semibold inline-block">
              📏 ზომები: {selectedProduct.dimensions}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-gray-100 pt-4 gap-4">
              <div>
                <span className="text-xs text-gray-400 block font-medium">
                  საწყისი ფასი:
                </span>
                <span className="text-2xl font-extrabold text-gray-900">
                  ₾ {selectedProduct.price}-დან
                </span>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 sm:flex-initial px-5 py-2.5 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer text-sm text-center"
                >
                  დახურვა
                </button>
                <a
                  href={`https://wa.me/995555000000?text=${encodeURIComponent(
                    `გამარჯობა, მაინტერესებს ${selectedProduct.title}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#22C55E] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#1ea34d] shadow-md transition-colors text-sm"
                >
                  WhatsApp-ში შეკვეთა
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

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
            <p className="text-[#524439] text-xs">
              ორშაბათი - შაბათი: 10:00 - 19:00
            </p>
            <p className="text-xs text-[#524439]">კვირა: შეთანხმებით</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-[#3D2314]/5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#524439]">
          <p>© 2026 პალეტური. ყველა უფლება დაცულია.</p>
          <p>დამზადებულია საქართველოში 🇬🇪</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
