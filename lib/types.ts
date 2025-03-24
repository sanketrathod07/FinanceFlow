export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: Date;
  category: TransactionCategory;
}

export type TransactionCategory = 
  | "salary"
  | "housing"
  | "transportation"
  | "food"
  | "utilities"
  | "healthcare"
  | "entertainment"
  | "shopping"
  | "education"
  | "savings"
  | "other";

export interface CategoryTotal {
  category: TransactionCategory;
  total: number;
}

export interface Budget {
  id: string;
  category: TransactionCategory;
  amount: number;
}

export interface BudgetComparison {
  category: TransactionCategory;
  budgeted: number;
  actual: number;
  remaining: number;
  percentUsed: number;
}