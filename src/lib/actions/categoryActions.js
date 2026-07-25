"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(formData) {
  const supabase = await createClient();
  const name = formData.get("name");
  const description = formData.get("description");

  const { error } = await supabase
    .from("categories")
    .insert([{ name, description }]);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/categories");
  return { success: true };
}

export async function deleteCategoryAction(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/categories");
  return { success: true };
}
