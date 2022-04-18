// Identify function with constant ID generated server side. Same every 24 hours.
import { createHmac } from "crypto";
import getSalt from "../../utils/getsalt";

export default async function handler(req, res) {
  const ip = req.socket.remoteAddress;
  const flatIp = ip?.split(".") || ["0", "0", "0", "0"];

  const ua = req.headers["user-agent"];
  const userId = ip + ua;

  const salt = await getSalt();
  const secret = flatIp[2] + flatIp[3] + salt;

  const hash = createHmac("sha256", secret).update(userId).digest("hex");

  if (hash) return res.status(200).send({ hash });
  return res.status(500).send("Error");
}
