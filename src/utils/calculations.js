/**
 * Core calculation engine for Hidden Cost Finder.
 * Provides transparent, validated, and normalized monthly and annual waste estimation.
 */

export const FREQUENCY_MULTIPLIERS_TO_ANNUAL = {
  daily: 365,
  weekly: 52,
  monthly: 12,
  quarterly: 4,
  yearly: 1,
  'one-time': 1,
};

/**
 * Safely parse a numeric value, sanitizing negatives, NaN, and unreasonable overflow.
 * @param {any} val
 * @param {number} fallback
 * @param {number} max
 * @returns {number}
 */
export function sanitizeNumber(val, fallback = 0, max = 100000000) {
  if (val === null || val === undefined || val === '') return fallback;
  const num = Number(val);
  if (Number.isNaN(num) || !Number.isFinite(num)) return fallback;
  if (num < 0) return 0;
  if (num > max) return max;
  return num;
}

/**
 * Round safely to 2 decimal places to avoid floating-point display inaccuracies.
 * @param {number} val
 * @returns {number}
 */
export function roundToCents(val) {
  if (!Number.isFinite(val)) return 0;
  return Math.round((val + Number.EPSILON) * 100) / 100;
}

/**
 * Calculate waste cost for an Unused or Underused Subscription.
 * @param {Object} item
 * @returns {{ monthly: number, annual: number, formulaExplanation: string, details: Object }}
 */
export function calculateSubscriptionCost(item) {
  const price = sanitizeNumber(item.price);
  const quantity = Math.max(1, Math.round(sanitizeNumber(item.quantity, 1)));
  const frequency = item.frequency || 'monthly';
  const unusedPercent = Math.min(100, Math.max(0, sanitizeNumber(item.unusedPercent, 100)));

  const mult = FREQUENCY_MULTIPLIERS_TO_ANNUAL[frequency] || 12;
  const fullAnnualCost = price * quantity * mult;
  const annualUnused = fullAnnualCost * (unusedPercent / 100);
  const monthlyUnused = annualUnused / 12;

  let explanation = '';
  if (unusedPercent === 100) {
    explanation = `${quantity > 1 ? `${quantity}x ` : ''}${frequency} fee (${price}) annualized = ${roundToCents(annualUnused)}/yr (100% unused)`;
  } else {
    explanation = `${quantity > 1 ? `${quantity}x ` : ''}${frequency} fee (${price}) annualized x ${unusedPercent}% reported unused = ${roundToCents(annualUnused)}/yr`;
  }

  return {
    monthly: monthlyUnused,
    annual: annualUnused,
    formulaExplanation: explanation,
    details: { fullAnnualCost, unusedPercent, frequency, quantity },
  };
}

/**
 * Calculate waste cost for Wasted Food.
 * @param {Object} item
 * @returns {{ monthly: number, annual: number, formulaExplanation: string, details: Object }}
 */
export function calculateFoodWasteCost(item) {
  const costPerUnit = sanitizeNumber(item.unitCost);
  const quantity = Math.max(0, sanitizeNumber(item.quantity, 1));
  const frequency = item.frequency || 'weekly';

  const costPerEvent = costPerUnit * quantity;
  const annualMult = FREQUENCY_MULTIPLIERS_TO_ANNUAL[frequency] || 52;
  const annualCost = costPerEvent * annualMult;
  const monthlyCost = annualCost / 12;

  const explanation = `${quantity} item(s) @ ${costPerUnit} ${frequency} (${costPerEvent}/period x ${annualMult} periods/yr)`;

  return {
    monthly: monthlyCost,
    annual: annualCost,
    formulaExplanation: explanation,
    details: { costPerEvent, frequency, quantity },
  };
}

/**
 * Calculate waste cost for Standby Vampire Electricity.
 * Formula:
 * Daily kWh = (Watts * Quantity * Standby Hours) / 1000
 * Daily Cost = Daily kWh * Tariff
 * Annual Cost = Daily Cost * 365
 * @param {Object} item
 * @returns {{ monthly: number, annual: number, formulaExplanation: string, details: Object }}
 */
export function calculateStandbyElectricityCost(item) {
  const watts = sanitizeNumber(item.watts, 0);
  const quantity = Math.max(1, Math.round(sanitizeNumber(item.quantity, 1)));
  const standbyHours = Math.min(24, Math.max(0, sanitizeNumber(item.standbyHours, 24)));
  const tariff = sanitizeNumber(item.tariff, 8.0);
  const daysPerYear = Math.min(366, Math.max(1, sanitizeNumber(item.daysPerYear, 365)));

  const dailyKWh = (watts * quantity * standbyHours) / 1000;
  const dailyCost = dailyKWh * tariff;
  const annualCost = dailyCost * daysPerYear;
  const monthlyCost = annualCost / 12;

  const explanation = `(${watts}W x ${quantity} dev x ${standbyHours}h/day / 1000) = ${roundToCents(dailyKWh)} kWh/day @ ${tariff}/kWh x ${daysPerYear} days`;

  return {
    monthly: monthlyCost,
    annual: annualCost,
    formulaExplanation: explanation,
    details: { dailyKWh, dailyCost, annualKWh: dailyKWh * daysPerYear },
  };
}

