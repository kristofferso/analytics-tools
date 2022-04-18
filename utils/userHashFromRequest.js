import { createHmac } from "crypto";
import getSalt from "./getsalt";

export default async function userHashFromRequest(req) {
  const { ip, ua } = req;
  const userId = ip + ua.ua;

  const salt = await getSalt();
  const flatIp = ip?.split(".") || ["0", "0", "0", "0"];

  const secret = flatIp[2] + flatIp[3] + salt;

  return createHmac("sha256", secret).update(userId).digest("hex");
}
