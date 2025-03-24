"use client";

import { Card } from "@/components/ui/card";
import { BudgetComparison } from "@/lib/types";
import { AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";

interface SpendingInsightsProps {
  budgetComparisons: BudgetComparison[];
}

export default function SpendingInsights({ budgetComparisons }: SpendingInsightsProps) {
  const overBudgetCategories = budgetComparisons.filter(
    (comparison) => comparison.actual > comparison.budgeted
  );

  const nearBudgetCategories = budgetComparisons.filter(
    (comparison) => 
      comparison.actual <= comparison.budgeted &&
      comparison.percentUsed >= 80
  );

  const underBudgetCategories = budgetComparisons.filter(
    (comparison) => comparison.percentUsed < 80
  );

  return (
    <div className="space-y-4">
      {overBudgetCategories.length > 0 && (
        <Card className="p-4 border-destructive">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
            <div>
              <h4 className="font-semibold text-destructive">Over Budget Categories</h4>
              <ul className="mt-2 space-y-1">
                {overBudgetCategories.map((category) => (
                  <li key={category.category}>
                    <span className="capitalize">{category.category}</span>: Over by $
                    {(category.actual - category.budgeted).toFixed(2)} (
                    {Math.round(category.percentUsed)}% used)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {nearBudgetCategories.length > 0 && (
        <Card className="p-4 border-yellow-500">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-500">Approaching Budget Limit</h4>
              <ul className="mt-2 space-y-1">
                {nearBudgetCategories.map((category) => (
                  <li key={category.category}>
                    <span className="capitalize">{category.category}</span>: $
                    {category.remaining.toFixed(2)} remaining (
                    {Math.round(category.percentUsed)}% used)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {underBudgetCategories.length > 0 && (
        <Card className="p-4 border-green-500">
          <div className="flex items-start gap-3">
            <TrendingDown className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-500">Under Budget Categories</h4>
              <ul className="mt-2 space-y-1">
                {underBudgetCategories.map((category) => (
                  <li key={category.category}>
                    <span className="capitalize">{category.category}</span>: $
                    {category.remaining.toFixed(2)} remaining (
                    {Math.round(category.percentUsed)}% used)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}