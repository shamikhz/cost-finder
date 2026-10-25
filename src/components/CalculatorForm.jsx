import React, { useState, useEffect } from 'react';
import {
  Tv,
  Apple,
  Zap,
  Dumbbell,
  PlusCircle,
  Plus,
  Check,
  RotateCcw,
  Sparkles,
  Info,
} from 'lucide-react';
import { EXPENSE_CATEGORIES } from '../data/categories';
import { validateExpenseItem } from '../utils/validation';
import { getCurrencySymbol, getDefaultTariff } from '../utils/currency';

const CATEGORY_ICONS = {
  subscriptions: Tv,
  food_waste: Apple,
  electricity: Zap,
  memberships: Dumbbell,
  custom: PlusCircle,
};

export default function CalculatorForm({
  currency,
  editingItem,
  onSaveItem,
  onCancelEdit,
}) {
  const [category, setCategory] = useState(editingItem?.category || 'subscriptions');
  const [formData, setFormData] = useState(getInitialState(category, currency));
  const [errors, setErrors] = useState({});
  const [showPresets, setShowPresets] = useState(false);

  const currencySymbol = getCurrencySymbol(currency);
  const defaultTariff = getDefaultTariff(currency);

  function getInitialState(cat, curr) {
    const tariff = getDefaultTariff(curr);
    switch (cat) {
      case 'subscriptions':
        return {
          name: '',
          category: 'subscriptions',
          price: '',
          frequency: 'monthly',
          unusedPercent: 100,
          quantity: 1,
          notes: '',
        };
      case 'food_waste':
        return {
          name: '',
          category: 'food_waste',
          unitCost: '',
          quantity: 1,
          frequency: 'weekly',
          notes: '',
        };
      case 'electricity':
        return {
          name: '',
          category: 'electricity',
          watts: '',
          quantity: 1,
          standbyHours: 20,
          tariff: tariff,
          daysPerYear: 365,
          notes: '',
        };
      case 'memberships':
        return {
          name: '',
          category: 'memberships',
          fee: '',
          frequency: 'monthly',
          unusedPercent: 75,
          quantity: 1,
          notes: '',
        };
      case 'custom':
      default:
        return {
          name: '',
          category: 'custom',
          unitCost: '',
          quantity: 1,
          frequency: 'monthly',
          notes: '',
        };
    }
  }

  // Sync when editing item changes
  useEffect(() => {
    if (editingItem) {
      setCategory(editingItem.category || 'custom');
      setFormData({ ...editingItem });
      setErrors({});
    } else {
      setFormData(getInitialState(category, currency));
      setErrors({});
    }
  }, [editingItem]);

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    setFormData(getInitialState(newCat, currency));
    setErrors({});
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleApplyPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      ...preset,
      category,
      tariff: category === 'electricity' ? (preset.tariff || defaultTariff) : undefined,
    }));
    setShowPresets(false);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemToValidate = {
      ...formData,
      category,
      id: editingItem ? editingItem.id : `item_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    };

    const validation = validateExpenseItem(itemToValidate);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSaveItem(itemToValidate);

    // Reset form after saving new item
    if (!editingItem) {
      setFormData(getInitialState(category, currency));
      setErrors({});
    }
  };

  const currentCategoryConfig = EXPENSE_CATEGORIES.find((c) => c.id === category) || EXPENSE_CATEGORIES[0];

  return (
    <div id="calculator" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-slate-100 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>{editingItem ? 'Edit Expense Item' : 'Add an Expense to Check'}</span>
            {editingItem && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                Editing
              </span>
            )}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Choose a category to calculate its tailored financial formula.
          </p>
        </div>

        {/* Preset quick button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Use {currentCategoryConfig.shortName} Presets</span>
          </button>

          {showPresets && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-30 p-2 text-left">
              <div className="text-xs font-bold text-slate-700 px-3 py-1.5 border-b border-slate-100">
                Popular {currentCategoryConfig.shortName} Presets
              </div>
              <div className="max-h-60 overflow-y-auto py-1">
                {currentCategoryConfig.presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(p)}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-teal-50 rounded-lg transition-colors flex flex-col group"
                  >
                    <span className="font-semibold text-slate-800 group-hover:text-teal-900">{p.name}</span>
                    <span className="text-[11px] text-slate-500">{p.notes}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Selection Tabs */}
      <div className="mt-5">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
          Select Category
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {EXPENSE_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] || PlusCircle;
            const isSelected = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all text-left ${
                  isSelected
                    ? 'bg-teal-700 text-white border-teal-700 shadow-xs ring-2 ring-teal-200'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                <span className="truncate">{cat.shortName}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-teal-600 shrink-0" />
          <span>{currentCategoryConfig.description}</span>
        </p>
      </div>

      {/* Dynamic Category-Specific Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Name input */}
        <div>
          <label htmlFor="expense-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Expense / Item Name *
          </label>
          <input
            id="expense-name"
            type="text"
            value={formData.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder={
              category === 'subscriptions'
                ? 'e.g. Netflix, Spotify, Gym app'
                : category === 'food_waste'
                ? 'e.g. Expired milk & fruits, tossed takeout'
                : category === 'electricity'
                ? 'e.g. Smart TV & Set-Top Box, Gaming Desktop'
                : category === 'memberships'
                ? 'e.g. Fitness Gym, Sports Club'
                : 'e.g. Daily takeaway latte, unused treadmill'
            }
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500 transition-colors ${
              errors.name ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-white'
            }`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600 font-medium">{errors.name}</p>}
        </div>

        {/* Category Inputs Group */}
        {category === 'subscriptions' && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label htmlFor="sub-price" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Subscription Price ({currencySymbol}) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">{currencySymbol}</span>
                <input
                  id="sub-price"
                  type="number"
                  min="0"
                  step="any"
                  value={formData.price ?? ''}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="e.g. 499"
                  className={`w-full pl-8 pr-3 py-2.5 rounded-xl border text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 ${
                    errors.price ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.price && <p className="mt-1 text-xs text-red-600 font-medium">{errors.price}</p>}
            </div>

            <div>
              <label htmlFor="sub-qty" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Quantity
              </label>
              <input
                id="sub-qty"
                type="number"
                min="1"
                value={formData.quantity ?? 1}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500"
              />
              {errors.quantity && <p className="mt-1 text-xs text-red-600 font-medium">{errors.quantity}</p>}
            </div>

            <div>
              <label htmlFor="sub-frequency" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Billing Frequency
              </label>
              <select
                id="sub-frequency"
                value={formData.frequency || 'monthly'}
                onChange={(e) => handleInputChange('frequency', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:ring-2 focus:ring-teal-500"
              >
                <option value="monthly">Monthly (12x/yr)</option>
                <option value="yearly">Yearly (1x/yr)</option>
                <option value="quarterly">Quarterly (4x/yr)</option>
                <option value="weekly">Weekly (52x/yr)</option>
              </select>
            </div>

            <div>
              <label htmlFor="sub-unused" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Reported Unused Portion
              </label>
              <select
                id="sub-unused"
                value={formData.unusedPercent ?? 100}
                onChange={(e) => handleInputChange('unusedPercent', Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:ring-2 focus:ring-teal-500"
              >
                <option value={100}>100% (Completely Unused)</option>
                <option value={75}>75% (Rarely Opened)</option>
                <option value={50}>50% (Used Half the Time)</option>
                <option value={25}>25% (Slightly Underused)</option>
              </select>
            </div>
          </div>
        )}

        {category === 'food_waste' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="food-cost" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Est. Cost per Waste Item/Meal *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">{currencySymbol}</span>
                <input
                  id="food-cost"
                  type="number"
                  min="0"
                  step="any"
                  value={formData.unitCost ?? ''}
                  onChange={(e) => handleInputChange('unitCost', e.target.value)}
                  placeholder="e.g. 150"
                  className={`w-full pl-8 pr-3 py-2.5 rounded-xl border text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 ${
                    errors.unitCost ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.unitCost && <p className="mt-1 text-xs text-red-600 font-medium">{errors.unitCost}</p>}
            </div>

            <div>
              <label htmlFor="food-qty" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Quantity Wasted
              </label>
              <input
                id="food-qty"
                type="number"
                min="1"
                value={formData.quantity ?? 1}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500"
              />
              {errors.quantity && <p className="mt-1 text-xs text-red-600 font-medium">{errors.quantity}</p>}
            </div>

            <div>
              <label htmlFor="food-freq" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Frequency of Waste
              </label>
              <select
                id="food-freq"
                value={formData.frequency || 'weekly'}
                onChange={(e) => handleInputChange('frequency', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:ring-2 focus:ring-teal-500"
              >
                <option value="daily">Daily (365x/yr)</option>
                <option value="weekly">Weekly (52x/yr)</option>
                <option value="monthly">Monthly (12x/yr)</option>
              </select>
            </div>
          </div>
        )}

        {category === 'electricity' && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label htmlFor="elec-watts" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Standby Power (Watts) *
              </label>
              <input
                id="elec-watts"
                type="number"
                min="0"
                step="any"
                value={formData.watts ?? ''}
                onChange={(e) => handleInputChange('watts', e.target.value)}
                placeholder="e.g. 25"
                className={`w-full px-3 py-2.5 rounded-xl border text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 ${
                  errors.watts ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                }`}
              />
              {errors.watts && <p className="mt-1 text-xs text-red-600 font-medium">{errors.watts}</p>}
            </div>

            <div>
              <label htmlFor="elec-qty" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Number of Devices
              </label>
              <input
                id="elec-qty"
                type="number"
                min="1"
                value={formData.quantity ?? 1}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label htmlFor="elec-hours" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Standby Hours/Day
              </label>
              <input
                id="elec-hours"
                type="number"
                min="0"
                max="24"
                value={formData.standbyHours ?? 20}
                onChange={(e) => handleInputChange('standbyHours', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label htmlFor="elec-tariff" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tariff ({currencySymbol}/kWh)
              </label>
              <input
                id="elec-tariff"
                type="number"
                min="0"
                step="0.1"
                value={formData.tariff ?? defaultTariff}
                onChange={(e) => handleInputChange('tariff', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        )}

        {category === 'memberships' && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label htmlFor="mem-fee" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Membership Fee ({currencySymbol}) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">{currencySymbol}</span>
                <input
                  id="mem-fee"
                  type="number"
                  min="0"
                  step="any"
                  value={formData.fee ?? ''}
                  onChange={(e) => handleInputChange('fee', e.target.value)}
                  placeholder="e.g. 1800"
                  className={`w-full pl-8 pr-3 py-2.5 rounded-xl border text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 ${
                    errors.fee ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.fee && <p className="mt-1 text-xs text-red-600 font-medium">{errors.fee}</p>}
            </div>

            <div>
              <label htmlFor="mem-qty" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Quantity
              </label>
              <input
                id="mem-qty"
                type="number"
                min="1"
                value={formData.quantity ?? 1}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500"
              />
              {errors.quantity && <p className="mt-1 text-xs text-red-600 font-medium">{errors.quantity}</p>}
            </div>

            <div>
              <label htmlFor="mem-freq" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Billing Cycle
              </label>
              <select
                id="mem-freq"
                value={formData.frequency || 'monthly'}
                onChange={(e) => handleInputChange('frequency', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:ring-2 focus:ring-teal-500"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>

            <div>
              <label htmlFor="mem-unused" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Reported Unused Portion
              </label>
              <select
                id="mem-unused"
                value={formData.unusedPercent ?? 75}
                onChange={(e) => handleInputChange('unusedPercent', Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:ring-2 focus:ring-teal-500"
              >
                <option value={100}>100% (Never attend)</option>
                <option value={75}>75% (Attend ~1-2 times/mo)</option>
                <option value={50}>50% (Attend occasionally)</option>
                <option value={25}>25% (Slightly underused)</option>
              </select>
            </div>
          </div>
        )}

        {category === 'custom' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="custom-cost" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Cost ({currencySymbol}) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">{currencySymbol}</span>
                <input
                  id="custom-cost"
                  type="number"
                  min="0"
                  step="any"
                  value={formData.unitCost ?? ''}
                  onChange={(e) => handleInputChange('unitCost', e.target.value)}
                  placeholder="e.g. 120"
                  className={`w-full pl-8 pr-3 py-2.5 rounded-xl border text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 ${
                    errors.unitCost ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.unitCost && <p className="mt-1 text-xs text-red-600 font-medium">{errors.unitCost}</p>}
            </div>

            <div>
              <label htmlFor="custom-qty" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Quantity
              </label>
              <input
                id="custom-qty"
                type="number"
                min="1"
                value={formData.quantity ?? 1}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label htmlFor="custom-freq" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Frequency
              </label>
              <select
                id="custom-freq"
                value={formData.frequency || 'monthly'}
                onChange={(e) => handleInputChange('frequency', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:ring-2 focus:ring-teal-500"
              >
                <option value="daily">Daily (365x/yr)</option>
                <option value="weekly">Weekly (52x/yr)</option>
                <option value="monthly">Monthly (12x/yr)</option>
                <option value="yearly">Yearly (1x/yr)</option>
                <option value="one-time">One-Time (Amortized over year)</option>
              </select>
            </div>
          </div>
        )}

        {/* Optional notes */}
        <div>
          <label htmlFor="item-notes" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Optional Notes / Context
          </label>
          <input
            id="item-notes"
            type="text"
            value={formData.notes || ''}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="e.g. Planning to cancel before renewal in November"
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 placeholder:text-slate-400"
          />
        </div>

        {/* Form Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 shadow-sm hover:shadow transition-all"
          >
            {editingItem ? (
              <>
                <Check className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add Expense to Calculator</span>
              </>
            )}
          </button>

          {editingItem ? (
            <button
              type="button"
              onClick={onCancelEdit}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setFormData(getInitialState(category, currency));
                setErrors({});
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Form</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
