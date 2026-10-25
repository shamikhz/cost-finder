import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CalculatorForm from './components/CalculatorForm';
import ExpenseList from './components/ExpenseList';
import ResultsSummary from './components/ResultsSummary';
import CategoryBreakdown from './components/CategoryBreakdown';
import SavingsSuggestions from './components/SavingsSuggestions';
import ScenarioManager from './components/ScenarioManager';
import EducationalContent from './components/EducationalContent';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AdPlaceholder from './components/AdPlaceholder';

import { calculateAggregateResults } from './utils/calculations';
import { DEFAULT_CURRENCY_CODE } from './utils/currency';
import { SAMPLE_SCENARIOS } from './data/examples';
import {
  loadActiveItems,
  saveActiveItems,
  loadSavedCurrency,
  saveCurrency,
  clearAllLocalData,
} from './utils/storage';

export default function App() {
  const [currency, setCurrency] = useState(() => loadSavedCurrency(DEFAULT_CURRENCY_CODE));
  const [items, setItems] = useState(() => {
    const loaded = loadActiveItems(null);
    if (loaded && loaded.length > 0) return loaded;
    // Default to the first sample scenario on initial landing so users immediately see how the app works
    return SAMPLE_SCENARIOS[0].items;
  });
  const [editingItem, setEditingItem] = useState(null);

  // Sync active items to LocalStorage on change
  useEffect(() => {
    saveActiveItems(items);
  }, [items]);

  // Sync currency preference to LocalStorage on change
  useEffect(() => {
    saveCurrency(currency);
  }, [currency]);

  // Calculations
  const results = calculateAggregateResults(items);

  // Item management actions
  const handleSaveItem = (item) => {
    if (editingItem) {
      setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
      setEditingItem(null);
    } else {
      setItems((prev) => [item, ...prev]);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    // Smooth scroll to calculator form
    const elem = document.getElementById('calculator');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (editingItem && editingItem.id === id) {
      setEditingItem(null);
    }
  };

  const handleClearAll = () => {
    setItems([]);
    setEditingItem(null);
  };

  const handleApplyScenarioItems = (newItems) => {
    setItems(newItems);
    setEditingItem(null);
    const elem = document.getElementById('calculator');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickSample = () => {
    handleApplyScenarioItems(SAMPLE_SCENARIOS[0].items);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClearAllLocalData = () => {
    if (window.confirm('Delete all saved scenarios and active data from this browser?')) {
      clearAllLocalData();
      setItems([]);
      setEditingItem(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* 1. Header & Navigation */}
      <Header
        currency={currency}
        onCurrencyChange={setCurrency}
        onPrint={handlePrint}
        itemCount={items.length}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero onQuickSample={handleQuickSample} />

        {/* 3. Ad Slot #1: Below intro, before calculator */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdPlaceholder
            slotId="ad-slot-1"
            slotLabel="Sponsored Placement"
            format="leaderboard"
          />
        </div>

        {/* Main Content Workspace */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
          {/* 4. Calculator Form & Item List */}
          <section className="space-y-6">
            <CalculatorForm
              currency={currency}
              editingItem={editingItem}
              onSaveItem={handleSaveItem}
              onCancelEdit={() => setEditingItem(null)}
            />

            <ExpenseList
              items={items}
              currency={currency}
              onEditItem={handleEditItem}
              onDeleteItem={handleDeleteItem}
              onClearAll={handleClearAll}
              onLoadSample={handleQuickSample}
            />
          </section>

          {/* 5. Results & Financial Impact */}
          <ResultsSummary
            items={items}
            currency={currency}
            onPrint={handlePrint}
          />

          {/* 6. Ad Slot #2: After results */}
          <AdPlaceholder
            slotId="ad-slot-2"
            slotLabel="Sponsored Placement"
            format="leaderboard"
          />

          {/* 7. Category-Wise Breakdown */}
          {results.hasItems && (
            <CategoryBreakdown
              breakdown={results.categoryBreakdown}
              annualTotal={results.annualTotal}
              currency={currency}
            />
          )}

          {/* 8. Actionable Savings Opportunities */}
          {results.hasItems && (
            <SavingsSuggestions
              suggestions={results.savingsOpportunities}
            />
          )}

          {/* 9. Local Scenarios Manager */}
          <ScenarioManager
            currentItems={items}
            currency={currency}
            onApplyItems={handleApplyScenarioItems}
          />

          {/* 10. Educational Content Guide */}
          <EducationalContent />

          {/* 11. Ad Slot #3: Within lower educational content */}
          <AdPlaceholder
            slotId="ad-slot-3"
            slotLabel="Sponsored Placement"
            format="leaderboard"
          />

          {/* 12. Frequently Asked Questions */}
          <FAQ />
        </div>
      </main>

      {/* 13. Privacy & Footer */}
      <Footer onClearLocalData={handleClearAllLocalData} />
    </div>
  );
}
