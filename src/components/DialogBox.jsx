import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'

const DialogBox = ({ title, children, buttonName, onClickFunction, onCloseFunction = null, onCancel, isModalOpen, setIsModalOpen, maxWidth = 'md', cancelButtonName = "Cancel" }) => {
  return (
    <Dialog open={isModalOpen} onClose={onCloseFunction} fullWidth maxWidth={maxWidth}>
      <DialogTitle>{title}</DialogTitle>
      <hr />
      <DialogContent>{children}</DialogContent>
      <hr />
      <br />
      <DialogActions>
        <Button onClick={() => { setIsModalOpen(false); onCancel() }} sx={{
          textTransform: "none", backgroundColor: 'red', color: 'white', "&:hover": {
            backgroundColor: '#ff4545',
          }
        }}>{cancelButtonName}</Button>
        <Button onClick={onClickFunction} sx={{
          textTransform: "none", backgroundColor: 'blue', color: 'white', "&:hover": {
            backgroundColor: '#4646f6',
          }
        }}>{buttonName}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogBox
