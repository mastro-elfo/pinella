import HomeIcon from "@mui/icons-material/Home";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
};

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({
      ...this.state,
      error,
      errorInfo,
      hasError: true,
    });
  }

  public render() {
    return (
      <>
        {!this.state.hasError && this.props.children}
        <Dialog open={this.state.hasError}>
          <DialogTitle>{this.state.error?.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>{this.state.error?.message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              startIcon={<HomeIcon />}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Home
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
