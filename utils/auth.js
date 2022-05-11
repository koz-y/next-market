import jwt from "jsonwebtoken"
import config from "../config/dev"

const secret_key = config.SECRET

const auth = (handler) => {
  return async (req, res) => {
    if (req.method === "GET") {
      return handler(req, res)
    }

    // const token = await req.headers.authorization.split(" ")[1]
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE2NTIyNTA5MjAsImV4cCI6MTY1MjI1NDUyMH0.145No0jI_thHPotZUBdOEpivWRocFoc0HvRoctibYHw"
    if (!token) {
      return res.status(400).json({ message: "トークンがありません" })
    }

    try {
      const decoded = jwt.verify(token, secret_key)
      // console.log(decoded)
      req.body.email = decoded.email
      return handler(req, res)
    } catch (err) {
      return res.status(400).json({ message: "トークンが不正。ログインしてね" })
    }
  }
}

export default auth
