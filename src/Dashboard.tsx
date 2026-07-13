import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  AppBar,
  Box,
  Container,
  DialogContentText,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ConfirmButton from "./ConfirmButton";
import { useScoreboard } from "./ScoreboardStore";
import TeamCard from "./TeamCard";

export default function Dashboard() {
  const [state, dispatcher] = useScoreboard();
  console.log(state);

  const theme = useTheme();
  const xSmall = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar>
        <Toolbar>
          <Typography
            sx={{
              flex: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            variant="h6"
          >
            🂢 Pinella Scoreboard
          </Typography>

          <ToggleButtonGroup
            value={state.pointsToWin}
            onChange={(_, value) =>
              dispatcher({ type: "update-points-to-win", payload: value })
            }
            exclusive
            size={xSmall ? "small" : "medium"}
          >
            <ToggleButton value={505}>505</ToggleButton>
            <ToggleButton value={1005}>1005</ToggleButton>
            <ToggleButton value={2005}>2005</ToggleButton>
          </ToggleButtonGroup>

          <ConfirmButton
            onConfirm={() => dispatcher({ type: "reset-history" })}
            title="Reset"
            content={
              <>
                <DialogContentText>
                  Questa azione resetterà il punteggio, i nomi delle squadre
                  resteranno invariati.
                </DialogContentText>
                <DialogContentText>
                  Confermi di voler resettare il punteggio?
                </DialogContentText>
              </>
            }
            edge="end"
          >
            <RestartAltIcon />
          </ConfirmButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container
        sx={{
          py: 2,
          flex: 1,
          display: "flex",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={{
            flex: 1,
            justifyContent: "space-evenly",
            alignItems: {
              sm: "center",
            },
          }}
          spacing={2}
        >
          <TeamCard
            team={state.team1}
            other={state.team2}
            onUpdateName={(name) =>
              dispatcher({ type: "update-team1-name", payload: name })
            }
            onUpdateScoreboard={(value) =>
              dispatcher({ type: "update-team1-score", payload: value })
            }
            onDeleteLast={() => dispatcher({ type: "delete-team1-last" })}
            pointsToWin={state.pointsToWin}
          />
          <TeamCard
            team={state.team2}
            other={state.team1}
            onUpdateName={(name) =>
              dispatcher({ type: "update-team2-name", payload: name })
            }
            onUpdateScoreboard={(value) =>
              dispatcher({ type: "update-team2-score", payload: value })
            }
            onDeleteLast={() => dispatcher({ type: "delete-team2-last" })}
            pointsToWin={state.pointsToWin}
          />
        </Stack>
      </Container>
    </Box>
  );
}
