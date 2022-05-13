import jwt from "jsonwebtoken"

import config from "../../../config/dev"
import connectDB from "../../../utils/database"
import { UserModel } from "../../../utils/schemaModels"

const secret_key = config.SECRET

const loginUser = async (req, res) => {
  try {
    await connectDB()
    const savedUserData = await UserModel.findOne({ email: req.body.email })
    console.log(savedUserData)

    if (savedUserData) {
      //ユーザーが見つかった
      if (req.body.password === savedUserData.password) {
        //パスワード画正しい
        const payload = {
          email: req.body.email,
        }
        const token = jwt.sign(payload, secret_key, { expiresIn: "1h" })
        // console.log(token)
        return res.status(200).send({ message: "ログイン成功", token: token })
      } else {
        //パスワードが違う
        return res.status(400).send({ message: "ログイン失敗：パスワードが正しくない" })
      }
    } else {
      //ユーザーが見つからない
      return res.status(400).send({ message: "ログイン失敗：登録してください" })
    }
  } catch (err) {
    return res.status(400).send({ message: "ログイン失敗" })
  }
}

export default loginUser
