import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSubscriptionCost,
  calculateFoodWasteCost,
  calculateStandbyElectricityCost,
  calculateMembershipCost,
  calculateCustomExpenseCost,
  calculateItemCost,
  calculateAggregateResults,
  sanitizeNumber,
  roundToCents,
} from '../utils/calculations.js';

describe('Calculations Utility Suite (Node Native Test Runner)', () => {
  describe('Sanitization & Helpers', () => {
    it('handles negative, NaN, empty strings, and null correctly', () => {
      assert.equal(sanitizeNumber(-150), 0);
      assert.equal(sanitizeNumber('invalid', 10), 10);
      assert.equal(sanitizeNumber('', 5), 5);
      assert.equal(sanitizeNumber(null, 2), 2);
      assert.equal(sanitizeNumber(undefined, 0), 0);
    });

    it('caps excessively large numbers at maximum boundary', () => {
      assert.equal(sanitizeNumber(1e12, 0, 1000000), 1000000);
    });

    it('rounds numbers to 2 decimal places cleanly', () => {
      assert.equal(roundToCents(0.1 + 0.2), 0.3);
      assert.equal(roundToCents(1234.5678), 1234.57);
      assert.equal(roundToCents(0), 0);
    });
  });

  describe('Category A: Unused Subscriptions', () => {
    it('calculates 100% unused monthly subscription', () => {
      const res = calculateSubscriptionCost({
        price: 499,
        quantity: 1,
        frequency: 'monthly',
        unusedPercent: 100,
      });
      assert.equal(res.monthly, 499);
      assert.equal(res.annual, 499 * 12);
    });

    it('calculates partially unused yearly subscription (50% unused)', () => {
      const res = calculateSubscriptionCost({
        price: 2400,
        quantity: 1,
        frequency: 'yearly',
        unusedPercent: 50,
      });
      assert.equal(res.annual, 1200);
      assert.equal(res.monthly, 100);
    });

    it('calculates weekly subscription with multiple quantity', () => {
      const res = calculateSubscriptionCost({
        price: 50,
        quantity: 2,
        frequency: 'weekly',
        unusedPercent: 100,
      });
      assert.equal(res.annual, 5200);
      assert.equal(roundToCents(res.monthly), roundToCents(5200 / 12));
    });
  });

  describe('Category B: Food Waste', () => {
    it('calculates weekly food waste', () => {
      const res = calculateFoodWasteCost({
        unitCost: 150,
        quantity: 2,
        frequency: 'weekly',
      });
      assert.equal(res.annual, 15600);
      assert.equal(res.monthly, 1300);
    });

    it('calculates daily food waste', () => {
      const res = calculateFoodWasteCost({
        unitCost: 50,
        quantity: 1,
        frequency: 'daily',
      });
      assert.equal(res.annual, 50 * 365);
      assert.equal(roundToCents(res.monthly), roundToCents(18250 / 12));
    });

    it('handles zero gracefully', () => {
      const res = calculateFoodWasteCost({ unitCost: 0, quantity: 5, frequency: 'weekly' });
      assert.equal(res.annual, 0);
      assert.equal(res.monthly, 0);
    });
  });

  describe('Category C: Standby Vampire Electricity', () => {
    it('calculates daily kWh, annual and monthly cost with formula', () => {
      const res = calculateStandbyElectricityCost({
        watts: 25,
        quantity: 1,
        standbyHours: 20,
        tariff: 8.0,
        daysPerYear: 365,
      });
      assert.equal(res.details.dailyKWh, 0.5);
      assert.equal(res.details.dailyCost, 4.0);
      assert.equal(res.annual, 1460);
      assert.equal(roundToCents(res.monthly), roundToCents(1460 / 12));
    });

    it('handles zero watts without crashing', () => {
      const res = calculateStandbyElectricityCost({
        watts: 0,
        quantity: 1,
        standbyHours: 24,
        tariff: 8.0,
      });
      assert.equal(res.annual, 0);
      assert.equal(res.monthly, 0);
    });
  });

  describe('Category D: Underused Memberships', () => {
    it('calculates underused gym membership percentage', () => {
      const res = calculateMembershipCost({
        fee: 2000,
        quantity: 1,
        frequency: 'monthly',
        unusedPercent: 75,
      });
      assert.equal(res.annual, 18000);
      assert.equal(res.monthly, 1500);
    });

    it('calculates annual sports club fee', () => {
      const res = calculateMembershipCost({
        fee: 10000,
        quantity: 1,
        frequency: 'yearly',
        unusedPercent: 80,
      });
      assert.equal(res.annual, 8000);
      assert.equal(roundToCents(res.monthly), roundToCents(8000 / 12));
    });
  });

  describe('Category E: Custom Expenses', () => {
    it('calculates one-time custom expenses amortized over 1 year', () => {
      const res = calculateCustomExpenseCost({
        unitCost: 12000,
        quantity: 1,
        frequency: 'one-time',
      });
      assert.equal(res.annual, 12000);
      assert.equal(res.monthly, 1000);
    });

    it('calculates recurring weekly custom expenses', () => {
      const res = calculateCustomExpenseCost({
        unitCost: 100,
        quantity: 3,
        frequency: 'weekly',
      });
      assert.equal(res.annual, 15600);
      assert.equal(res.monthly, 1300);
    });
  });

  describe('Aggregate Calculation & Diagnostics', () => {
    const sampleItems = [
      {
        id: '1',
        name: 'Streaming',
        category: 'subscriptions',
        price: 500,
        quantity: 1,
        frequency: 'monthly',
        unusedPercent: 100, // 6000/yr
      },
      {
        id: '2',
        name: 'Veggies',
        category: 'food_waste',
        unitCost: 100,
        quantity: 1,
        frequency: 'weekly', // 5200/yr
      },
    ];

    it('aggregates total monthly and annual costs accurately', () => {
      const results = calculateAggregateResults(sampleItems);
      assert.equal(results.hasItems, true);
      assert.equal(results.itemCount, 2);
      assert.equal(results.annualTotal, 6000 + 5200);
      assert.equal(roundToCents(results.monthlyTotal), roundToCents((6000 + 5200) / 12));
    });

    it('identifies the largest cost contributor correctly', () => {
      const results = calculateAggregateResults(sampleItems);
      assert.equal(results.largestContributor.id, '1');
      assert.equal(results.largestContributor.name, 'Streaming');
    });

    it('generates direct actionable savings opportunities', () => {
      const results = calculateAggregateResults(sampleItems);
      assert.equal(results.savingsOpportunities.length, 2);
      assert.equal(results.savingsOpportunities[0].category, 'subscriptions');
      assert.equal(results.savingsOpportunities[1].category, 'food_waste');
    });

    it('returns empty result structure for empty items list without throwing', () => {
      const results = calculateAggregateResults([]);
      assert.equal(results.hasItems, false);
      assert.equal(results.monthlyTotal, 0);
      assert.equal(results.annualTotal, 0);
      assert.deepEqual(results.savingsOpportunities, []);
      assert.equal(Array.isArray(results.categoryBreakdown), true);
      assert.equal(results.categoryBreakdown.length, 0);
      // Verify map never throws
      assert.doesNotThrow(() => {
        results.categoryBreakdown.map((item) => item.category);
      });
    });
  });
});
