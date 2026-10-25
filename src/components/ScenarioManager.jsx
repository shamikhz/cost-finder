import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  Save,
  Trash2,
  Sparkles,
  Check,
  AlertCircle,
} from 'lucide-react';
import { SAMPLE_SCENARIOS } from '../data/examples';
import {
  saveScenario,
  loadSavedScenarios,
  deleteScenario,
  clearAllLocalData,
  isLocalStorageAvailable,
} from '../utils/storage';

export default function ScenarioManager({
  currentItems,
  currency,
  onApplyItems,
}) {
  const [savedScenarios, setSavedScenarios] = useState([]);
  const [scenarioName, setScenarioName] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [storageSupported, setStorageSupported] = useState(true);

  useEffect(() => {
    const available = isLocalStorageAvailable();
    setStorageSupported(available);
    if (available) {
      setSavedScenarios(loadSavedScenarios());
    }
  }, []);

  const handleSaveScenario = (e) => {
    e.preventDefault();
    if (!currentItems || currentItems.length === 0) return;

    const name = scenarioName.trim() || `Saved Scenario (${new Date().toLocaleDateString()})`;
    const result = saveScenario(name, currentItems, currency);
    if (result) {
      setSavedScenarios(loadSavedScenarios());
      setScenarioName('');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const handleDeleteScenario = (id) => {
    deleteScenario(id);
    setSavedScenarios(loadSavedScenarios());
  };

  const handleClearAllStorage = () => {
    if (window.confirm('Delete all saved scenarios and local cache?')) {
      clearAllLocalData();
      setSavedScenarios([]);
    }
  };

  return (
    <div id="scenarios" className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs no-print">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
            <Bookmark className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Scenarios & Preset Profiles
            </h2>
            <p className="text-xs text-slate-500">
              Load realistic personas or save your own calculations locally without an account.
            </p>
          </div>
        </div>

        {savedScenarios.length > 0 && storageSupported && (
          <button
            type="button"
            onClick={handleClearAllStorage}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors self-start sm:self-center"
            title="Delete all saved local scenarios"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Local Storage</span>
          </button>
        )}
      </div>

      {/* Preset Personas Section */}
      <div className="mt-5">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>One-Click Example Profiles</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SAMPLE_SCENARIOS.map((scenario) => (
            <div
              key={scenario.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-teal-300 hover:bg-teal-50/20 transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{scenario.title}</h3>
                <p className="text-xs font-medium text-teal-800 mt-0.5">{scenario.subtitle}</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {scenario.description}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {scenario.items.length} sample items
                </span>
                <button
                  type="button"
                  onClick={() => onApplyItems(scenario.items)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-teal-700 bg-white hover:bg-teal-700 hover:text-white border border-teal-300 transition-all shadow-2xs"
                >
                  Load Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Current Scenario Section (if storage available) */}
      {storageSupported ? (
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
            <Save className="w-3.5 h-3.5 text-teal-600" />
            <span>Save Active Calculation to Device</span>
          </div>

          <form onSubmit={handleSaveScenario} className="flex flex-col sm:flex-row gap-2 max-w-xl">
            <input
              type="text"
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
              placeholder="e.g. My October 2026 Audit"
              disabled={currentItems.length === 0}
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={currentItems.length === 0}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 disabled:opacity-50 transition-all shadow-xs shrink-0"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Scenario</span>
                </>
              )}
            </button>
          </form>

          {/* List of previously saved scenarios */}
          {savedScenarios.length > 0 && (
            <div className="mt-4 space-y-2">
              <span className="text-[11px] font-semibold text-slate-500 block">
                Your Saved Scenarios ({savedScenarios.length}):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {savedScenarios.map((sc) => (
                  <div
                    key={sc.id}
                    className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between text-xs hover:border-slate-300"
                  >
                    <div className="truncate mr-2">
                      <div className="font-semibold text-slate-800 truncate">{sc.name}</div>
                      <div className="text-[10px] text-slate-400">
                        {sc.itemCount} items • {new Date(sc.savedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onApplyItems(sc.items)}
                        className="px-2 py-1 rounded bg-teal-50 text-teal-700 hover:bg-teal-100 font-semibold text-[11px]"
                        title="Load this saved scenario"
                      >
                        Load
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteScenario(sc.id)}
                        className="p-1 text-slate-400 hover:text-red-600 rounded"
                        title="Delete scenario"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 p-3 rounded-lg bg-amber-50 text-amber-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>
            Browser LocalStorage is unavailable (e.g. private mode or storage restrictions). Calculations work normally in memory.
          </span>
        </div>
      )}
    </div>
  );
}
