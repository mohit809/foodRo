import React, { useState } from 'react';
import { X, Check, Star, Plus, Minus, Flame, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export default function CustomizeModal({ food, isOpen, onClose, onAddToCart, currency = 'INR' }) {
  if (!isOpen || !food) return null;

  const [selectedSize, setSelectedSize] = useState(
    food.customizationOptions?.sizes?.[0] || { name: 'Regular', price: 0 }
  );
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  const toggleAddOn = (addOn) => {
    if (selectedAddOns.some((item) => item.name === addOn.name)) {
      setSelectedAddOns(selectedAddOns.filter((item) => item.name !== addOn.name));
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
  };

  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const singleUnitPrice = food.price + (selectedSize?.price || 0) + addOnsTotal;
  const totalPrice = singleUnitPrice * quantity;

  const handleConfirm = () => {
    onAddToCart({
      ...food,
      customizationKey: `${food.id}-${selectedSize.name}-${selectedAddOns.map(a => a.name).sort().join(',')}`,
      selectedSize,
      selectedAddOns,
      specialInstructions,
      singleUnitPrice,
      price: singleUnitPrice
    }, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh] animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-250 pb-safe sm:pb-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator Handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />

        {/* Header with image */}
        <div className="relative h-44 sm:h-48 w-full bg-slate-100 shrink-0">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition backdrop-blur-xs cursor-pointer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-extrabold text-orange-400">
              {food.restaurant.name}
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold leading-tight drop-shadow-xs truncate">
              {food.name}
            </h2>
            <div className="flex items-center gap-2 sm:gap-3 mt-1 text-[11px] sm:text-xs text-slate-200 font-medium">
              <span className="flex items-center gap-1 text-amber-300 font-bold">
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                {food.rating} ({food.reviewsCount}+)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-400" />
                {food.calories}
              </span>
            </div>
          </div>
        </div>

        {/* Customization Options Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 flex-1">
          {/* Sizes / Portions */}
          {food.customizationOptions?.sizes && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                  Choose Portion / Size
                </h4>
                <span className="text-[10px] sm:text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                  Required
                </span>
              </div>
              <div className="space-y-2">
                {food.customizationOptions.sizes.map((size) => {
                  const isSelected = selectedSize.name === size.name;
                  return (
                    <div
                      key={size.name}
                      onClick={() => setSelectedSize(size)}
                      className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50/50 shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-orange-500 bg-orange-500 text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-slate-800">{size.name}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-600">
                        {size.price === 0 ? 'Standard' : `+${formatCurrency(size.price, currency)}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-ons */}
          {food.customizationOptions?.addOns && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                  Add Extras & Dips
                </h4>
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-400">
                  Optional
                </span>
              </div>
              <div className="space-y-2">
                {food.customizationOptions.addOns.map((addOn) => {
                  const isSelected = selectedAddOns.some((i) => i.name === addOn.name);
                  return (
                    <div
                      key={addOn.name}
                      onClick={() => toggleAddOn(addOn)}
                      className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50/50'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                          isSelected ? 'border-orange-500 bg-orange-500 text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-slate-800">{addOn.name}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-600">
                        +{formatCurrency(addOn.price, currency)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wide mb-1.5">
              Cooking Instructions / Notes
            </h4>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Less spicy, extra chutney, dressing on the side..."
              rows={2}
              className="w-full p-2.5 rounded-2xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-xs text-slate-800 outline-none resize-none"
            />
          </div>
        </div>

        {/* Footer with quantity & Add to Order button */}
        <div className="p-3.5 sm:p-6 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-3 sm:gap-4 shrink-0">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl p-1 shadow-xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-700 active:scale-95 transition cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs sm:text-sm font-extrabold w-5 text-center text-slate-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-700 active:scale-95 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleConfirm}
            className="flex-1 py-3 sm:py-3.5 px-4 sm:px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-orange-500/30 active:scale-98 transition flex items-center justify-between cursor-pointer"
          >
            <span>Add to Order</span>
            <span>{formatCurrency(totalPrice, currency)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
