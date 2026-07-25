"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function processStockInAction(formData) {
  const supabase = await createClient();

  const productId = formData.get("product_id");
  const supplierId = formData.get("supplier_id") || null;
  const quantity = parseInt(formData.get("quantity"));
  const notes = formData.get("notes");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const code = `IN-${Date.now()}`;

  const { error } = await supabase.from("transactions").insert([
    {
      code,
      product_id: productId,
      supplier_id: supplierId,
      type: "STOCK_IN",
      quantity,
      notes,
      created_by: user?.id,
    },
  ]);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/inventory");
  revalidatePath("/dashboard/stock-in");
  return { success: true };
}

export async function processStockOutAction(formData) {
  const supabase = await createClient();

  const productId = formData.get("product_id");
  const quantity = parseInt(formData.get("quantity"));
  const notes = formData.get("notes");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const code = `OUT-${Date.now()}`;

  const { error } = await supabase.from("transactions").insert([
    {
      code,
      product_id: productId,
      type: "STOCK_OUT",
      quantity,
      notes,
      created_by: user?.id,
    },
  ]);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/inventory");
  revalidatePath("/dashboard/stock-out");
  return { success: true };
}
