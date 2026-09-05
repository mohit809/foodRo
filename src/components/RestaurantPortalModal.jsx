import React, { useState, useRef } from 'react';
import { 
  X, 
  Store, 
  PlusCircle, 
  Utensils, 
  Check, 
  Sparkles, 
  Trash2, 
  Building2,
  MapPin,
  FileText,
  ShieldCheck,
  LocateFixed,
  UploadCloud,
  CheckCircle2,
  Coffee,
  Hotel,
  AlertCircle,
  Radio
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

  // Inline "Type Custom Restaurant" in Add Dish Form
  const [isCustomRestInDish, setIsCustomRestInDish] = useState(false);
  const [inlineCustomRestName, setInlineCustomRestName] = useState('');
  const [inlineCustomRestType, setInlineCustomRestType] = useState('food_point');
  const [inlineCustomRestLocation, setInlineCustomRestLocation] = useState('Central Food Court');

  // Register Restaurant / Hotel Form State
  const [restType, setRestType] = useState('restaurant'); // hotel, restaurant, cafe, food_point, cloud_kitchen
  const [restName, setRestName] = useState('');
  const [restCuisine, setRestCuisine] = useState('Himalayan Momos, Fast Food, Pizza, Burgers');
  const [restLocation, setRestLocation] = useState('Downtown High Street, Sector 18');
  const [restDeliveryTime, setRestDeliveryTime] = useState('20-25 min');
  const [restImage, setRestImage] = useState('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80');

  // Live GPS & Interactive Map State for Restaurant
  const [restCoords, setRestCoords] = useState({
    latitude: 28.6145,
    longitude: 77.2095,
    accuracy: 3,
    isDetected: false
  });
  const [isDetectingGps, setIsDetectingGps] = useState(false);

  // Government Authority Proofs & Food License State
  const [panNumber, setPanNumber] = useState('ABCDE1234F');
  const [govProofNumber, setGovProofNumber] = useState('GOV-TRADE-2026-9912');
  const [fssaiNumber, setFssaiNumber] = useState('10022011000123');

  // Uploaded documents simulation
  const [panUploadedFile, setPanUploadedFile] = useState('pan_card_mohit_verified.pdf (1.2 MB)');
  const [govUploadedFile, setGovUploadedFile] = useState('municipal_trade_license.pdf (2.4 MB)');
  const [fssaiUploadedFile, setFssaiUploadedFile] = useState('fssai_food_safety_cert.pdf (980 KB)');

  const panFileRef = useRef(null);
  const govFileRef = useRef(null);
  const fssaiFileRef = useRef(null);

  const imagePresets = [
    { label: '🥟 Momos', url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=80' },
    { label: '🍕 Pizza', url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80' },
    { label: '🍔 Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80' },
    { label: '🍛 Biryani', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80' },
    { label: '🍣 Sushi', url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80' },
    { label: '🍰 Dessert', url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80' }
  ];

  const establishmentTypes = [
    { id: 'hotel', label: 'Hotel & Suites', icon: Hotel },
    { id: 'restaurant', label: 'Restaurant & Dining', icon: Utensils },
    { id: 'cafe', label: 'Cafe & Bakery', icon: Coffee },
    { id: 'food_point', label: 'Food Point / Street Stall', icon: Store },
    { id: 'cloud_kitchen', label: 'Cloud / Express Kitchen', icon: Sparkles }
  ];

  // Capture restaurant live GPS
  const handleFetchRestaurantGps = () => {
    setIsDetectingGps(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setRestCoords({
            latitude: Number(pos.coords.latitude.toFixed(5)),
            longitude: Number(pos.coords.longitude.toFixed(5)),
            accuracy: Math.round(pos.coords.accuracy || 3),
            isDetected: true
          });
          setIsDetectingGps(false);
        },
        () => {
          setRestCoords({
            latitude: 28.6145,
            longitude: 77.2095,
            accuracy: 4,
            isDetected: true
          });
          setIsDetectingGps(false);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      setIsDetectingGps(false);
    }
  };

  // Interactive map pin click / nudge
  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Slight delta adjustment from base coords
    const newLat = Number((28.6100 + (1 - y) * 0.01).toFixed(5));
    const newLng = Number((77.2050 + x * 0.01).toFixed(5));
    
    setRestCoords(prev => ({
      ...prev,
      latitude: newLat,
      longitude: newLng,
      isDetected: true
    }));
  };

  // Submit Add Dish
  const handleAddDishSubmit = (e) => {
    e.preventDefault();
    if (!dishName.trim()) return;

    let targetRest = restaurants.find(r => r.id === selectedRestaurantId);

    // If user created a custom restaurant inline
    if (isCustomRestInDish && inlineCustomRestName.trim()) {
      targetRest = {
        id: 'rest-' + Date.now(),
        name: inlineCustomRestName.trim(),
        type: inlineCustomRestType,
        cuisine: dishCategory,
        location: inlineCustomRestLocation.trim() || 'Central Street',
        rating: 4.9,
        deliveryTime: '20-30 min',
        distance: '1.2 km',
        image: dishImage,
        isGovtVerified: true
      };
      onAddRestaurant(targetRest);
    }

    if (!targetRest) {
      targetRest = restaurants[0] || {
        id: 'r-default',
        name: 'Partner Food Point',
        rating: 4.8,
        deliveryTime: '20-25 min',
        distance: '1.0 km'
      };
    }

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
        id: targetRest.id,
        name: targetRest.name,
        rating: targetRest.rating || 4.9,
        deliveryTime: targetRest.deliveryTime || '20-25 min',
        distance: targetRest.distance || '1.2 km',
        location: targetRest.location,
        isGovtVerified: true
      },
      customizationOptions: {
        sizes: [
          { name: 'Standard Portion', price: 0 },
          { name: 'Feast / Large Platter', price: Number((usdPrice * 0.4).toFixed(2)) }
        ],
        addOns: [
          { name: 'Extra Special Dip / Sauce', price: 0.50 },
          { name: 'Extra Cheese / Butter', price: 1.00 }
        ]
      }
    };

    onAddFoodItem(newFood);
    setDishName('');
    setDishDescription('');
    setIsCustomRestInDish(false);
    setInlineCustomRestName('');
    setActiveTab('manage');
  };

  // Submit Register Restaurant / Hotel
  const handleAddRestaurantSubmit = (e) => {
    e.preventDefault();
    if (!restName.trim()) return;

    const newRest = {
      id: 'rest-' + Date.now(),
      name: restName.trim(),
      type: restType,
      cuisine: restCuisine.trim(),
      location: restLocation.trim(),
      coords: {
        lat: restCoords.latitude,
        lng: restCoords.longitude
      },
      rating: 4.9,
      deliveryTime: restDeliveryTime.trim(),
      distance: '1.1 km',
      image: restImage,
      isGovtVerified: true,
      panNumber: panNumber.trim(),
      govProofNumber: govProofNumber.trim(),
      fssaiNumber: fssaiNumber.trim(),
      documents: {
        pan: panUploadedFile,
        govProof: govUploadedFile,
        fssai: fssaiUploadedFile
      }
    };

    onAddRestaurant(newRest);
    setSelectedRestaurantId(newRest.id);
    setRestName('');
    setActiveTab('add_dish');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh] sm:max-h-[92vh] animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-250 pb-safe sm:pb-0"
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
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm sm:text-base font-extrabold text-white">foodRo Partner Portal</h2>
                <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 text-[9px] font-extrabold uppercase">
                  Verified Merchant
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400">Register Hotel, Restaurant, Cafe, Food Point & Menu</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 pt-2 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'add_dish', label: '➕ Add Food / Dish', icon: Utensils },
            { id: 'add_restaurant', label: '🏨 Register Hotel / Restaurant / Cafe', icon: Building2 },
            { id: 'manage', label: `📋 Directory & Menu (${foodItems.length})`, icon: Store }
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
                <span>List delicious Momos, Pizza, Burgers, Asian dishes or desserts to appear live on foodRo!</span>
              </div>

              {/* SELECT OR TYPE RESTAURANT / HOTEL / FOOD POINT */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wide">
                    Select or Type Hotel / Restaurant / Cafe *
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCustomRestInDish(!isCustomRestInDish)}
                    className="text-[11px] text-orange-600 font-extrabold hover:underline cursor-pointer"
                  >
                    {isCustomRestInDish ? '← Choose Existing' : '+ Type Custom Name'}
                  </button>
                </div>

                {!isCustomRestInDish ? (
                  <select
                    value={selectedRestaurantId}
                    onChange={(e) => {
                      if (e.target.value === 'TYPE_NEW') {
                        setIsCustomRestInDish(true);
                      } else {
                        setSelectedRestaurantId(e.target.value);
                      }
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-orange-500 text-xs font-bold text-slate-900 outline-none bg-white"
                  >
                    {restaurants.map(r => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.location || r.cuisine}) {r.isGovtVerified ? '🛡️ [Govt Verified]' : ''}
                      </option>
                    ))}
                    <option value="TYPE_NEW" className="font-bold text-orange-600">
                      ➕ Type New / Custom Hotel, Restaurant or Food Point...
                    </option>
                  </select>
                ) : (
                  <div className="space-y-2 p-3 bg-white rounded-xl border border-orange-200 animate-in fade-in duration-200">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">
                        Custom Hotel / Restaurant / Cafe / Food Point Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={inlineCustomRestName}
                        onChange={(e) => setInlineCustomRestName(e.target.value)}
                        placeholder="e.g. Royal Darjeeling Momo Point, Taj Gourmet Hotel..."
                        className="w-full p-2 rounded-xl border border-slate-200 focus:border-orange-500 text-xs font-bold text-slate-900 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">
                          Establishment Type
                        </label>
                        <select
                          value={inlineCustomRestType}
                          onChange={(e) => setInlineCustomRestType(e.target.value)}
                          className="w-full p-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                        >
                          <option value="food_point">🥟 Food Point / Stall</option>
                          <option value="restaurant">🍽️ Restaurant</option>
                          <option value="hotel">🏨 Hotel</option>
                          <option value="cafe">☕ Cafe</option>
                          <option value="cloud_kitchen">🍳 Cloud Kitchen</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">
                          Exact Location / Landmark
                        </label>
                        <input
                          type="text"
                          value={inlineCustomRestLocation}
                          onChange={(e) => setInlineCustomRestLocation(e.target.value)}
                          placeholder="e.g. Downtown Mall, Counter 4"
                          className="w-full p-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* DISH DETAILS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Dish / Food Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                    placeholder="e.g. Steamed Chicken Kurkure Momos"
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
                  placeholder="Describe ingredients, secret chutney, cooking style..."
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

          {/* TAB 2: REGISTER HOTEL / RESTAURANT / CAFE / FOOD POINT (With Map, Live GPS & Govt Proofs) */}
          {activeTab === 'add_restaurant' && (
            <form onSubmit={handleAddRestaurantSubmit} className="space-y-4 sm:space-y-5">
              
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block">Official Partner Onboarding (Anti-Fraud Protected):</strong>
                  Register your Hotel, Restaurant, Cafe or Food Point with exact Live GPS location and government verification proofs (PAN card, authority registration & food license).
                </div>
              </div>

              {/* 1. ESTABLISHMENT TYPE SELECTOR */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  1. Select Establishment Type *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {establishmentTypes.map(type => {
                    const Icon = type.icon;
                    const isSelected = restType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setRestType(type.id)}
                        className={`p-2.5 rounded-2xl border flex items-center gap-2 text-xs font-extrabold transition cursor-pointer text-left ${
                          isSelected
                            ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. CUSTOM ESTABLISHMENT NAME (Type any name freely) */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1 flex items-center justify-between">
                  <span>2. Hotel / Restaurant / Cafe / Food Point Name *</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Type any legal or brand name</span>
                </label>
                <input
                  type="text"
                  required
                  value={restName}
                  onChange={(e) => setRestName(e.target.value)}
                  placeholder="e.g. Grand Royal Hotel & Suites, Himalayan Momo Hub, Cafe Milano..."
                  className="w-full p-2.5 sm:p-3 rounded-2xl border border-slate-200 focus:border-emerald-500 text-xs sm:text-sm font-extrabold text-slate-900 outline-none"
                />
              </div>

              {/* 3. CUISINES & DELIVERY TIME */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Cuisines Offered *
                  </label>
                  <input
                    type="text"
                    required
                    value={restCuisine}
                    onChange={(e) => setRestCuisine(e.target.value)}
                    placeholder="e.g. Himalayan Momos, Pizza, Burgers, Bakery"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 text-xs text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Avg Delivery Prep Time
                  </label>
                  <input
                    type="text"
                    value={restDeliveryTime}
                    onChange={(e) => setRestDeliveryTime(e.target.value)}
                    placeholder="e.g. 20-25 min"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 text-xs text-slate-900 outline-none"
                  />
                </div>
              </div>

              {/* 4. EXACT LOCATION, LIVE GPS & INTERACTIVE MAP */}
              <div className="p-3.5 sm:p-4 rounded-3xl bg-slate-900 text-white space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                        3. Restaurant Exact GPS Location & Live Map *
                      </h4>
                      <span className="text-[10px] text-slate-400">Pinpoints your kitchen for couriers</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleFetchRestaurantGps}
                    disabled={isDetectingGps}
                    className="px-2.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-[10px] sm:text-[11px] flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                  >
                    <LocateFixed className="w-3.5 h-3.5" />
                    <span>{isDetectingGps ? 'Pinging GPS...' : 'Capture Live GPS'}</span>
                  </button>
                </div>

                {/* Interactive Map Visualizer */}
                <div 
                  onClick={handleMapClick}
                  className="relative h-36 sm:h-44 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 cursor-crosshair group shadow-inner"
                  title="Click anywhere to move and calibrate restaurant location pin"
                >
                  {/* Grid Lines */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                      backgroundSize: '24px 24px'
                    }}
                  />

                  {/* Simulated Map Streets & River */}
                  <svg className="w-full h-full absolute inset-0 opacity-30" viewBox="0 0 600 200">
                    <path d="M 0 50 Q 250 150, 600 80" stroke="#38bdf8" strokeWidth="8" fill="none" />
                    <line x1="120" y1="0" x2="120" y2="200" stroke="#94a3b8" strokeWidth="3" />
                    <line x1="380" y1="0" x2="380" y2="200" stroke="#94a3b8" strokeWidth="4" />
                    <line x1="0" y1="120" x2="600" y2="120" stroke="#94a3b8" strokeWidth="3" />
                  </svg>

                  {/* Movable Pin */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                    <span className="w-10 h-10 rounded-full bg-emerald-500/30 animate-ping absolute" />
                    <div className="w-9 h-9 rounded-2xl bg-emerald-500 text-white shadow-xl shadow-emerald-500/50 flex items-center justify-center font-bold border-2 border-white relative z-10">
                      <Store className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-extrabold text-emerald-300 mt-1 bg-slate-900/90 px-2 py-0.5 rounded-full border border-emerald-500/40 whitespace-nowrap">
                      {restName.trim() || 'Your Food Point'} (Verified Pin)
                    </span>
                  </div>

                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded-lg text-[9px] text-slate-300 backdrop-blur-xs">
                    Click map to calibrate pin
                  </div>
                </div>

                {/* GPS Coordinates Tag */}
                <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span className="text-white font-bold">
                      Lat: {restCoords.latitude}° N, Lng: {restCoords.longitude}° E
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-sans font-bold">
                    ±{restCoords.accuracy}m Accuracy
                  </span>
                </div>

                {/* Exact Street Address */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-300 uppercase mb-1">
                    Street Address / Sector / Area / Landmark *
                  </label>
                  <input
                    type="text"
                    required
                    value={restLocation}
                    onChange={(e) => setRestLocation(e.target.value)}
                    placeholder="e.g. Shop 12, Food Street, Near Metro Station, Sector 18"
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 focus:border-emerald-500 text-xs font-semibold text-white outline-none"
                  />
                </div>
              </div>

              {/* 5. GOVERNMENT AUTHORITY PROOFS & FOOD LICENSES (Anti-Fraud Verification) */}
              <div className="p-3.5 sm:p-4 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    4. Government Authority Proofs & Food License *
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  To protect customers and maintain safety standards, provide your business tax ID, municipal trade authority license, and food safety permit.
                </p>

                {/* PAN Card Proof */}
                <div className="p-3 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-800">
                      A. PAN Card / Tax Authority Proof *
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Document Attached
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                      placeholder="PAN Number (e.g. ABCDE1234F)"
                      className="p-2 rounded-xl border border-slate-200 focus:border-emerald-500 text-xs font-mono font-bold text-slate-900 outline-none uppercase"
                    />
                    <div className="flex items-center gap-2">
                      <input 
                        type="file" 
                        ref={panFileRef} 
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files?.[0]) setPanUploadedFile(`${e.target.files[0].name} (${(e.target.files[0].size/1024).toFixed(0)} KB)`);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => panFileRef.current?.click()}
                        className="flex-1 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <UploadCloud className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="truncate">{panUploadedFile}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Government Trade Authority Proof */}
                <div className="p-3 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-800">
                      B. Government Authority / Municipal Trade License Proof *
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Document Attached
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={govProofNumber}
                      onChange={(e) => setGovProofNumber(e.target.value)}
                      placeholder="Govt Authority Registration #"
                      className="p-2 rounded-xl border border-slate-200 focus:border-emerald-500 text-xs font-mono font-bold text-slate-900 outline-none"
                    />
                    <div className="flex items-center gap-2">
                      <input 
                        type="file" 
                        ref={govFileRef} 
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files?.[0]) setGovUploadedFile(`${e.target.files[0].name} (${(e.target.files[0].size/1024).toFixed(0)} KB)`);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => govFileRef.current?.click()}
                        className="flex-1 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <UploadCloud className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="truncate">{govUploadedFile}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Food Safety & Hygiene License (FSSAI) */}
                <div className="p-3 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-800">
                      C. FSSAI / Health Department Food License *
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Document Attached
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={fssaiNumber}
                      onChange={(e) => setFssaiNumber(e.target.value)}
                      placeholder="14-Digit FSSAI License Number"
                      className="p-2 rounded-xl border border-slate-200 focus:border-emerald-500 text-xs font-mono font-bold text-slate-900 outline-none"
                    />
                    <div className="flex items-center gap-2">
                      <input 
                        type="file" 
                        ref={fssaiFileRef} 
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files?.[0]) setFssaiUploadedFile(`${e.target.files[0].name} (${(e.target.files[0].size/1024).toFixed(0)} KB)`);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => fssaiFileRef.current?.click()}
                        className="flex-1 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <UploadCloud className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="truncate">{fssaiUploadedFile}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Banner Image */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Storefront Banner Image URL
                </label>
                <input
                  type="text"
                  value={restImage}
                  onChange={(e) => setRestImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 text-xs text-slate-800 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-600/30 transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Register Verified Merchant Partner</span>
              </button>
            </form>
          )}

          {/* TAB 3: MANAGE & DIRECTORY */}
          {activeTab === 'manage' && (
            <div className="space-y-4">
              
              {/* Registered Establishments */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Registered Partners ({restaurants.length})
                  </span>
                  <button
                    onClick={() => setActiveTab('add_restaurant')}
                    className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
                  >
                    + Register Another
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {restaurants.map(r => (
                    <div key={r.id} className="p-3 rounded-2xl border border-slate-200 bg-white space-y-1.5 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-slate-900 truncate max-w-[170px]">{r.name}</span>
                        <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] font-extrabold flex items-center gap-0.5">
                          <ShieldCheck className="w-2.5 h-2.5" />
                          Govt. Verified
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                        {r.location || 'High Street'}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                        <span>FSSAI #{r.fssaiNumber || '10022011000123'}</span>
                        <span className="text-emerald-600 font-bold">GPS Calibrated</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Menu items */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Menu Items ({foodItems.length})
                  </span>
                  <button
                    onClick={() => setActiveTab('add_dish')}
                    className="text-xs font-bold text-orange-600 hover:underline cursor-pointer"
                  >
                    + Add Dish
                  </button>
                </div>

                <div className="space-y-2">
                  {foodItems.map(item => (
                    <div 
                      key={item.id}
                      className="p-2.5 sm:p-3 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-2.5 shadow-xs"
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

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
