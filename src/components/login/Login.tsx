import './Login.styles.scss'
import { FC } from 'react'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'

export const Login: FC = () => {
  return (
    <div className="login-container">
      <form className="login-form">
        <h1>Welcome Back</h1>
        <p>Please login to your account</p>
        <div className="input-group">
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            required
            fullWidth
          />
        </div>
        <div className="input-group">
          <TextField
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            required
            fullWidth
          />
        </div>
        <Button variant="contained" size="large">
          Login
        </Button>
        <div className="bottom-text">
          <p>
            Don't have an account? <a href="#">Sign Up</a>
          </p>
          <p>
            <a href="#">Forgot password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}