/**
 * Calculate waste cost for Underused Memberships (Gym, Club, etc.)
 * @param {Object} item
 * @returns {{ monthly: number, annual: number, formulaExplanation: string, details: Object }}
 */
export function calculateMembershipCost(item) {
  const fee = sanitizeNumber(item.fee);
  const quantity = Math.max(1, Math.round(sanitizeNumber(item.quantity, 1)));
  const frequency = item.frequency || 'monthly';
  const unusedPercent = Math.min(100, Math.max(0, sanitizeNumber(item.unusedPercent, 100)));

  const mult = FREQUENCY_MULTIPLIERS_TO_ANNUAL[frequency] || 12;
  const fullAnnualCost = fee * quantity * mult;
  const annualUnused = fullAnnualCost * (unusedPercent / 100);
  const monthlyUnused = annualUnused / 12;

  const explanation = `${quantity > 1 ? `${quantity}x ` : ''}${frequency} membership (${fee}) annualized x ${unusedPercent}% unused portion`;

  return {
    monthly: monthlyUnused,
    annual: annualUnused,
    formulaExplanation: explanation,
    details: { fullAnnualCost, unusedPercent, frequency },
  };
}

/**
 * Calculate waste cost for Custom everyday expenses.
 * @param {Object} item
 * @returns {{ monthly: number, annual: number, formulaExplanation: string, details: Object }}
 */
export function calculateCustomExpenseCost(item) {
  const unitCost = sanitizeNumber(item.unitCost);
  const quantity = Math.max(1, sanitizeNumber(item.quantity, 1));
  const frequency = item.frequency || 'monthly';

  const mult = FREQUENCY_MULTIPLIERS_TO_ANNUAL[frequency] ?? 12;
  const annualCost = unitCost * quantity * mult;
  const monthlyCost = annualCost / 12;

  let explanation = '';
  if (frequency === 'one-time') {
    explanation = `One-time expense of ${unitCost} x ${quantity} amortized over 12 months`;
  } else {
    explanation = `${quantity > 1 ? `${quantity}x ` : ''}${unitCost} (${frequency}) x ${mult} periods/yr`;
  }

  return {
    monthly: monthlyCost,
    annual: annualCost,
    formulaExplanation: explanation,
    details: { unitCost, quantity, frequency, isOneTime: frequency === 'one-time' },
  };
}

/**
 * Route an individual expense item to its specific category calculation.
 * @param {Object} item
 * @returns {{ monthly: number, annual: number, formulaExplanation: string, details: Object }}
 */
export function calculateItemCost(item) {
  if (!item || typeof item !== 'object') {
    return { monthly: 0, annual: 0, formulaExplanation: 'No data', details: {} };
  }

  switch (item.category) {
    case 'subscriptions':
      return calculateSubscriptionCost(item);
    case 'food_waste':
      return calculateFoodWasteCost(item);
    case 'electricity':
      return calculateStandbyElectricityCost(item);
    case 'memberships':
      return calculateMembershipCost(item);
    case 'custom':
    default:
      return calculateCustomExpenseCost(item);
  }
}

/**
 * Calculate aggregate totals, category breakdowns, largest cost contributor, and savings suggestions.
 * @param {Array<Object>} items
 * @returns {Object}
 */
export function calculateAggregateResults(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    return {
      hasItems: false,
      itemCount: 0,
      monthlyTotal: 0,
      annualTotal: 0,
      categoryBreakdown: [],
      largestContributor: null,
      savingsOpportunities: [],
    };
  }

  let totalMonthly = 0;
  let totalAnnual = 0;
  const categoryTotals = {};
  const processedItems = [];

  for (const item of items) {
    const calc = calculateItemCost(item);
    totalMonthly += calc.monthly;
    totalAnnual += calc.annual;

    const cat = item.category || 'custom';
    if (!categoryTotals[cat]) {
      categoryTotals[cat] = {
        category: cat,
        annualCost: 0,
        monthlyCost: 0,
        count: 0,
      };
    }
    categoryTotals[cat].annualCost += calc.annual;
    categoryTotals[cat].monthlyCost += calc.monthly;
    categoryTotals[cat].count += 1;

    processedItems.push({
      ...item,
      calculatedMonthly: calc.monthly,
      calculatedAnnual: calc.annual,
      formulaExplanation: calc.formulaExplanation,
    });
  }

  // Find largest single contributor
  let largestContributor = null;
  if (processedItems.length > 0) {
    largestContributor = processedItems.reduce((max, current) => {
      return (current.calculatedAnnual > (max ? max.calculatedAnnual : 0)) ? current : max;
    }, null);
  }

  // Calculate percentages for categories
  const categoryBreakdown = Object.values(categoryTotals).map((cat) => ({
    ...cat,
    percentageOfTotal: totalAnnual > 0 ? (cat.annualCost / totalAnnual) * 100 : 0,
  })).sort((a, b) => b.annualCost - a.annualCost);

  // Generate practical, input-driven savings opportunities
  const savingsOpportunities = generateSavingsOpportunities(processedItems, totalAnnual);

  return {
    hasItems: processedItems.length > 0,
    itemCount: processedItems.length,
    monthlyTotal: totalMonthly,
    annualTotal: totalAnnual,
    categoryBreakdown,
    largestContributor,
    savingsOpportunities,
    processedItems,
  };
}

