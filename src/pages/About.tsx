import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
            ჩვენი ისტორია
          </span>
          <h1 className="text-4xl font-bold text-timber-charcoal">ჩვენ შესახებ — „პალეტური“</h1>
          <p className="text-timber-stone leading-relaxed">
            „პალეტური“ არის ქართული ბრენდი, რომელიც სპეციალიზებულია ეკოლოგიურად სუფთა, ხელით დამუშავებული ხის ავეჯის წარმოებაზე. ჩვენ ვიყენებთ უმაღლესი ხარისხის მასალას და თანამედროვე დამუშავების ტექნოლოგიას.
          </p>
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-surface-border">
            <div>
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-xs text-timber-stone mt-1">ეკოლოგიური ხე</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">3-5</div>
              <div className="text-xs text-timber-stone mt-1">დღე დამზადება</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-xs text-timber-stone mt-1">პროექტი</div>
            </div>
          </div>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
            alt="Workplace"
            className="rounded-2xl shadow-warm-lg border border-surface-border h-[400px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};