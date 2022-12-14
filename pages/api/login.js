import { API_URL } from "@/config/index";
import cookie from "cookie";
export default async function handler(req, res) {
  //   console.log(req.body);
  //   /api/auth/local
  if (req.method === "POST") {
    const strapireq = await fetch(`${API_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(req.body),
    });
    const data = await strapireq.json();
    if (strapireq.ok) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          // scure it's for https
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, //week
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json({ user: data.user });
    } else {
      res.status(400).json({ error: data.error });
    }
  } else {
    req.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method}` });
  }
}
