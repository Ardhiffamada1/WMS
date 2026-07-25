"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createSupplierAction(formData) {
  const supabase = await createClient();
  const payload = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    address: formData.get("address"),
  };

  const { error } = await supabase.from("suppliers").insert([payload]);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/suppliers");
  return { success: true };
}

export async function deleteSupplierAction(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("suppliers").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/suppliers");
  return { success: true };
}
