"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addChip(formData: FormData) {
    const supabase = await createClient();

    const uid = formData.get("uid") as string;
    const company_id = formData.get("company_id") as string;

    if (!uid) {
        return { error: "UID is required" };
    }

    const { error } = await supabase.from("chips").insert({
        uid,
        company_id: company_id || null, // Allow null if empty string
        active_mode: "corporate" // Default
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/dashboard/devices");
    return { success: true };
}
