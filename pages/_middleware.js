import { NextResponse } from "next/server";
import { getSupabaseServiceInstance } from "../utils/supabase";
import { v4 as uuid } from "uuid";

export async function middleware(req, ev) {
  const { page, nextUrl: url, geo, referrer } = req;
  const { browser, os, device } = req.ua;
  const { href, pathname, search, host } = url;

  console.log("pageview", page.name, req.method);

  if (page.name && page.name.split("/")[1] !== "api" && req.method === "GET") {
    const supabase = getSupabaseServiceInstance();

    // Check for cookie
    const cookieName = "hash";
    const userHashFromCookies = req.cookies[cookieName];
    const userHash = userHashFromCookies || uuid();

    const res = NextResponse.rewrite(req.nextUrl.clone());
    if (!userHashFromCookies) {
      // Set visitor data in supabase
      const { error } = await supabase
        .from("visitors")
        .insert({ id: userHash, geo, browser, referrer, device, os });
      if (error) {
        console.error(error);
      }

      // Set cookie if non existent
      res.cookie(cookieName, userHash);
    }

    const { error } = await supabase.from("events").insert({
      visitor_id: userHash,
      name: "page " + pathname,
      props: { href, pathname, search, host },
    });

    if (error) {
      console.error(error);
      res.clearCookie(cookieName);
    }

    return res;
  }
}

// WITHOUT COOKIES
// import { getSupabaseServiceInstance } from "../utils/supabase";
// import userHashFromRequest from "../utils/userHashFromRequest";

// export async function middleware(req, ev) {
//   const { page, nextUrl: url, geo, referrer } = req;
//   const { browser, os, device } = req.ua;
//   const { href, pathname, search, host } = url;

//   if (page.name && page.name.split("/")[1] !== "api") {
//     const supabase = getSupabaseServiceInstance();

//     const userHash = await userHashFromRequest(req);

//     console.log("inserting visitor data");
//     const { error: visitorError, data: visitorData } = await supabase
//       .from("visitors")
//       .select()
//       .eq("id", userHash)
//       .maybeSingle();

//     if (visitorError) {
//       console.error(visitorError);
//       return;
//     }

//     if (!visitorData) {
//       const { error } = await supabase
//         .from("visitors")
//         .insert({ id: userHash, geo, browser, referrer, device, os });
//       if (error) {
//         console.error(error);
//       }
//     }

//     const { error } = await supabase.from("events").insert({
//       visitor_id: userHash,
//       name: "page " + pathname,
//       props: { href, pathname, search, host },
//     });

//     if (error) {
//       console.error(error);
//       return;
//     }
//   }
// }
