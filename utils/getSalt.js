// Jeg må skille ut dette til et endepunkt som returnerer hash. deretter må den returnere ved et kall fra middleware?
// da kan jeg like så godt lage et endepunkt som genererer en uid som lagrer i local storage
// sende ved denne id-en ved hver tracking

import { randomUUID } from "crypto";
import { getSupabaseServiceInstance } from "./supabase";

const supabase = getSupabaseServiceInstance();

export default async function getSalt() {
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

const insertOrUpdateNewSalt = async (id) => {
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
