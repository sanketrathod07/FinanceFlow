"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Budget, TransactionCategory } from "@/lib/types";

interface BudgetFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (budget: Budget) => void;
  existingBudgets: Budget[];
  editingBudget: Budget | null;
}

const CATEGORIES: TransactionCategory[] = [
  "salary",
  "housing",
  "transportation",
  "food",
  "utilities",
  "healthcare",
  "entertainment",
  "shopping",
  "education",
  "savings",
  "other"
];

export default function BudgetForm({ open, onClose, onSubmit, existingBudgets, editingBudget }: BudgetFormProps) {
  const [formData, setFormData] = useState({
    category: "" as TransactionCategory,
    amount: "",
  });

  const [errors, setErrors] = useState({
    category: "",
    amount: "",
  });

  useEffect(() => {
    if (editingBudget) {
      setFormData({
        category: editingBudget.category,
        amount: editingBudget.amount.toString(),
      });
    } else {
      setFormData({
        category: "" as TransactionCategory,
        amount: "",
      });
    }
  }, [editingBudget]);

  const validateForm = () => {
    const newErrors = {
      category: "",
      amount: "",
    };

    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (!formData.amount || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const budget: Budget = {
      id: editingBudget?.id || Date.now().toString(),
      category: formData.category,
      amount: Number(formData.amount),
    };

    onSubmit(budget);
    setFormData({
      category: "" as TransactionCategory,
      amount: "",
    });
  };

  const availableCategories = editingBudget
    ? CATEGORIES
    : CATEGORIES.filter(
        category => !existingBudgets.some(budget => budget.category === category)
      );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editingBudget ? "Edit Budget" : "Set Monthly Budget"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value: TransactionCategory) => 
                setFormData({ ...formData, category: value })
              }
              disabled={!!editingBudget}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    <span className="capitalize">{category}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Monthly Budget Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="Enter amount"
            />
            {errors.amount && <p className="text-sm text-destructive">{errors.amount}</p>}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{editingBudget ? "Update" : "Set"} Budget</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}