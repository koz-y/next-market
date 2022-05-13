import { useState } from "react"

const Register = () => {
  // const [name, setName] = useState("")
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
      const jsonData = await response.json()
      alert(jsonData.message)
    } catch (err) {
      alert("ユーザー登録失敗")
    }
  }

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={newUser.name}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Name"
          required
        />
        <input
          value={newUser.email}
          onChange={handleChange}
          type="text"
          name="email"
          placeholder="e-mail"
          required
        />
        <input
          value={newUser.password}
          onChange={handleChange}
          type="text"
          name="password"
          placeholder="Password"
        />
        <button>Regist</button>
      </form>
    </div>
  )
}

export default Register
