import { FC, SyntheticEvent } from "react"
import { Alert, Snackbar } from "@mui/material"
import { setErrorAC, setMessageAC } from "../../store/reducers/app-reducer/app-reducer"
import { useAppDispatch, useAppSelector } from "../../store/store"

export const SnackBar: FC = () => {
  const { error, message, severity } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()
  const isOpen = error !== null || message !== null

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(setErrorAC(null))
    dispatch(setMessageAC(null, "info"))
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={error ? "error" : severity}
        variant='filled'
        sx={{ width: "100%" }}
      >
        {error || message}
      </Alert>
    </Snackbar>
  )
}
