import React from 'react';

export const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-timber-charcoal">დაგვიკავშირდით</h1>
        <p className="text-timber-stone mt-2">მზად ვართ უპასუხოთ თქვენს ნებისმიერ შეკითხვას</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-warm-sm">
          <div className="text-lg font-bold text-timber-charcoal mb-2">📍 მისამართი</div>
          <p className="text-timber-stone text-sm">თბილისი, ქსნის ქუჩა #12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-warm-sm">
          <div className="text-lg font-bold text-timber-charcoal mb-2">📞 ტელეფონი</div>
          <p className="text-timber-stone text-sm">+995 555 12 34 56</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-warm-sm">
          <div className="text-lg font-bold text-timber-charcoal mb-2">💬 WhatsApp</div>
          <p className="text-timber-stone text-sm">+995 500 00 00 00</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-surface-linen p-8 rounded-2xl border border-surface-border space-y-6">
        <h2 className="text-2xl font-bold text-timber-charcoal">ხშირად დასმული კითხვები (FAQ)</h2>
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-surface-border">
            <h4 className="font-bold text-timber-charcoal">რამდენ ხანში მზადდება შეკვეთა?</h4>
            <p className="text-timber-stone text-sm mt-1">სტანდარტული შეკვეთის დამზადებას სჭირდება 3-დან 5 სამუშაო დღემდე.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-surface-border">
            <h4 className="font-bold text-timber-charcoal">არის თუ არა ავეჯი წყალგაუმტარი?</h4>
            <p className="text-timber-stone text-sm mt-1">დიახ, ეზოს ავეჯი იფარება სპეციალური დამცავი ზეთითა და ლაქით.</p>
          </div>
        </div>
      </div>
    </div>
  );
};