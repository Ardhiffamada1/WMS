"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createProductAction(formData) {
  const supabase = await createClient();
  const file = formData.get("image");
  let imageUrl = null;

  if (file && file.size > 0) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
    const { data, error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (uploadError) return { error: uploadError.message };

    const { data: publicUrlData } = supabase.storage
      .from("products")
      .getPublicUrl(data.path);

    imageUrl = publicUrlData.publicUrl;
  }

  const payload = {
    sku: formData.get("sku"),
    name: formData.get("name"),
    category_id: formData.get("category_id") || null,
    description: formData.get("description"),
    cost_price: parseFloat(formData.get("cost_price") || 0),
    selling_price: parseFloat(formData.get("selling_price") || 0),
    stock: parseInt(formData.get("stock") || 0),
    minimum_stock: parseInt(formData.get("minimum_stock") || 5),
    unit: formData.get("unit") || "pcs",
    location: formData.get("location"),
    image_url: imageUrl,
  };

  const { error } = await supabase.from("products").insert([payload]);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/products");
  return { success: true };
}

export async function deleteProductAction(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/products");
  return { success: true };
}
