"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { BudgetComparison } from "@/lib/types";

interface BudgetComparisonChartProps {
  data: BudgetComparison[];
}

export default function BudgetComparisonChart({ data }: BudgetComparisonChartProps) {
  return (
    <div className="w-full h-[300px]">
      {data.length === 0 ? (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          No budget data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="category"
              tick={{ fill: 'hsl(var(--foreground))' }}
              tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
            />
            <YAxis
              tick={{ fill: 'hsl(var(--foreground))' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]}
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
            />
            <Legend />
            <Bar dataKey="budgeted" name="Budget" fill="hsl(var(--chart-1))" />
            <Bar dataKey="actual" name="Actual" fill="hsl(var(--chart-2))" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}