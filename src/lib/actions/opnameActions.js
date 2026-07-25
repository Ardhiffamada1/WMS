"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitStockOpnameAction(formData) {
  const supabase = await createClient();
  const productId = formData.get("product_id");
  const physicalStock = parseInt(formData.get("physical_stock"), 10);
  const notes = formData.get("notes");

  // Ambil stok sistem saat ini
  const { data: product, error: fetchErr } = await supabase
    .from("products")
    .select("stock, sku")
    .eq("id", productId)
    .single();
  if (fetchErr || !product) return { error: "Produk tidak ditemukan" };

  const systemStock = product.stock;
  const difference = physicalStock - systemStock;

  // 1. Update stok di tabel products
  const { error: updateErr } = await supabase
    .from("products")
    .update({ stock: physicalStock })
    .eq("id", productId);
  if (updateErr) return { error: updateErr.message };

  // 2. Catat audit log di tabel transactions
  const txType = difference >= 0 ? "STOCK_IN" : "STOCK_OUT";
  const txCode = `OPNAME-${Date.now().toString().slice(-6)}`;

  await supabase.from("transactions").insert([
    {
      code: txCode,
      product_id: productId,
      type: txType,
      quantity: Math.abs(difference),
      notes: `[Stock Opname Adjustment] Stok Fisik: ${physicalStock}, Stok Sistem: ${systemStock}. Ket: ${notes || "-"}`,
    },
  ]);

  revalidatePath("/dashboard/stock-opname");
  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard");

  return { success: true, difference };
}
