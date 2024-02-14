import { FC, useState, forwardRef, Ref, ReactElement, memo } from 'react'
import ButtonMui from '@mui/material/Button'
import { Button } from '../button/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'

type AlertDialogPropsType = {
  title?: string
  name?: string
  action: () => void
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>
  },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />
})

export const AlertDialog: FC<AlertDialogPropsType> = memo(
  ({ title, name, action }) => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    return (
      <>
        <Button
          className={'btn_danger'}
          title={`Delete ${name}`}
          onClick={handleClickOpen}
        />
        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Delete ${name} ${title?.toUpperCase()}?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`${name} ${title?.toUpperCase()} will be removed from your list!`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <ButtonMui onClick={handleClose}>No</ButtonMui>
            <ButtonMui autoFocus onClick={action}>
              Yes
            </ButtonMui>
          </DialogActions>
        </Dialog>
      </>
    )
  }
)
