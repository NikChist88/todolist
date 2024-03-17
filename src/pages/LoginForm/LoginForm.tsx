import "./LoginForm.styles.scss"
import { FC } from "react"
import { TextField, Checkbox } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { FormikHelpers, useFormik } from "formik"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { login } from "../../store/auth/auth-thunks"
import { Navigate } from "react-router-dom"
import { selectAuthIsLoggedIn } from "../../store/auth/auth-selectors"
import { AuthLoginDataType } from "../../api/todolists-api"
import { selectAppStatus } from "../../store/app/app-selectors"

export const LoginForm: FC = () => {
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
      captcha: "",
    },
    onSubmit: (values, formikHelpers: FormikHelpers<AuthLoginDataType>) => {
      dispatch(login(values))
    },
  })

  if (isLoggedIn) {
    return <Navigate to={"/"} />
  }

  return (
    <div className='login-container'>
      <form
        className='login-form'
        onSubmit={formik.handleSubmit}
      >
        <h1>Welcome</h1>
        <p>Please login to your account</p>
        <div className='input-group'>
          <TextField
            id='email'
            type='email'
            label='Email'
            variant='outlined'
            required
            fullWidth
            {...formik.getFieldProps("email")}
          />
        </div>
        <div className='input-group'>
          <TextField
            id='password'
            type='password'
            label='Password'
            autoComplete='password'
            variant='outlined'
            required
            fullWidth
            {...formik.getFieldProps("password")}
          />
        </div>
        <label className='bottom-text'>
          <Checkbox
            checked={formik.values.rememberMe}
            {...formik.getFieldProps("rememberMe")}
          />
          Remember me
        </label>
        <LoadingButton
          type='submit'
          variant='contained'
          size='large'
        >
          Login
        </LoadingButton>
      </form>
    </div>
  )
}
