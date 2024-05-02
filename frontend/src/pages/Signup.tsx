import { useState, FormEvent } from "react"

type Props = {
  onSignup: (username: string, password: string, confirmPassword: string) => void
}

const Signup = ({ onSignup }: Props) => {
  const [inputUsername, setInputUsername] = useState<string>('')
  const [inputPassword, setInputPassword] = useState<string>('')
  const [inputConfirmPassword, setInputConfirmPassword] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputPassword === inputConfirmPassword) {
      onSignup(inputUsername, inputPassword, inputConfirmPassword)
    } else {
      alert('Passwords do not match!')
    }
  }

  return (
    <div>
      <h1>Create New Account</h1>
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
          <label htmlFor="">Confirm Password</label>
          <input type="password" name="confirm_password" onChange={(e) => setInputConfirmPassword(e.target.value)} value={inputConfirmPassword} />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default Signup