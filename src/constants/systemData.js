export const OC_STATUS = {
    FREE: 'free',
    BUSY: 'busy',
    OFF: 'off'
  };
  
  export const ISSUE_TYPES = [
    { id: 'water', label: 'Water Logistics', priority: 'high' },
    { id: 'electricity', label: 'Electricity/Tech', priority: 'critical' },
    { id: 'food', label: 'Food/Refreshments', priority: 'medium' },
    { id: 'stationery', label: 'Stationery', priority: 'low' },
    { id: 'medical', label: 'Medical Emergency', priority: 'critical' },
    { id: 'other', label: 'Other', priority: 'low' }
  ];
  
  export const PRIORITY_LEVELS = {
    low: 1,
    medium: 2,
    high: 3,
    critical: 4
  };