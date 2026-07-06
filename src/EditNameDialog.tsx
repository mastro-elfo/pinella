import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  type DialogProps,
  type TextFieldProps,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { type Team } from "./ScoreboardStore";

type EditNameDialogProps = Omit<DialogProps, "onClose"> & {
  onConfirm: (name: string) => void;
  onClose: () => void;
  teamName: Team["name"];
};

export default function EditNameDialog({
  onConfirm,
  teamName,
  ...props
}: EditNameDialogProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.open) {
      console.log(ref.current);
    }
  }, [props.open]);

  const handleConfirm = () => {
    Promise.resolve(onConfirm(String(ref.current?.value))).then(() =>
      props.onClose(),
    );
  };

  const handleKeyUp: TextFieldProps["onKeyUp"] = (event) => {
    if (event.key === "Enter") handleConfirm();
  };

  return (
    <Dialog {...props}>
      <DialogTitle>Modifica nome squadra</DialogTitle>
      <DialogContent>
        <TextField
          defaultValue={teamName}
          inputRef={ref}
          enterKeyHint="done"
          onKeyUp={handleKeyUp}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.onClose();
          }}
        >
          Annulla
        </Button>
        <Button onClick={handleConfirm} color="success">
          Conferma
        </Button>
      </DialogActions>
    </Dialog>
  );
}
