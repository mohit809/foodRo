import React from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';
import { PROMO_BANNERS } from '../data/mockData';

export default function PromoCarousel({ onApplyPromo }) {
  const [copiedCode, setCopiedCode] = React.useState(null);

  const handleCopy = (code, e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    if (onApplyPromo) onApplyPromo(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PROMO_BANNERS.map((banner) => (
          <div
            key={banner.id}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${banner.bgColor} p-6 text-white shadow-xl flex flex-col justify-between group cursor-pointer transition hover:-translate-y-1 hover:shadow-2xl`}
          >
            {/* Background food image with dark overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url(${banner.image})` }}
            />
            
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-wide uppercase mb-3">
                <Sparkles className="w-3 h-3" />
                {banner.tag}
              </span>
              <h3 className="text-xl font-extrabold tracking-tight leading-tight mb-1">
                {banner.title}
              </h3>
              <p className="text-white/80 text-xs font-medium">
                {banner.subtitle}
              </p>
            </div>

            <div className="relative z-10 mt-6 flex items-center justify-between pt-2 border-t border-white/20">
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-white/70 font-semibold">Code:</span>
                <span className="font-mono font-extrabold text-sm tracking-wider px-2 py-0.5 rounded bg-black/30 border border-white/20">
                  {banner.code}
                </span>
              </div>

              <button
                onClick={(e) => handleCopy(banner.code, e)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-md hover:bg-slate-100 active:scale-95 transition"
              >
                {copiedCode === banner.code ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Applied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-600" />
                    <span>Apply</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
