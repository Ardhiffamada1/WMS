"use client";

import { useState } from "react";
import { createProductAction } from "@/lib/actions/productActions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export default function AddProductDialog({ categories }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    const res = await createProductAction(formData);

    if (res?.error) {
      setError(res.error);
    } else {
      setOpen(false);
    }
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* Tombol Utama Monokrom */}
        <Button className="bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-semibold h-9 px-4 rounded-xl cursor-pointer transition-colors">
          <Plus className="mr-1.5 h-4 w-4" /> Add Product
        </Button>
      </DialogTrigger>

      {/* Modal Dialog Berbasis Zinc (Dark/Light Neutral) */}
      <DialogContent className="max-w-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 rounded-2xl shadow-xl p-6">
        <DialogHeader className="pb-2 border-b border-zinc-100 dark:border-zinc-900">
          <DialogTitle className="text-base font-bold tracking-tight">
            Add New Product
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {error && (
            <div className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-2.5 text-xs text-rose-500">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="sku"
                className="text-xs text-zinc-500 font-medium"
              >
                SKU Code
              </Label>
              <Input
                id="sku"
                name="sku"
                required
                placeholder="SKU-001"
                className="h-9 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-400 dark:focus:border-zinc-600 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-xs text-zinc-500 font-medium"
              >
                Product Name
              </Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Item name"
                className="h-9 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-400 dark:focus:border-zinc-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="category_id"
                className="text-xs text-zinc-500 font-medium"
              >
                Category
              </Label>
              <select
                name="category_id"
                className="w-full h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-3 text-xs text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 dark:focus:border-zinc-600 focus:outline-none"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option
                    key={c.id}
                    value={c.id}
                    className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                  >
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="location"
                className="text-xs text-zinc-500 font-medium"
              >
                Warehouse Location
              </Label>
              <Input
                id="location"
                name="location"
                required
                placeholder="Rak A-12"
                className="h-9 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-400 dark:focus:border-zinc-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="cost_price"
                className="text-xs text-zinc-500 font-medium"
              >
                Cost Price (HPP)
              </Label>
              <Input
                id="cost_price"
                name="cost_price"
                type="number"
                required
                placeholder="0"
                className="h-9 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-400 dark:focus:border-zinc-600 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="selling_price"
                className="text-xs text-zinc-500 font-medium"
              >
                Selling Price
              </Label>
              <Input
                id="selling_price"
                name="selling_price"
                type="number"
                required
                placeholder="0"
                className="h-9 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-400 dark:focus:border-zinc-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="stock"
                className="text-xs text-zinc-500 font-medium"
              >
                Initial Stock
              </Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                required
                placeholder="0"
                className="h-9 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-400 dark:focus:border-zinc-600 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="minimum_stock"
                className="text-xs text-zinc-500 font-medium"
              >
                Min Stock
              </Label>
              <Input
                id="minimum_stock"
                name="minimum_stock"
                type="number"
                required
                defaultValue="5"
                className="h-9 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-xs text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 dark:focus:border-zinc-600 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="unit"
                className="text-xs text-zinc-500 font-medium"
              >
                Unit
              </Label>
              <Input
                id="unit"
                name="unit"
                required
                defaultValue="pcs"
                className="h-9 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-xs text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 dark:focus:border-zinc-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="image"
              className="text-xs text-zinc-500 font-medium"
            >
              Product Image
            </Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="h-9 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-xs text-zinc-900 dark:text-zinc-100 file:text-xs file:font-semibold"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-semibold h-10 rounded-xl cursor-pointer transition-colors mt-2"
            disabled={loading}
          >
            {loading ? "Saving Product..." : "Save Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
