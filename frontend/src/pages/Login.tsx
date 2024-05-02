import { FormEvent, useState } from "react"

type Props = {
  onLogin: (username: string, password: string) => void
}

const Login = ({ onLogin }: Props) => {
  const [inputUsername, setInputUsername] = useState<string>('')
  const [inputPassword, setInputPassword] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onLogin(inputUsername, inputPassword)
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Username</label>
          <input type="text" name="username" onChange={(e) => setInputUsername(e.target.value)} value={inputUsername} />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" name="password" onChange={(e) => setInputPassword(e.target.value)} value={inputPassword} />
        </div>
        <div>
          <button type="submit">Log In</button>
        </div>
      </form>
    </div>
  )
}

export default Login