import { API_URL } from "@/config/index";
import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { token } = cookie.parse(req.headers.cookie);
    const strapiRes = await fetch(`${API_URL}/api/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await strapiRes.json();
    console.log(data);
    if (strapiRes.ok) {
      res.status(200).json({ user: data });
    } else {
      res.status(403).json({ message: "User forbidden" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method}` });
  }
}
