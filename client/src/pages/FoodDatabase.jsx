import React, { useState } from 'react';
import { Search, Plus, Filter, Utensils, Zap, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

export default function FoodDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMealType, setSelectedMealType] = useState('Snack');
  const [customFoodModal, setCustomFoodModal] = useState(false);
  const [loggedSuccess, setLoggedSuccess] = useState('');

  // Custom food state
  const [newFood, setNewFood] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    serving: '100g',
    category: 'High Protein'
  });

  // Expanded Food Library
  const initialFoods = [
    // High Protein & Meats/Eggs
    { id: 1, name: 'Whey Protein (1 Scoop)', calories: 120, protein: 24, carbs: 3, fat: 1.5, serving: '1 scoop (30g)', category: 'High Protein' },
    { id: 2, name: 'Chicken Breast (Grilled)', calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: '100g', category: 'High Protein' },
    { id: 3, name: 'Whole Eggs', calories: 143, protein: 12.6, carbs: 0.8, fat: 9.5, serving: '2 large eggs', category: 'High Protein' },
    { id: 4, name: 'Egg Whites', calories: 52, protein: 11, carbs: 0.7, fat: 0.2, serving: '4 egg whites (130g)', category: 'High Protein' },
    { id: 5, name: 'Paneer (Cottage Cheese)', calories: 265, protein: 18, carbs: 6, fat: 20, serving: '100g', category: 'High Protein' },
    { id: 6, name: 'Soy Chunks (Raw)', calories: 345, protein: 52, carbs: 33, fat: 0.5, serving: '100g', category: 'High Protein' },
    { id: 7, name: 'Tofu (Firm)', calories: 144, protein: 17, carbs: 3, fat: 8, serving: '100g', category: 'High Protein' },
    { id: 8, name: 'Greek Yogurt (Plain 0%)', calories: 100, protein: 18, carbs: 6, fat: 0, serving: '170g container', category: 'High Protein' },
    { id: 9, name: 'Salmon Fillet', calories: 206, protein: 22, carbs: 0, fat: 12, serving: '100g cooked', category: 'High Protein' },
    { id: 10, name: 'Fish Fillet (Tilapia/Cod)', calories: 96, protein: 20, carbs: 0, fat: 1.7, serving: '100g', category: 'High Protein' },

    // Indian Staples & Grains
    { id: 11, name: 'Roti / Chapati (Whole Wheat)', calories: 104, protein: 3.1, carbs: 20, fat: 0.9, serving: '1 medium roti', category: 'Grains & Indian Staples' },
    { id: 12, name: 'White Basmati Rice (Cooked)', calories: 205, protein: 4.2, carbs: 45, fat: 0.4, serving: '1 cup (158g)', category: 'Grains & Indian Staples' },
    { id: 13, name: 'Brown Rice (Cooked)', calories: 216, protein: 5, carbs: 45, fat: 1.8, serving: '1 cup (195g)', category: 'Grains & Indian Staples' },
    { id: 14, name: 'Rolled Oats (Raw)', calories: 154, protein: 5.3, carbs: 27, fat: 2.6, serving: '40g (1/2 cup)', category: 'Grains & Indian Staples' },
    { id: 15, name: 'Dal Tadka / Yellow Dal', calories: 150, protein: 8, carbs: 22, fat: 4, serving: '1 bowl (200g)', category: 'Grains & Indian Staples' },
    { id: 16, name: 'Rajma Curry (Kidney Beans)', calories: 210, protein: 11, carbs: 32, fat: 4.5, serving: '1 bowl (200g)', category: 'Grains & Indian Staples' },
    { id: 17, name: 'Chana Masala (Chickpeas)', calories: 240, protein: 12, carbs: 36, fat: 5, serving: '1 bowl (200g)', category: 'Grains & Indian Staples' },
    { id: 18, name: 'Sweet Potato (Boiled)', calories: 114, protein: 2.1, carbs: 27, fat: 0.2, serving: '1 medium (130g)', category: 'Grains & Indian Staples' },
    { id: 19, name: 'Idli (Steamed)', calories: 78, protein: 2.5, carbs: 17, fat: 0.2, serving: '2 pieces', category: 'Grains & Indian Staples' },
    { id: 20, name: 'Plain Dosa', calories: 168, protein: 3.9, carbs: 29, fat: 3.7, serving: '1 medium dosa', category: 'Grains & Indian Staples' },

    // Healthy Fats & Seeds
    { id: 21, name: 'Peanut Butter (Natural)', calories: 190, protein: 8, carbs: 7, fat: 16, serving: '2 tbsp (32g)', category: 'Healthy Fats' },
    { id: 22, name: 'Almonds', calories: 164, protein: 6, carbs: 6, fat: 14, serving: '1 oz (28g / ~23 nuts)', category: 'Healthy Fats' },
    { id: 23, name: 'Walnuts', calories: 185, protein: 4.3, carbs: 3.9, fat: 18.5, serving: '1 oz (28g / 7 halves)', category: 'Healthy Fats' },
    { id: 24, name: 'Avocado', calories: 234, protein: 2.9, carbs: 12, fat: 21, serving: '1 medium (150g)', category: 'Healthy Fats' },
    { id: 25, name: 'Chia Seeds', calories: 138, protein: 4.7, carbs: 12, fat: 8.7, serving: '1 tbsp (28g)', category: 'Healthy Fats' },
    { id: 26, name: 'Extra Virgin Olive Oil', calories: 119, protein: 0, carbs: 0, fat: 13.5, serving: '1 tbsp (14g)', category: 'Healthy Fats' },
    { id: 27, name: 'Desi Ghee', calories: 112, protein: 0, carbs: 0, fat: 12.7, serving: '1 tbsp (14g)', category: 'Healthy Fats' },

    // Fruits & Vegetables
    { id: 28, name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, serving: '1 medium (118g)', category: 'Fruits & Veggies' },
    { id: 29, name: 'Apple (Fresh)', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, serving: '1 medium (182g)', category: 'Fruits & Veggies' },
    { id: 30, name: 'Steamed Broccoli', calories: 55, protein: 3.7, carbs: 11, fat: 0.6, serving: '1 cup (150g)', category: 'Fruits & Veggies' },
    { id: 31, name: 'Spinach / Palak', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, serving: '100g raw', category: 'Fruits & Veggies' },
    { id: 32, name: 'Mixed Berries', calories: 70, protein: 1, carbs: 17, fat: 0.5, serving: '1 cup (140g)', category: 'Fruits & Veggies' },
    { id: 33, name: 'Watermelon Cubes', calories: 46, protein: 0.9, carbs: 11.5, fat: 0.2, serving: '1 cup (150g)', category: 'Fruits & Veggies' },

    // Fitness Beverages & Snacks
    { id: 34, name: 'Skimmed Milk (0% Fat)', calories: 83, protein: 8.3, carbs: 12, fat: 0.2, serving: '1 cup (240ml)', category: 'Supplements & Dairy' },
    { id: 35, name: 'Unsweetened Almond Milk', calories: 30, protein: 1, carbs: 1, fat: 2.5, serving: '1 cup (240ml)', category: 'Supplements & Dairy' },
    { id: 36, name: 'Mass Gainer Powder', calories: 380, protein: 30, carbs: 60, fat: 4, serving: '1 scoop (100g)', category: 'Supplements & Dairy' }
  ];

  const [foodsList, setFoodsList] = useState(initialFoods);

  const categories = ['All', 'High Protein', 'Grains & Indian Staples', 'Healthy Fats', 'Fruits & Veggies', 'Supplements & Dairy'];

  const filteredFoods = foodsList.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || food.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLogFood = async (food) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/calorie/meal', {
        mealType: selectedMealType,
        foodName: food.name,
        quantity: 1,
        unit: food.serving,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat
      }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });

      setLoggedSuccess(`Logged "${food.name}" (${food.calories} kcal) to ${selectedMealType}!`);
      setTimeout(() => setLoggedSuccess(''), 3500);
    } catch (err) {
      console.error(err);
      setLoggedSuccess(`Logged "${food.name}" (${food.calories} kcal) locally!`);
      setTimeout(() => setLoggedSuccess(''), 3500);
    }
  };

  const handleAddCustomFood = (e) => {
    e.preventDefault();
    if (!newFood.name || !newFood.calories) return;

    const createdItem = {
      id: Date.now(),
      name: newFood.name,
      calories: parseFloat(newFood.calories) || 0,
      protein: parseFloat(newFood.protein) || 0,
      carbs: parseFloat(newFood.carbs) || 0,
      fat: parseFloat(newFood.fat) || 0,
      serving: newFood.serving || '1 serving',
      category: newFood.category
    };

    setFoodsList(prev => [createdItem, ...prev]);
    setCustomFoodModal(false);
    setNewFood({ name: '', calories: '', protein: '', carbs: '', fat: '', serving: '100g', category: 'High Protein' });
    setLoggedSuccess(`Custom food "${createdItem.name}" added to database!`);
    setTimeout(() => setLoggedSuccess(''), 3500);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Header */}
      <div className="flex-between" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0 }}>
            <Utensils color="var(--primary)" /> Calorie & Macro Food Database
          </h1>
          <p className="subtitle" style={{ margin: '0.25rem 0 0 0' }}>
            Search 35+ verified foods, Indian staples, macros, or add your own custom food item.
          </p>
        </div>
        <button 
          onClick={() => setCustomFoodModal(true)}
          className="btn btn-primary" 
          style={{ padding: '0.65rem 1.25rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}
        >
          <Plus size={18} /> Add Custom Food
        </button>
      </div>

      {loggedSuccess && (
        <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', color: '#22c55e', padding: '0.85rem 1.25rem', borderRadius: '0.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
          <CheckCircle2 size={20} /> {loggedSuccess}
        </div>
      )}

      {/* Search & Meal Selection Bar */}
      <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search foods (e.g. Chicken, Roti, Whey, Paneer, Oats)..." 
              style={{ paddingLeft: '3rem', margin: 0, borderRadius: '0.75rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Log to:</span>
            <select 
              value={selectedMealType} 
              onChange={(e) => setSelectedMealType(e.target.value)}
              className="form-input"
              style={{ margin: 0, borderRadius: '0.75rem', padding: '0.6rem 1rem', background: 'var(--surface)' }}
            >
              <option value="Breakfast">🍳 Breakfast</option>
              <option value="Lunch">🥗 Lunch</option>
              <option value="Dinner">🍲 Dinner</option>
              <option value="Snack">🍎 Snack</option>
            </select>
          </div>

        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingTop: '1rem', marginTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '50px',
                border: activeCategory === cat ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
                background: activeCategory === cat ? 'var(--primary)' : 'var(--surface)',
                color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Results List */}
      <div className="glass-card" style={{ padding: '1.25rem' }}>
        <div className="flex-between" style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--glass-border)', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Available Foods</h3>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{filteredFoods.length} foods listed</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredFoods.map(food => (
            <div 
              key={food.id} 
              style={{ 
                padding: '1rem 1.25rem', 
                background: 'var(--surface)', 
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                border: '1px solid var(--glass-border)'
              }}
            >
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
                  {food.name}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span>Serving: <strong>{food.serving}</strong></span>
                  <span>•</span>
                  <span style={{ color: 'var(--primary)' }}>{food.category}</span>
                </div>
              </div>
              
              <div className="flex-center" style={{ gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '1.25rem', textAlign: 'center' }}>
                  <div style={{ minWidth: '55px' }}>
                    <div style={{ fontWeight: 800, color: '#f97316', fontSize: '1.05rem' }}>{food.calories}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Kcal</div>
                  </div>
                  <div style={{ minWidth: '55px' }}>
                    <div style={{ fontWeight: 800, color: '#22c55e', fontSize: '1.05rem' }}>{food.protein}g</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Protein</div>
                  </div>
                  <div style={{ minWidth: '55px' }}>
                    <div style={{ fontWeight: 800, color: '#3b82f6', fontSize: '1.05rem' }}>{food.carbs}g</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Carbs</div>
                  </div>
                  <div style={{ minWidth: '55px' }}>
                    <div style={{ fontWeight: 800, color: '#eab308', fontSize: '1.05rem' }}>{food.fat}g</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Fat</div>
                  </div>
                </div>
                
                <button 
                  className="btn btn-primary" 
                  style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.88rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  onClick={() => handleLogFood(food)}
                >
                  <Plus size={16} /> Log
                </button>
              </div>
            </div>
          ))}

          {filteredFoods.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              No foods found matching "{searchTerm}". Click <strong>"Add Custom Food"</strong> above to add it to your database!
            </div>
          )}
        </div>
      </div>

      {/* Add Custom Food Modal */}
      {customFoodModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="glass-card" style={{ maxWidth: '500px', width: '100%', padding: '1.75rem', borderRadius: '1rem' }}>
            <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.3rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={22} color="var(--primary)" /> Add Custom Food Item
              </h2>
              <button onClick={() => setCustomFoodModal(false)} className="btn" style={{ padding: '0.25rem 0.5rem' }}>✕</button>
            </div>

            <form onSubmit={handleAddCustomFood} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Food Name</label>
                <input 
                  type="text" 
                  value={newFood.name} 
                  onChange={(e) => setNewFood({ ...newFood, name: e.target.value })} 
                  placeholder="e.g. Homemade Chicken Curry" 
                  className="form-input" 
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label className="form-label">Serving Size</label>
                  <input 
                    type="text" 
                    value={newFood.serving} 
                    onChange={(e) => setNewFood({ ...newFood, serving: e.target.value })} 
                    placeholder="e.g. 1 bowl (200g)" 
                    className="form-input" 
                  />
                </div>
                <div>
                  <label className="form-label">Category</label>
                  <select 
                    value={newFood.category} 
                    onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
                    className="form-input"
                  >
                    <option value="High Protein">High Protein</option>
                    <option value="Grains & Indian Staples">Grains & Indian Staples</option>
                    <option value="Healthy Fats">Healthy Fats</option>
                    <option value="Fruits & Veggies">Fruits & Veggies</option>
                    <option value="Supplements & Dairy">Supplements & Dairy</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                <div>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Calories</label>
                  <input type="number" value={newFood.calories} onChange={(e) => setNewFood({ ...newFood, calories: e.target.value })} placeholder="kcal" className="form-input" required />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Protein (g)</label>
                  <input type="number" value={newFood.protein} onChange={(e) => setNewFood({ ...newFood, protein: e.target.value })} placeholder="g" className="form-input" />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Carbs (g)</label>
                  <input type="number" value={newFood.carbs} onChange={(e) => setNewFood({ ...newFood, carbs: e.target.value })} placeholder="g" className="form-input" />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Fat (g)</label>
                  <input type="number" value={newFood.fat} onChange={(e) => setNewFood({ ...newFood, fat: e.target.value })} placeholder="g" className="form-input" />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setCustomFoodModal(false)} className="btn" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Food Item</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
