"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { CategoryTotal, TransactionCategory } from "@/lib/types";

const CATEGORY_COLORS: Record<TransactionCategory, string> = {
  housing: "hsl(var(--chart-1))",
  salary:"hsl(var(--chart-6))",
  transportation: "hsl(var(--chart-2))",
  food: "hsl(var(--chart-3))",
  utilities: "hsl(var(--chart-4))",
  healthcare: "hsl(var(--chart-5))",
  entertainment: "hsl(12, 76%, 61%)",
  shopping: "hsl(294.78260869565213, 57.788944723618094%, 39.01960784313726%)",
  education: "hsl(0, 76%, 24.50980392156863%)",
  savings: "hsl(262.8813559322034, 50.862068965517246%, 45.490196078431374%)",
  other: "hsl(27, 87%, 67%)",
};

interface CategoryPieChartProps {
  data: CategoryTotal[];
}

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
  return (
    <div className="w-full h-[300px]">
      {data.length === 0 ? (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ category }) => category}
              labelLine={true}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={CATEGORY_COLORS[entry.category]} 
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => `$${value.toFixed(2)}`}
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}