import React, { useState } from 'react';
import { 
  X, 
  Store, 
  PlusCircle, 
  Utensils, 
  Check, 
  Sparkles, 
  Trash2, 
  Building2
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { formatCurrency } from '../utils/currency';

export default function RestaurantPortalModal({
  isOpen,
  onClose,
  restaurants,
  onAddRestaurant,
  onAddFoodItem,
  onDeleteFoodItem,
  foodItems,
  currency
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('add_dish');
  
  // Dish Form State
  const [dishName, setDishName] = useState('');
  const [dishCategory, setDishCategory] = useState('momos');
  const [dishPrice, setDishPrice] = useState('350');
  const [dishDescription, setDishDescription] = useState('');
  const [isVeg, setIsVeg] = useState(true);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(restaurants[0]?.id || 'r-momo');
  const [dishImage, setDishImage] = useState('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=80');
  const [prepTime, setPrepTime] = useState('15-20 mins');
  const [calories, setCalories] = useState('350 kcal');
  const [isBestseller, setIsBestseller] = useState(false);

  // Restaurant Form State
  const [restName, setRestName] = useState('');
  const [restCuisine, setRestCuisine] = useState('Himalayan Momos, Fast Food, Pizza');
  const [restLocation, setRestLocation] = useState('Downtown Square');
  const [restDeliveryTime, setRestDeliveryTime] = useState('20-30 min');
  const [restImage, setRestImage] = useState('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80');

  const imagePresets = [
    { label: '🥟 Momos', url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=80' },
    { label: '🍕 Pizza', url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80' },
    { label: '🍔 Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80' },
    { label: '🍛 Biryani', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80' },
    { label: '🍣 Sushi', url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80' },
    { label: '🍰 Dessert', url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80' }
  ];

  const handleAddDishSubmit = (e) => {
    e.preventDefault();
    if (!dishName.trim()) return;

    const matchedRest = restaurants.find(r => r.id === selectedRestaurantId) || {
      id: 'custom-r',
      name: 'Partner Kitchen',
      rating: 4.8,
      deliveryTime: '20-30 min',
      distance: '1.5 km'
    };

    const rawInput = parseFloat(dishPrice) || 5;
    const usdPrice = currency === 'INR' ? rawInput / 86.5 : rawInput;

    const newFood = {
      id: 'dish-' + Date.now(),
      name: dishName.trim(),
      category: dishCategory,
      price: Number(usdPrice.toFixed(2)),
      originalPrice: Number((usdPrice * 1.25).toFixed(2)),
      rating: 4.9,
      reviewsCount: 1,
      isVeg,
      isBestseller,
      prepTime,
      calories,
      description: dishDescription.trim() || `Freshly crafted ${dishName} served hot and fresh.`,
      image: dishImage,
      restaurant: {
        id: matchedRest.id,
        name: matchedRest.name,
        rating: matchedRest.rating || 4.8,
        deliveryTime: matchedRest.deliveryTime || '20-30 min',
        distance: matchedRest.distance || '1.8 km'
      },
      customizationOptions: {
        sizes: [
          { name: 'Standard Portion', price: 0 },
          { name: 'Large / Feast Portion', price: Number((usdPrice * 0.4).toFixed(2)) }
        ],
        addOns: [
          { name: 'Extra Special Dip / Sauce', price: 0.50 },
          { name: 'Extra Cheese / Topping', price: 1.00 }
        ]
      }
    };

    onAddFoodItem(newFood);
    setDishName('');
    setDishDescription('');
    setActiveTab('manage');
  };

  const handleAddRestaurantSubmit = (e) => {
    e.preventDefault();
    if (!restName.trim()) return;

    const newRest = {
      id: 'rest-' + Date.now(),
      name: restName.trim(),
      cuisine: restCuisine.trim(),
      location: restLocation.trim(),
      rating: 4.9,
      deliveryTime: restDeliveryTime.trim(),
      distance: '1.2 km',
      image: restImage
    };

    onAddRestaurant(newRest);
    setRestName('');
    setSelectedRestaurantId(newRest.id);
    setActiveTab('add_dish');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh] animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-250 pb-safe sm:pb-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-md">
              <Store className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-white">foodRo Partner Portal</h2>
              <p className="text-[10px] sm:text-xs text-slate-400">List your restaurant, hotel & menu</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Tab Navigation - Scrollable on mobile */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 pt-2 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'add_dish', label: '➕ Add Food', icon: Utensils },
            { id: 'add_restaurant', label: '🏨 Register Hotel', icon: Building2 },
            { id: 'manage', label: `📋 Menu (${foodItems.length})`, icon: Store }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 py-2.5 sm:py-3 px-3 sm:px-4 text-xs font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-orange-500 text-orange-600 bg-white rounded-t-xl'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 flex-1">
          
          {/* TAB 1: ADD DISH */}
          {activeTab === 'add_dish' && (
            <form onSubmit={handleAddDishSubmit} className="space-y-3.5 sm:space-y-4">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Add any food item (Momos, Pizza, Burger, Noodles, Biryani) to go live instantly!</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Dish Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                    placeholder="e.g. Steamed Chicken Momos"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-orange-500 text-xs font-semibold text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Category / Cuisine *
                  </label>
                  <select
                    value={dishCategory}
                    onChange={(e) => setDishCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-orange-500 text-xs font-bold text-slate-900 outline-none bg-white"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>
                        {c.icon} {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Price ({currency}) *
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={dishPrice}
                    onChange={(e) => setDishPrice(e.target.value)}
                    placeholder={currency === 'INR' ? 'e.g. 299' : 'e.g. 12.50'}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-orange-500 text-xs font-bold text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Prep Time
                  </label>
                  <input
                    type="text"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                    placeholder="e.g. 15-20 mins"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-orange-500 text-xs text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Calories
                  </label>
                  <input
                    type="text"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="e.g. 380 kcal"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-orange-500 text-xs text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Select Hotel / Restaurant *
                </label>
                <select
                  value={selectedRestaurantId}
                  onChange={(e) => setSelectedRestaurantId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-orange-500 text-xs font-bold text-slate-900 outline-none bg-white"
                >
                  {restaurants.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.location || r.cuisine})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-5 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVeg}
                    onChange={(e) => setIsVeg(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span className="text-xs font-bold text-slate-800">🌱 Pure Veg</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBestseller}
                    onChange={(e) => setIsBestseller(e.target.checked)}
                    className="w-4 h-4 text-orange-600 rounded"
                  />
                  <span className="text-xs font-bold text-slate-800">★ Bestseller</span>
                </label>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Dish Description
                </label>
                <textarea
                  rows={2}
                  value={dishDescription}
                  onChange={(e) => setDishDescription(e.target.value)}
                  placeholder="Describe ingredients and flavors..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-orange-500 text-xs text-slate-900 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Dish Image (URL or Select Preset)
                </label>
                <input
                  type="text"
                  value={dishImage}
                  onChange={(e) => setDishImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-orange-500 text-xs text-slate-800 outline-none mb-2"
                />
                
                <div className="flex flex-wrap gap-1.5">
                  {imagePresets.map(preset => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setDishImage(preset.url)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                        dishImage === preset.url
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-orange-500/30 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish Food Item to foodRo Menu</span>
              </button>
            </form>
          )}

          {/* TAB 2: REGISTER RESTAURANT */}
          {activeTab === 'add_restaurant' && (
            <form onSubmit={handleAddRestaurantSubmit} className="space-y-3.5 sm:space-y-4">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Register a hotel or kitchen to start listing specialized menus.</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Restaurant / Hotel Name *
                </label>
                <input
                  type="text"
                  required
                  value={restName}
                  onChange={(e) => setRestName(e.target.value)}
                  placeholder="e.g. Royal Momo Hub, Oberoi Gourmet..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-orange-500 text-xs font-semibold text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Cuisines Offered *
                </label>
                <input
                  type="text"
                  required
                  value={restCuisine}
                  onChange={(e) => setRestCuisine(e.target.value)}
                  placeholder="e.g. Himalayan Momos, Tibetan Thukpa, Pizza"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-orange-500 text-xs text-slate-900 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Location / Address
                  </label>
                  <input
                    type="text"
                    value={restLocation}
                    onChange={(e) => setRestLocation(e.target.value)}
                    placeholder="e.g. Sector 18, Connaught Place"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-orange-500 text-xs text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Avg Delivery Time
                  </label>
                  <input
                    type="text"
                    value={restDeliveryTime}
                    onChange={(e) => setRestDeliveryTime(e.target.value)}
                    placeholder="e.g. 20-25 min"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-orange-500 text-xs text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Banner Image URL
                </label>
                <input
                  type="text"
                  value={restImage}
                  onChange={(e) => setRestImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-orange-500 text-xs text-slate-800 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                <span>Register Restaurant Partner</span>
              </button>
            </form>
          )}

          {/* TAB 3: MANAGE */}
          {activeTab === 'manage' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-900">
                  Total Food Items: {foodItems.length}
                </span>
                <button
                  onClick={() => setActiveTab('add_dish')}
                  className="text-xs font-bold text-orange-600 hover:underline cursor-pointer"
                >
                  + Add Another
                </button>
              </div>

              <div className="space-y-2">
                {foodItems.map(item => (
                  <div 
                    key={item.id}
                    className="p-2.5 sm:p-3 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-2.5"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate">{item.restaurant.name}</p>
                      <span className="text-xs font-extrabold text-orange-600">
                        {formatCurrency(item.price, currency)}
                      </span>
                    </div>

                    <button
                      onClick={() => onDeleteFoodItem(item.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                      title="Delete dish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
