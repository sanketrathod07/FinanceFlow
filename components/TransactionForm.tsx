"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Transaction, TransactionCategory } from "@/lib/types";
import { format } from "date-fns";

interface TransactionFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (transaction: Transaction) => void;
  editingTransaction?: Transaction | null;
}

const CATEGORIES: TransactionCategory[] = [
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

export default function TransactionForm({ open, onClose, onSubmit, editingTransaction }: TransactionFormProps) {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: format(new Date(), "yyyy-MM-dd"),
    category: "other" as TransactionCategory
  });

  const [errors, setErrors] = useState({
    amount: "",
    description: "",
    date: "",
    category: ""
  });

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        amount: editingTransaction.amount.toString(),
        description: editingTransaction.description,
        date: format(new Date(editingTransaction.date), "yyyy-MM-dd"),
        category: editingTransaction.category
      });
    } else {
      setFormData({
        amount: "",
        description: "",
        date: format(new Date(), "yyyy-MM-dd"),
        category: "other"
      });
    }
  }, [editingTransaction]);

  const validateForm = () => {
    const newErrors = {
      amount: "",
      description: "",
      date: "",
      category: ""
    };

    if (!formData.amount || isNaN(Number(formData.amount))) {
      newErrors.amount = "Please enter a valid amount";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const transaction: Transaction = {
      id: editingTransaction?.id || Date.now().toString(),
      amount: Number(formData.amount),
      description: formData.description.trim(),
      date: new Date(formData.date),
      category: formData.category
    };

    onSubmit(transaction);
    setFormData({
      amount: "",
      description: "",
      date: format(new Date(), "yyyy-MM-dd"),
      category: "other"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editingTransaction ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
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

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description"
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value: TransactionCategory) => 
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    <span className="capitalize">{category}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editingTransaction ? "Update" : "Add"} Transaction
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}