/**
 * Generate actionable, realistic savings opportunities based directly on user's entered items.
 * Nonjudgmental, transparent, never guarantees 100% recovery.
 * @param {Array<Object>} processedItems
 * @param {number} totalAnnual
 * @returns {Array<Object>}
 */
export function generateSavingsOpportunities(processedItems, totalAnnual) {
  if (!processedItems || processedItems.length === 0 || totalAnnual <= 0) return [];

  const suggestions = [];

  // 1. Subscription audit
  const subItems = processedItems.filter((i) => i.category === 'subscriptions' && i.calculatedAnnual > 0);
  if (subItems.length > 0) {
    const totalSubAnnual = subItems.reduce((sum, i) => sum + i.calculatedAnnual, 0);
    const topSub = subItems.reduce((max, i) => (i.calculatedAnnual > max.calculatedAnnual ? i : max), subItems[0]);

    suggestions.push({
      id: 'sub-audit',
      category: 'subscriptions',
      title: 'Review Unused Subscriptions',
      description: `You have ${subItems.length} subscription item(s) with reported idle costs totaling ~${roundToCents(totalSubAnnual)}/yr. Pausing or canceling just "${topSub.name}" could save up to ${roundToCents(topSub.calculatedAnnual)} annually.`,
      action: 'Check bank and app-store recurring statements to pause services you have not accessed in 30 days.',
      impactLevel: topSub.calculatedAnnual > 3000 ? 'High' : 'Moderate',
    });
  }

  // 2. Food waste reduction
  const foodItems = processedItems.filter((i) => i.category === 'food_waste' && i.calculatedAnnual > 0);
  if (foodItems.length > 0) {
    const totalFoodAnnual = foodItems.reduce((sum, i) => sum + i.calculatedAnnual, 0);
    suggestions.push({
      id: 'food-planning',
      category: 'food_waste',
      title: 'Prevent Grocery & Meal Spoilage',
      description: `Wasted food items account for an estimated ~${roundToCents(totalFoodAnnual)} per year across your entries.`,
      action: 'Implement a weekly "eat-first" refrigerator basket and plan meals before bulk grocery purchases.',
      impactLevel: totalFoodAnnual > 5000 ? 'High' : 'Moderate',
    });
  }

  // 3. Standby electricity mitigation
  const elecItems = processedItems.filter((i) => i.category === 'electricity' && i.calculatedAnnual > 0);
  if (elecItems.length > 0) {
    const totalElecAnnual = elecItems.reduce((sum, i) => sum + i.calculatedAnnual, 0);
    suggestions.push({
      id: 'standby-power',
      category: 'electricity',
      title: 'Eliminate Standby Vampire Power',
      description: `Connected idle devices are drawing an estimated ~${roundToCents(totalElecAnnual)} annually in standby electricity.`,
      action: 'Use a switchable power strip or smart plug for entertainment systems, desktop setups, and chargers to cut idle phantom draw.',
      impactLevel: 'Moderate',
    });
  }

  // 4. Membership check
  const memItems = processedItems.filter((i) => i.category === 'memberships' && i.calculatedAnnual > 0);
  if (memItems.length > 0) {
    const totalMemAnnual = memItems.reduce((sum, i) => sum + i.calculatedAnnual, 0);
    suggestions.push({
      id: 'membership-check',
      category: 'memberships',
      title: 'Re-evaluate Underutilized Memberships',
      description: `Reported idle portions of gym or club fees total ~${roundToCents(totalMemAnnual)} per year.`,
      action: 'Consider switching to a pay-per-visit pass, seasonal pause, or lower tier if your schedule limits visits.',
      impactLevel: totalMemAnnual > 6000 ? 'High' : 'Moderate',
    });
  }

  // 5. Custom & general everyday leaks
  const customItems = processedItems.filter((i) => i.category === 'custom' && i.calculatedAnnual > 0);
  if (customItems.length > 0) {
    const totalCustom = customItems.reduce((sum, i) => sum + i.calculatedAnnual, 0);
    suggestions.push({
      id: 'custom-leaks',
      category: 'custom',
      title: 'Optimize Custom Recurring Spending',
      description: `Custom identified spending habits add up to ~${roundToCents(totalCustom)} per year.`,
      action: 'Review recurring habits periodically and set a comfortable spending boundary for discretionary small purchases.',
      impactLevel: 'Moderate',
    });
  }

  return suggestions;
}
