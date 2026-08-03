import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  type ButtonProps,
  type IconButtonProps,
} from "@mui/material";
import { useState, type ReactNode } from "react";

type ConfirmButtonProps = Omit<IconButtonProps, "content"> & {
  cancelProps?: ButtonProps;
  confirmProps?: ButtonProps;
  content?: ReactNode;
  onConfirm: () => unknown;
  title?: ReactNode;
};

export default function ConfirmButton({
  cancelProps,
  confirmProps,
  content,
  onConfirm,
  title,
  ...props
}: ConfirmButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)} {...props} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            children="Annulla"
            {...cancelProps}
          />
          <Button
            onClick={() => {
              Promise.resolve(onConfirm()).then(() => setOpen(false));
            }}
            color="error"
            children="Conferma"
            {...confirmProps}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
