import { randomUUID } from "crypto";
import { getSupabaseServiceInstance } from "./supabase";

const supabase = getSupabaseServiceInstance();

export default async function getSalt(): Promise<string | undefined> {
  const { data: existingData, error } = await supabase
    .from("salt")
    .select("*")
    .maybeSingle();

  if (error) {
    console.error(error);
    return;
  }

  if (!existingData) {
    const { data, error, salt } = await insertOrUpdateNewSalt();
    if (error) {
      console.error(error);
      return;
    }

    return salt;
  }

  const date = new Date();
  if (new Date(existingData.expire_at).getTime() < date.getTime()) {
    const { data, error, salt } = await insertOrUpdateNewSalt(existingData.id);

    if (error) {
      return;
    }
    return salt;
  }
  return existingData.salt;
}

const insertOrUpdateNewSalt = async (id?: string): Promise<{ data: any; error: any; salt: string }> => {
  const expire_date = new Date();
  expire_date.setDate(expire_date.getDate() + 1);

  const expire_at = expire_date.toISOString();
  const salt = randomUUID();

  if (id) {
    const { data, error } = await supabase
      .from("salt")
      .update({ salt, expire_at })
      .eq("id", id);
    return { data, error, salt };
  }
  const { data, error } = await supabase
    .from("salt")
    .insert({ salt, expire_at });
  return { data, error, salt };
};

