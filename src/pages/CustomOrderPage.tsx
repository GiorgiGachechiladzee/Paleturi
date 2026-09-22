import React, { useState } from "react";

export const CustomOrders: React.FC = () => {
  const [formData, setFormData] = useState({
    type: "დივანი / ლაუნჯი",
    length: "200",
    width: "80",
    height: "45",
    finish: "🌲 ბუნებრივი ფიჭვი (გამჭვირვალე ეკო-ლაქი)",
    note: "",
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.type.trim()) {
      newErrors.type = "მიუთითეთ ავეჯის ტიპი";
    }
    if (!formData.length || Number(formData.length) <= 0) {
      newErrors.length = "შეიყვანეთ სწორი სიგრძე";
    }
    if (!formData.width || Number(formData.width) <= 0) {
      newErrors.width = "შეიყვანეთ სწორი სიგანე";
    }
    if (!formData.height || Number(formData.height) <= 0) {
      newErrors.height = "შეიყვანეთ სწორი სიმაღლე";
    }
    if (!formData.name.trim()) {
      newErrors.name = "სახელის მითითება სავალდებულოა";
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      newErrors.phone = "მიუთითეთ სწორი ტელეფონის ნომერი (მინ. 9 ციფრი)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    let msg = `გამარჯობა „პალეტური“, მსურს ინდივიდუალური ავეჯის შეკვეთა:\n\n`;
    msg += `🛋 *ავეჯის ტიპი:* ${formData.type}\n`;
    msg += `📏 *ზომები:* ${formData.length} x ${formData.width} x ${formData.height} სმ\n`;
    msg += `🎨 *დამუშავება:* ${formData.finish}\n`;
    if (formData.note) msg += `📝 *აღწერა/ლინკი:* ${formData.note}\n`;
    msg += `👤 *სახელი:* ${formData.name}\n`;
    msg += `📞 *ტელეფონი:* ${formData.phone}\n`;

    window.open(
      `https://wa.me/995555000000?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-xl border border-outline-variant/30">
        <h1 className="text-2xl font-bold text-primary mb-6">
          ინდივიდუალური კალკულატორი & WhatsApp შეკვეთა
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">ავეჯის ტიპი</label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className={`w-full p-2.5 bg-surface-container rounded-lg border ${
                errors.type ? "border-error" : "border-outline-variant"
              }`}
            />
            {errors.type && (
              <p className="text-error text-xs mt-1 font-semibold">
                {errors.type}
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
                value={formData.length}
                onChange={(e) =>
                  setFormData({ ...formData, length: e.target.value })
                }
                className={`w-full p-2 bg-surface-container rounded-lg text-center border ${
                  errors.length ? "border-error" : "border-outline-variant"
                }`}
              />
              {errors.length && (
                <p className="text-error text-xs mt-1 font-semibold">
                  {errors.length}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">
                სიგანე (სმ)
              </label>
              <input
                type="number"
                value={formData.width}
                onChange={(e) =>
                  setFormData({ ...formData, width: e.target.value })
                }
                className={`w-full p-2 bg-surface-container rounded-lg text-center border ${
                  errors.width ? "border-error" : "border-outline-variant"
                }`}
              />
              {errors.width && (
                <p className="text-error text-xs mt-1 font-semibold">
                  {errors.width}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">
                სიმაღლე (სმ)
              </label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) =>
                  setFormData({ ...formData, height: e.target.value })
                }
                className={`w-full p-2 bg-surface-container rounded-lg text-center border ${
                  errors.height ? "border-error" : "border-outline-variant"
                }`}
              />
              {errors.height && (
                <p className="text-error text-xs mt-1 font-semibold">
                  {errors.height}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">
              სახელი <span className="text-error">*</span>
            </label>
            <input
              type="text"
              placeholder="გიორგი"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full p-2.5 bg-surface-container rounded-lg border ${
                errors.name ? "border-error" : "border-outline-variant"
              }`}
            />
            {errors.name && (
              <p className="text-error text-xs mt-1 font-semibold">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">
              ტელეფონი / WhatsApp <span className="text-error">*</span>
            </label>
            <input
              type="text"
              placeholder="+995 5xx xx xx xx"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className={`w-full p-2.5 bg-surface-container rounded-lg border ${
                errors.phone ? "border-error" : "border-outline-variant"
              }`}
            />
            {errors.phone && (
              <p className="text-error text-xs mt-1 font-semibold">
                {errors.phone}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#25D366] text-white font-bold rounded-xl flex justify-center items-center gap-2 hover:bg-[#20ba5a] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined">chat</span>
            იდეის გაზიარება WhatsApp-ში
          </button>
        </form>
      </div>
    </div>
  );
};
