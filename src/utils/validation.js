/**
 * Validation helpers for expense form inputs.
 */

export function validateExpenseItem(item) {
  const errors = {};

  if (!item.name || !item.name.trim()) {
    errors.name = 'Please provide an expense name or item description.';
  } else if (item.name.length > 80) {
    errors.name = 'Name must be 80 characters or fewer.';
  }

  // Category-specific checks
  switch (item.category) {
    case 'subscriptions': {
      const price = Number(item.price);
      if (item.price === '' || isNaN(price) || price < 0) {
        errors.price = 'Enter a valid subscription price (0 or greater).';
      }
      const qty = Number(item.quantity);
      if (item.quantity !== '' && (isNaN(qty) || qty < 1)) {
        errors.quantity = 'Quantity must be at least 1.';
      }
      const unused = Number(item.unusedPercent);
      if (item.unusedPercent !== '' && (isNaN(unused) || unused < 0 || unused > 100)) {
        errors.unusedPercent = 'Unused percentage must be between 0 and 100%.';
      }
      break;
    }

    case 'food_waste': {
      const unitCost = Number(item.unitCost);
      if (item.unitCost === '' || isNaN(unitCost) || unitCost < 0) {
        errors.unitCost = 'Enter a valid estimated cost per wasted item or batch.';
      }
      const qty = Number(item.quantity);
      if (item.quantity === '' || isNaN(qty) || qty <= 0) {
        errors.quantity = 'Quantity wasted must be greater than 0.';
      }
      break;
    }

    case 'electricity': {
      const watts = Number(item.watts);
      if (item.watts === '' || isNaN(watts) || watts < 0) {
        errors.watts = 'Enter power in watts (e.g. 5W - 50W).';
      }
      const qty = Number(item.quantity);
      if (item.quantity !== '' && (isNaN(qty) || qty < 1)) {
        errors.quantity = 'Number of devices must be at least 1.';
      }
      const hours = Number(item.standbyHours);
      if (item.standbyHours === '' || isNaN(hours) || hours < 0 || hours > 24) {
        errors.standbyHours = 'Standby hours must be between 0 and 24 hours/day.';
      }
      const tariff = Number(item.tariff);
      if (item.tariff === '' || isNaN(tariff) || tariff < 0) {
        errors.tariff = 'Enter a valid tariff rate per kWh (0 or greater).';
      }
      break;
    }

    case 'memberships': {
      const fee = Number(item.fee);
      if (item.fee === '' || isNaN(fee) || fee < 0) {
        errors.fee = 'Enter a valid membership fee.';
      }
      const qty = Number(item.quantity);
      if (item.quantity !== '' && (isNaN(qty) || qty < 1)) {
        errors.quantity = 'Number of memberships must be at least 1.';
      }
      const unused = Number(item.unusedPercent);
      if (item.unusedPercent !== '' && (isNaN(unused) || unused < 0 || unused > 100)) {
        errors.unusedPercent = 'Unused portion must be between 0 and 100%.';
      }
      break;
    }

    case 'custom':
    default: {
      const unitCost = Number(item.unitCost);
      if (item.unitCost === '' || isNaN(unitCost) || unitCost < 0) {
        errors.unitCost = 'Enter a valid expense amount.';
      }
      const qty = Number(item.quantity);
      if (item.quantity !== '' && (isNaN(qty) || qty < 1)) {
        errors.quantity = 'Quantity must be at least 1.';
      }
      break;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
