import { useState } from "react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
      const jsonData = await response.json()
      //   console.log(jsonData)
      localStorage.setItem("token", jsonData.token)
      alert(jsonData.message)
    } catch (err) {
      alert("Login error")
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="emial">メールアドレス</label>
        <input
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
          }}
          type="text"
          name="email"
          placeholder="メールアドレス"
          required
        />
        <input
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
          }}
          type="text"
          name="password"
          placeholder="パスワード"
          required
        />
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login
