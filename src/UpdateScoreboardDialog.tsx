import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Step,
  StepButton,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
  type DialogProps,
} from "@mui/material";
import { useEffect, useState } from "react";
import TrendingIcon from "./TrendingIcon";
import withVibration from "./withVibration";

type UpdateScoreboardDialog = Omit<DialogProps, "onClose"> & {
  onClose: () => void;
  onConfirm: (value: number) => unknown;
};

export default function UpdateScoreboardDialog({
  onConfirm,
  ...props
}: UpdateScoreboardDialog) {
  const theme = useTheme();
  const xSmall = useMediaQuery(theme.breakpoints.only("xs"));

  const [activeStep, setActiveStep] = useState(0);

  const [closed, setClosed] = useState(false);
  const [pozzetto, setPozzetto] = useState(true);
  const [burraco300, setBurraco300] = useState(0);
  const [burraco250, setBurraco250] = useState(0);
  const [burraco200, setBurraco200] = useState(0);
  const [burraco150, setBurraco150] = useState(0);
  const [burraco100, setBurraco100] = useState(0);
  const [jolly, setJolly] = useState(0);
  const [pinella, setPinella] = useState(0);
  const [ace, setAce] = useState(0);
  const [ten, setTen] = useState(0);
  const [five, setFive] = useState(0);
  const [payJolly, setPayJolly] = useState(0);
  const [payPinella, setPayPinella] = useState(0);
  const [payAce, setPayAce] = useState(0);
  const [payTen, setPayTen] = useState(0);
  const [payFive, setPayFive] = useState(0);

  useEffect(() => {
    if (closed) {
      setPozzetto(true);
      setPayJolly(0);
      setPayPinella(0);
      setPayAce(0);
      setPayTen(0);
      setPayFive(0);
    }
  }, [closed]);

  useEffect(() => {
    if (!pozzetto) {
      setClosed(false);
    }
  }, [pozzetto]);

  const closedScore = closed ? 100 : 0;
  const pozzettoScore = pozzetto ? 0 : -100;
  const burraco300Score = burraco300 * 300;
  const burraco250Score = burraco250 * 250;
  const burraco200Score = burraco200 * 200;
  const burraco150Score = burraco150 * 150;
  const burraco100Score = burraco100 * 100;
  const jollyScore = jolly * 30;
  const pinellaScore = pinella * 20;
  const aceScore = ace * 15;
  const tenScore = ten * 10;
  const fiveScore = five * 5;
  const payJollyScore = payJolly * -30;
  const payPinellaScore = payPinella * -20;
  const payAceScore = payAce * -15;
  const payTenScore = payTen * -10;
  const payFiveScore = payFive * -5;
  const current =
    closedScore +
    pozzettoScore +
    payJollyScore +
    payPinellaScore +
    payAceScore +
    payTenScore +
    payFiveScore +
    jollyScore +
    pinellaScore +
    aceScore +
    tenScore +
    fiveScore +
    burraco300Score +
    burraco250Score +
    burraco200Score +
    burraco150Score +
    burraco100Score;

  const handleConfirm = () => {
    Promise.resolve(onConfirm(current)).then(() => {
      props.onClose();
      setClosed(false);
      setPozzetto(true);
      setBurraco300(0);
      setBurraco250(0);
      setBurraco200(0);
      setBurraco150(0);
      setBurraco100(0);
      setJolly(0);
      setPinella(0);
      setAce(0);
      setTen(0);
      setFive(0);
      setPayJolly(0);
      setPayPinella(0);
      setPayAce(0);
      setPayTen(0);
      setPayFive(0);
      setActiveStep(0);
    });
  };

  return (
    <Dialog fullScreen={xSmall} {...props}>
      <DialogTitle>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ flex: 1 }}>
            Modifica punteggio
          </Typography>

          <Typography variant="body2">
            {current}{" "}
            <Typography variant="body2" color="textSecondary" component="span">
              punti
            </Typography>
          </Typography>
          <TrendingIcon trending={current} sx={{ ml: 1 }} />
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stepper activeStep={activeStep}>
          <Step completed={activeStep > 0}>
            <StepButton onClick={() => setActiveStep(0)}>Chiusura</StepButton>
          </Step>
          <Step completed={activeStep > 1}>
            <StepButton onClick={() => setActiveStep(1)}>Burraco</StepButton>
          </Step>
          <Step completed={activeStep > 2}>
            <StepButton onClick={() => setActiveStep(2)}>Punti</StepButton>
          </Step>
          <Step completed={activeStep > 3}>
            <StepButton onClick={() => setActiveStep(3)}>Riepilogo</StepButton>
          </Step>
        </Stepper>

        <Stack
          direction="column"
          sx={{ display: activeStep === 0 ? undefined : "none" }}
        >
          <ListItemButton onClick={() => setClosed(!closed)}>
            <ListItemIcon>
              {closed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
            </ListItemIcon>
            <ListItemText
              primary="Chiusura"
              secondary={`${closedScore} punti`}
            />
          </ListItemButton>
          <Typography variant="caption" color="textSecondary">
            Punti bonus per la squadra che ha chiuso il gioco
          </Typography>
          <Divider />

          <Typography variant="h6">Da pagare</Typography>
          <Typography variant="caption" color="textSecondary">
            Le carte rimaste in mano alla squadra che non ha chiuso
          </Typography>

          <ListItemButton onClick={() => setPozzetto(!pozzetto)}>
            <ListItemIcon>
              {pozzetto ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
            </ListItemIcon>
            <ListItemText
              primary="Pozzetto"
              secondary={`${pozzettoScore} punti`}
            />
          </ListItemButton>
          <Typography variant="caption" color="textSecondary">
            Da pagare se non si è preso il pozzetto
          </Typography>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <Typography variant="h6" sx={{ width: 24, textAlign: "center" }}>
                {payJolly}
              </Typography>
            </ListItemIcon>
            <ListItemText secondary={`${payJollyScore} punti`}>
              <ButtonGroup fullWidth>
                <Button
                  color="primary"
                  onClick={() => setPayJolly(payJolly - 1)}
                  disabled={payJolly === 0}
                >
                  Annulla
                </Button>
                <Button
                  color="error"
                  onClick={withVibration(() => setPayJolly(payJolly + 1))}
                  disabled={closed}
                >
                  Paga Jolly
                </Button>
              </ButtonGroup>
            </ListItemText>
          </ListItem>
          <Typography variant="caption" color="textSecondary">
            Tutti i jolly
          </Typography>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <Typography variant="h6" sx={{ width: 24, textAlign: "center" }}>
                {payPinella}
              </Typography>
            </ListItemIcon>
            <ListItemText secondary={`${payPinellaScore} punti`}>
              <ButtonGroup fullWidth>
                <Button
                  color="primary"
                  onClick={() => setPayPinella(payPinella - 1)}
                  disabled={payPinella === 0}
                >
                  Annulla
                </Button>
                <Button
                  color="error"
                  onClick={withVibration(() => setPayPinella(payPinella + 1))}
                  disabled={closed}
                >
                  Paga Pinella
                </Button>
              </ButtonGroup>
            </ListItemText>
          </ListItem>
          <Typography variant="caption" color="textSecondary">
            Tutti i 2 anche se usati come carte naturali (fra l'asso e il 3 in
            una scala)
          </Typography>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <Typography variant="h6" sx={{ width: 24, textAlign: "center" }}>
                {payAce}
              </Typography>
            </ListItemIcon>
            <ListItemText secondary={`${payAceScore} punti`}>
              <ButtonGroup fullWidth>
                <Button
                  color="primary"
                  onClick={() => setPayAce(payAce - 1)}
                  disabled={payAce === 0}
                >
                  Annulla
                </Button>
                <Button
                  color="error"
                  onClick={withVibration(() => setPayAce(payAce + 1))}
                  disabled={closed}
                >
                  Paga Assi
                </Button>
              </ButtonGroup>
            </ListItemText>
          </ListItem>
          <Typography variant="caption" color="textSecondary">
            Tutti gli assi anche se usati prima del 2 in una scala
          </Typography>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <Typography variant="h6" sx={{ width: 24, textAlign: "center" }}>
                {payTen}
              </Typography>
            </ListItemIcon>
            <ListItemText secondary={`${payTenScore} punti`}>
              <ButtonGroup fullWidth>
                <Button
                  color="primary"
                  onClick={() => setPayTen(payTen - 1)}
                  disabled={payTen === 0}
                >
                  Annulla
                </Button>
                <Button
                  color="error"
                  onClick={withVibration(() => setPayTen(payTen + 1))}
                  disabled={closed}
                >
                  Paga Dieci
                </Button>
              </ButtonGroup>
            </ListItemText>
          </ListItem>
          <Typography variant="caption" color="textSecondary">
            Tutte le carte dall'8 al Re
          </Typography>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <Typography variant="h6" sx={{ width: 24, textAlign: "center" }}>
                {payFive}
              </Typography>
            </ListItemIcon>
            <ListItemText secondary={`${payFiveScore} punti`}>
              <ButtonGroup fullWidth>
                <Button
                  color="primary"
                  onClick={() => setPayFive(payFive - 1)}
                  disabled={payFive === 0}
                >
                  Annulla
                </Button>
                <Button
                  color="error"
                  onClick={withVibration(() => setPayFive(payFive + 1))}
                  disabled={closed}
                >
                  Paga Cinque
                </Button>
              </ButtonGroup>
            </ListItemText>
          </ListItem>
          <Typography variant="caption" color="textSecondary">
            Tutte le carte dal 3 al 7
          </Typography>
        </Stack>

        <Stack
          direction="column"
          sx={{ display: activeStep === 1 ? undefined : "none" }}
        >
          <ListItem>
            <ListItemIcon>
              <Typography variant="h6" sx={{ width: 24, textAlign: "center" }}>
                {burraco300}
              </Typography>
            </ListItemIcon>
            <ListItemText secondary={`${burraco300Score} punti`}>
              <ButtonGroup fullWidth>
                <Button
                  color="primary"
                  onClick={() => setBurraco300(burraco300 - 1)}
                  disabled={burraco300 === 0}
                >
                  Annulla
                </Button>
                <Button
                  color="success"
                  onClick={withVibration(() => setBurraco300(burraco300 + 1))}
                >
                  +1 Reale
                </Button>
              </ButtonGroup>
            </ListItemText>
          </ListItem>
          <Typography variant="caption" color="textSecondary">
            Scala di colore dall'asso al K con la posizione naturale del 2
          </Typography>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <Typography variant="h6" sx={{ width: 24, textAlign: "center" }}>
                {burraco250}
              </Typography>
            </ListItemIcon>
            <ListItemText secondary={`${burraco250Score} punti`}>
              <ButtonGroup fullWidth>
                <Button
                  color="primary"
                  onClick={() => setBurraco250(burraco250 - 1)}
                  disabled={burraco250 === 0}
                >
                  Annulla
                </Button>
                <Button
                  color="success"
                  onClick={withVibration(() => setBurraco250(burraco250 + 1))}
                >
                  +1 Super
                </Button>
              </ButtonGroup>
            </ListItemText>
          </ListItem>
          <Typography variant="caption" color="textSecondary">
            8 carte dello stesso valore o in scala senza pinella o jolly
          </Typography>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <Typography variant="h6" sx={{ width: 24, textAlign: "center" }}>
                {burraco200}
              </Typography>
            </ListItemIcon>
            <ListItemText secondary={`${burraco200Score} punti`}>
              <ButtonGroup fullWidth>
                <Button
                  color="primary"
                  onClick={() => setBurraco200(burraco200 - 1)}
                  disabled={burraco200 === 0}
                >
                  Annulla
                </Button>
                <Button
                  color="success"
                  onClick={withVibration(() => setBurraco200(burraco200 + 1))}
                >
                  +1 Pulito
                </Button>
              </ButtonGroup>
            </ListItemText>
          </ListItem>
          <Typography variant="caption" color="textSecondary">
            Formato da 7 carte dello stesso valore o da almeno 7 carte in scala
            dello stesso colore senza l'ausilio di pinelle o jolly; una scala si
            considera pura se presenta la pinella dello stesso seme nella
            posizione naturale del 2
          </Typography>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <Typography variant="h6" sx={{ width: 24, textAlign: "center" }}>
                {burraco150}
              </Typography>
            </ListItemIcon>
            <ListItemText secondary={`${burraco150Score} punti`}>
              <ButtonGroup fullWidth>
                <Button
                  color="primary"
                  onClick={() => setBurraco150(burraco150 - 1)}
                  disabled={burraco150 === 0}
                >
                  Annulla
                </Button>
                <Button
                  color="success"
                  onClick={withVibration(() => setBurraco150(burraco150 + 1))}
                >
                  +1 Semipulito
                </Button>
              </ButtonGroup>
            </ListItemText>
          </ListItem>
          <Typography variant="caption" color="textSecondary">
            Una scala con una sequenza continua di almeno sette carte non
            interrotta da matte o in sette carte di uguale valore facciale più
            una matta
          </Typography>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <Typography variant="h6" sx={{ width: 24, textAlign: "center" }}>
                {burraco100}
              </Typography>
            </ListItemIcon>
            <ListItemText secondary={`${burraco100Score} punti`}>
              <ButtonGroup fullWidth>
                <Button
                  color="primary"
                  onClick={() => setBurraco100(burraco100 - 1)}
                  disabled={burraco100 === 0}
                >
                  Annulla
                </Button>
                <Button
                  color="success"
                  onClick={withVibration(() => setBurraco100(burraco100 + 1))}
                >
                  +1 Sporco
                </Button>
              </ButtonGroup>
            </ListItemText>
          </ListItem>
          <Typography variant="caption" color="textSecondary">
            Formato con l'ausilio di pinelle o jolly
          </Typography>
        </Stack>

        <Stack
          direction="column"
          sx={{ display: activeStep === 2 ? undefined : "none" }}
        >
          <ListItem>
            <ListItemIcon>
              <Typography variant="h6" sx={{ width: 24, textAlign: "center" }}>
                {jolly}
              </Typography>
            </ListItemIcon>
            <ListItemText secondary={`${jollyScore} punti`}>
              <ButtonGroup fullWidth>
                <Button
                  color="primary"
                  onClick={() => setJolly(jolly - 1)}
                  disabled={jolly === 0}
                >
                  Annulla
                </Button>
                <Button
                  color="success"
                  onClick={withVibration(() => setJolly(jolly + 1))}
                >
                  +1 Jolly
                </Button>
              </ButtonGroup>
            </ListItemText>
          </ListItem>
          <Typography variant="caption" color="textSecondary">
            Tutti i jolly
          </Typography>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <Typography variant="h6" sx={{ width: 24, textAlign: "center" }}>
                {pinella}
              </Typography>
            </ListItemIcon>
            <ListItemText secondary={`${pinellaScore} punti`}>
              <ButtonGroup fullWidth>
                <Button
                  color="primary"
                  onClick={() => setPinella(pinella - 1)}
                  disabled={pinella === 0}
                >
                  Annulla
                </Button>
                <Button
                  color="success"
                  onClick={withVibration(() => setPinella(pinella + 1))}
                >
                  +1 Pinella
                </Button>
              </ButtonGroup>
            </ListItemText>
          </ListItem>
          <Typography variant="caption" color="textSecondary">
            Tutti i 2 anche se usati come carte naturali (fra l'asso e il 3 in
            una scala)
          </Typography>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <Typography variant="h6" sx={{ width: 24, textAlign: "center" }}>
                {ace}
              </Typography>
            </ListItemIcon>
            <ListItemText secondary={`${aceScore} punti`}>
              <ButtonGroup fullWidth>
                <Button
                  color="primary"
                  onClick={() => setAce(ace - 1)}
                  disabled={ace === 0}
                >
                  Annulla
                </Button>
                <Button
                  color="success"
                  onClick={withVibration(() => setAce(ace + 1))}
                >
                  +1 Assi
                </Button>
              </ButtonGroup>
            </ListItemText>
          </ListItem>
          <Typography variant="caption" color="textSecondary">
            Tutti gli assi anche se usati prima del 2 in una scala
          </Typography>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <Typography variant="h6" sx={{ width: 24, textAlign: "center" }}>
                {ten}
              </Typography>
            </ListItemIcon>
            <ListItemText secondary={`${tenScore} punti`}>
              <ButtonGroup fullWidth>
                <Button
                  color="primary"
                  onClick={() => setTen(ten - 1)}
                  disabled={ten === 0}
                >
                  Annulla
                </Button>
                <Button
                  color="success"
                  onClick={withVibration(() => setTen(ten + 1))}
                >
                  +1 Dieci
                </Button>
              </ButtonGroup>
            </ListItemText>
          </ListItem>
          <Typography variant="caption" color="textSecondary">
            Tutte le carte dall'8 al Re
          </Typography>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <Typography variant="h6" sx={{ width: 24, textAlign: "center" }}>
                {five}
              </Typography>
            </ListItemIcon>
            <ListItemText secondary={`${fiveScore} punti`}>
              <ButtonGroup fullWidth>
                <Button
                  color="primary"
                  onClick={() => setFive(five - 1)}
                  disabled={five === 0}
                >
                  Annulla
                </Button>
                <Button
                  color="success"
                  onClick={withVibration(() => setFive(five + 1))}
                >
                  +1 Cinque
                </Button>
              </ButtonGroup>
            </ListItemText>
          </ListItem>
          <Typography variant="caption" color="textSecondary">
            Tutte le carte dal 3 al 7
          </Typography>
        </Stack>

        <Stack
          direction="column"
          sx={{ display: activeStep === 3 ? undefined : "none", m: 1 }}
        >
          <Typography variant="h4" align="center">
            <Typography color="success" component="span" variant="inherit">
              {current}
            </Typography>{" "}
            <Typography color="textSecondary" component="span" variant="h5">
              punti
            </Typography>
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            props.onClose();
          }}
        >
          Annulla
        </Button>
        <Box sx={{ flex: 1 }} />
        <Button
          color="secondary"
          onClick={() => setActiveStep(activeStep - 1)}
          disabled={activeStep === 0}
        >
          Precedente
        </Button>
        {activeStep < 3 && (
          <Button
            color="secondary"
            onClick={() => setActiveStep(activeStep + 1)}
          >
            Successivo
          </Button>
        )}
        {activeStep >= 3 && (
          <Button onClick={handleConfirm} color="success">
            Conferma
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
