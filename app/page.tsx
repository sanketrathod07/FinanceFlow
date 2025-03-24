"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Wallet } from "lucide-react";
import TransactionList from "@/components/TransactionList";
import TransactionForm from "@/components/TransactionForm";
import MonthlyExpensesChart from "@/components/MonthlyExpensesChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import DashboardCards from "@/components/DashboardCards";
import BudgetForm from "@/components/BudgetForm";
import BudgetList from "@/components/BudgetList";
import BudgetComparisonChart from "@/components/BudgetComparisonChart";
import SpendingInsights from "@/components/SpendingInsights";
import { Transaction, CategoryTotal, Budget, BudgetComparison } from "@/lib/types";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "2", category: "housing", amount: 1200, description: "Rent Payment", date: new Date("2025-03-05") },
    { id: "3", category: "food", amount: 250, description: "Groceries", date: new Date("2025-03-07") },
    { id: "4", category: "transportation", amount: 100, description: "Gas & Public Transport", date: new Date("2025-03-10") },
    { id: "5", category: "utilities", amount: 150, description: "Electricity & Water Bills", date: new Date("2025-03-12") },
    { id: "6", category: "healthcare", amount: 80, description: "Doctor Visit & Medicine", date: new Date("2025-03-15") },
    { id: "7", category: "entertainment", amount: 60, description: "Movie & Streaming", date: new Date("2025-03-18") },
    { id: "8", category: "shopping", amount: 200, description: "Clothes & Accessories", date: new Date("2025-03-20") },
    { id: "9", category: "education", amount: 500, description: "Online Courses", date: new Date("2025-03-22") },
    { id: "10", category: "savings", amount: 1000, description: "Emergency Fund", date: new Date("2025-03-25") },
  ]);


  const [budgets, setBudgets] = useState<Budget[]>([
    { id: "1", category: "housing", amount: 1200 },
    { id: "2", category: "food", amount: 300 },
    { id: "3", category: "transportation", amount: 150 },
    { id: "4", category: "utilities", amount: 200 },
    { id: "5", category: "healthcare", amount: 100 },
    { id: "6", category: "entertainment", amount: 100 },
    { id: "7", category: "shopping", amount: 250 },
    { id: "8", category: "education", amount: 500 },
    { id: "9", category: "savings", amount: 1000 },
  ]);

  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [isBudgetFormOpen, setIsBudgetFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const handleAddTransaction = (transaction: Transaction) => {
    if (editingTransaction) {
      setTransactions(transactions.map(t =>
        t.id === editingTransaction.id ? transaction : t
      ));
      setEditingTransaction(null);
    } else {
      setTransactions([...transactions, { ...transaction, id: Date.now().toString() }]);
    }
    setIsTransactionFormOpen(false);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsTransactionFormOpen(true);
  };

  const handleAddBudget = (budget: Budget) => {
    if (editingBudget) {
      setBudgets(budgets.map(b =>
        b.id === editingBudget.id ? budget : b
      ));
      setEditingBudget(null);
    } else {
      setBudgets([...budgets, budget]);
    }
    setIsBudgetFormOpen(false);
  };

  const handleDeleteBudget = (id: string) => {
    setBudgets(budgets.filter(b => b.id !== id));
  };

  const handleEditBudget = (budget: Budget) => {
    setEditingBudget(budget);
    setIsBudgetFormOpen(true);
  };

  const categoryTotals = transactions.reduce((acc: CategoryTotal[], transaction) => {
    const existingCategory = acc.find(cat => cat.category === transaction.category);
    if (existingCategory) {
      existingCategory.total += transaction.amount;
    } else {
      acc.push({ category: transaction.category, total: transaction.amount });
    }
    return acc;
  }, []);

  const budgetComparisons: BudgetComparison[] = budgets.map(budget => {
    const actual = transactions
      .filter(t => t.category === budget.category)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      category: budget.category,
      budgeted: budget.amount,
      actual,
      remaining: budget.amount - actual,
      percentUsed: (actual / budget.amount) * 100,
    };
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setEditingTransaction(null);
                setIsTransactionFormOpen(true);
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setEditingBudget(null);
                setIsBudgetFormOpen(true);
              }}
            >
              <Wallet className="mr-2 h-4 w-4" />
              Set Budget
            </Button>
          </div>
        </div>

        <DashboardCards transactions={transactions} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Monthly Expenses</h2>
            <MonthlyExpensesChart transactions={transactions} />
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Expenses by Category</h2>
            <CategoryPieChart data={categoryTotals} />
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Budget vs Actual</h2>
            <BudgetComparisonChart data={budgetComparisons} />
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Spending Insights</h2>
            <SpendingInsights budgetComparisons={budgetComparisons} />
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Budget Settings</h2>
          <BudgetList
            budgets={budgets}
            onDelete={handleDeleteBudget}
            onEdit={handleEditBudget}
          />
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
          <TransactionList
            transactions={transactions}
            onDelete={handleDeleteTransaction}
            onEdit={handleEditTransaction}
          />
        </Card>

        <TransactionForm
          open={isTransactionFormOpen}
          onClose={() => setIsTransactionFormOpen(false)}
          onSubmit={handleAddTransaction}
          editingTransaction={editingTransaction}
        />

        <BudgetForm
          open={isBudgetFormOpen}
          onClose={() => setIsBudgetFormOpen(false)}
          onSubmit={handleAddBudget}
          existingBudgets={budgets}
          editingBudget={editingBudget}
        />
      </div>
    </div>
  );
}