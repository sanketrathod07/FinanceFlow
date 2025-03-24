"use client";

import { Card } from "@/components/ui/card";
import { Transaction, TransactionCategory } from "@/lib/types";
import { format } from "date-fns";

interface DashboardCardsProps {
  transactions: Transaction[];
}

export default function DashboardCards({ transactions }: DashboardCardsProps) {
  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  
  const categoryTotals = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<TransactionCategory, number>);

  const topCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Total Expenses</h3>
        <p className="text-3xl font-bold">${totalExpenses.toFixed(2)}</p>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Top Categories</h3>
        <ul className="space-y-2">
          {topCategories.map(([category, amount]) => (
            <li key={category} className="flex justify-between">
              <span className="capitalize">{category}</span>
              <span>${amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
        <ul className="space-y-2">
          {recentTransactions.map((t) => (
            <li key={t.id} className="flex justify-between">
              <div>
                <p className="font-medium">{t.description}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(t.date), "MMM d, yyyy")}
                </p>
              </div>
              <span>${t.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}