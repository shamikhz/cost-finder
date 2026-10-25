import React, { useState } from 'react';
import { Trash2, AlertTriangle, Inbox, Sparkles, Filter } from 'lucide-react';
import ExpenseItem from './ExpenseItem';
import { EXPENSE_CATEGORIES } from '../data/categories';

export default function ExpenseList({
  items,
  currency,
  onEditItem,
  onDeleteItem,
  onClearAll,
  onLoadSample,
}) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const filteredItems = items.filter((item) => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  return (
    <div className="bg-slate-50/70 rounded-2xl border border-slate-200/90 p-5 sm:p-7 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Calculated Expense Items
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Individual items analyzed. Totals update dynamically as you add or edit.
          </p>
        </div>

        {/* Clear all action */}
        {items.length > 0 && (
          <div className="no-print">
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All Items</span>
            </button>
          </div>
        )}
      </div>

      {/* Category filter tabs if there are items */}
      {items.length > 2 && (
        <div className="pt-3 pb-1 flex items-center gap-1.5 overflow-x-auto no-print">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
          <button
            type="button"
            onClick={() => setFilterCategory('all')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              filterCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All ({items.length})
          </button>
          {EXPENSE_CATEGORIES.map((cat) => {
            const count = items.filter((i) => i.category === cat.id).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterCategory(cat.id)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  filterCategory === cat.id
                    ? 'bg-teal-700 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.shortName} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Item List or Empty State */}
      <div className="mt-4 space-y-3">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ExpenseItem
              key={item.id}
              item={item}
              currency={currency}
              onEdit={onEditItem}
              onDelete={onDeleteItem}
            />
          ))
        ) : items.length > 0 ? (
          <div className="p-8 text-center text-sm text-slate-500 bg-white rounded-xl border border-dashed border-slate-200">
            No items in this category filter.
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-10 sm:py-14 px-4 bg-white rounded-xl border border-dashed border-slate-300">
            <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              No expense items added yet
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Add your first unused subscription, wasted grocery item, or standby appliance above. Or start with a pre-configured example profile below.
            </p>
            <div className="mt-4">
              <button
                type="button"
                onClick={onLoadSample}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-colors shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load Sample Profile (Urban Professional)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs no-print">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              Clear all {items.length} items?
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              This will remove all current expense items from your active calculation. This action cannot be undone.
            </p>
            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onClearAll();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
