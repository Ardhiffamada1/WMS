"use client";

import { useState } from "react";
import { submitStockOpnameAction } from "@/lib/actions/opnameActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OpnameForm({ products }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const formData = new FormData(e.target);
    const res = await submitStockOpnameAction(formData);

    if (res?.error) {
      setMsg({ type: "error", text: res.error });
    } else {
      setMsg({
        type: "success",
        text: `Stock Opname berhasil disimpan! Selisih penyesuaian: ${res.difference}`,
      });
      e.target.reset();
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {msg && (
        <div
          className={`p-3 text-xs rounded-lg border ${msg.type === "error" ? "border-rose-500/20 bg-rose-500/10 text-rose-500" : "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"}`}
        >
          {msg.text}
        </div>
      )}

      <div className="space-y-1.5">
        <Label
          htmlFor="product_id"
          className="text-xs text-zinc-500 font-medium"
        >
          Pilih Barang SKU
        </Label>
        <select
          id="product_id"
          name="product_id"
          required
          className="w-full h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-3 text-sm text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 dark:focus:border-zinc-600 focus:outline-none"
        >
          <option value="">-- Select Product --</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.sku} - {p.name} (Sistem: {p.stock} {p.unit})
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="physical_stock"
          className="text-xs text-zinc-500 font-medium"
        >
          Jumlah Fisik Ditemukan (Actual)
        </Label>
        <Input
          id="physical_stock"
          name="physical_stock"
          type="number"
          min="0"
          required
          placeholder="0"
          className="h-10 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-sm text-zinc-900 dark:text-zinc-100"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="notes" className="text-xs text-zinc-500 font-medium">
          Alasan / Catatan Selisih
        </Label>
        <Input
          id="notes"
          name="notes"
          placeholder="Contoh: 2 pcs kemasan rusak / kadaluarsa"
          className="h-10 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-sm text-zinc-900 dark:text-zinc-100"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-10 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-950 text-xs font-semibold rounded-xl cursor-pointer"
      >
        {loading ? "Adjusting..." : "Simpan Adjustment Stok"}
      </Button>
    </form>
  );
}
