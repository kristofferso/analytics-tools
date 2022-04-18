import { getSupabaseServiceInstance } from "../../utils/supabase";

export default async function handler(req, res) {
  const userHash = req.cookies.hash;
  const methodPost = req.method === "POST";
  const { name, props } = req.body;

  if (userHash && methodPost && name) {
    const supabase = getSupabaseServiceInstance();

    const { data, error } = await supabase.from("events").insert({
      visitor_id: userHash,
      name,
      props,
    });

    if (error) {
      console.error(error);
      return res.status(500).send({ error: "Database error" });
    } else {
      return res.status(200).send({ data: "track" });
    }
  }

  return res.status(500).send({ error: "Request error" });
}
