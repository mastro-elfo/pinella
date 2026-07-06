import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  type IconButtonProps,
} from "@mui/material";
import { useState, type ReactNode } from "react";

type ConfirmButtonProps = Omit<IconButtonProps, "content"> & {
  onConfirm: () => unknown;
  title?: ReactNode;
  content?: ReactNode;
};

export default function ConfirmButton({
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
          >
            Annulla
          </Button>
          <Button
            onClick={() => {
              Promise.resolve(onConfirm()).then(() => setOpen(false));
            }}
            color="error"
          >
            Conferma
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
