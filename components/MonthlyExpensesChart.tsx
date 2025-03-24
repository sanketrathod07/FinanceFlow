"use client";

import { Transaction } from "@/lib/types";
import { format } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MonthlyExpensesChartProps {
  transactions: Transaction[];
}

export default function MonthlyExpensesChart({ transactions }: MonthlyExpensesChartProps) {
  const monthlyData = transactions.reduce((acc: { [key: string]: number }, transaction) => {
    const monthYear = format(new Date(transaction.date), "MMM yyyy");
    acc[monthYear] = (acc[monthYear] || 0) + transaction.amount;
    return acc;
  }, {});

  const chartData = Object.entries(monthlyData)
    .map(([month, total]) => ({
      month,
      total,
    }))
    .sort((a, b) => {
      const [monthA, yearA] = a.month.split(" ");
      const [monthB, yearB] = b.month.split(" ");
      return new Date(`${monthA} 1, ${yearA}`).getTime() - new Date(`${monthB} 1, ${yearB}`).getTime();
    });

  return (
    <div className="w-full h-[300px]">
      {transactions.length === 0 ? (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month"
              padding={{ left: 20, right: 20 }}
              tick={{ fill: 'hsl(var(--foreground))' }}
            />
            <YAxis
              tick={{ fill: 'hsl(var(--foreground))' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Total"]}
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
            />
            <Bar 
              dataKey="total" 
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}