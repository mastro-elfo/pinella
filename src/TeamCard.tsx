import BackspaceIcon from "@mui/icons-material/Backspace";
import InsightsIcon from "@mui/icons-material/Insights";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme,
} from "@mui/material";
import { lineClasses, SparkLineChart } from "@mui/x-charts";
import { useState } from "react";
import ConfirmButton from "./ConfirmButton";
import EditNameDialog from "./EditNameDialog";
import type { Team } from "./ScoreboardStore";
import TrendingIcon from "./TrendingIcon";
import UpdateScoreboardDialog from "./UpdateScoreboardDialog";
import useTooltip from "./useTooltip";

type TeamCardProps = {
  team: Team;
  other: Team;
  onDeleteLast: () => unknown;
  onUpdateName: (name: string) => void;
  onUpdateScoreboard: (value: number) => unknown;
  pointsToWin: number;
};

export default function TeamCard({
  team,
  other,
  onDeleteLast,
  onUpdateName,
  onUpdateScoreboard,
  pointsToWin,
}: TeamCardProps) {
  const theme = useTheme();

  const [editNameOpen, setEditNameOpen] = useState(false);
  const [editScoreboardOpen, setEditScoreboardOpen] = useState(false);

  const [editTeamNameTooltip, setEditTeamNameTooltip] = useTooltip(
    "edit-team-name",
    { defaultValue: true },
  );

  const teamScore = team.history.at(-1) ?? 0;
  const otherScore = other.history.at(-1) ?? 0;
  const difference = teamScore - otherScore;
  const teamPrevious = team.history.at(-2) ?? 0;
  const otherPrevious = other.history.at(-2) ?? 0;
  const trending = teamScore - teamPrevious - (otherScore - otherPrevious);
  const remaining = pointsToWin - teamScore;

  const teamWon =
    team.history.length === other.history.length &&
    teamScore >= otherScore &&
    teamScore >= pointsToWin;
  const teamLost =
    team.history.length === other.history.length &&
    otherScore >= teamScore &&
    otherScore >= pointsToWin;

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Tooltip
              title="Clicca per cambiare il nome"
              open={editTeamNameTooltip}
              onOpen={() => setEditTeamNameTooltip(true)}
              onClose={() => setEditTeamNameTooltip(false)}
              arrow
            >
              <Box>{team.name}</Box>
            </Tooltip>
          }
          subheader={`${teamScore} punti`}
          slotProps={{
            title: {
              onClick: () => setEditNameOpen(true),
            },
            subheader: {
              color:
                difference > 0 ? "success" : difference < 0 ? "error" : "info",
            },
          }}
        />
        <CardContent>
          <ListItem disableGutters>
            <ListItemIcon>
              <TrendingIcon trending={trending} />
            </ListItemIcon>
            <ListItemText
              primary={
                difference > 0
                  ? `In vantaggio di ${difference} punti`
                  : difference < 0
                    ? `In svantaggio di ${-difference} punti`
                    : "Pari"
              }
              secondary={
                !(teamLost || teamWon)
                  ? `${Math.max(0, remaining)} per vincere`
                  : ""
              }
            />
          </ListItem>

          <Box
            sx={{
              borderWidth: 1,
              borderColor: theme.palette.divider,
              borderStyle: "solid",
              borderRadius: theme.shape.borderRadius,
              overflow: "hidden",
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {team.history.length <= 1 && (
              <InsightsIcon fontSize="large" color="disabled" />
            )}
            {team.history.length > 1 && (
              <SparkLineChart
                height={60}
                area
                data={team.history}
                color={theme.palette.secondary.main}
                sx={{
                  [`& .${lineClasses.area}`]: { opacity: 0.2 },
                  [`& .${lineClasses.line}`]: { strokeWidth: 3 },
                }}
                yAxis={{ max: pointsToWin }}
                margin={0}
              />
            )}
          </Box>
        </CardContent>
        <CardActions>
          <ConfirmButton
            onConfirm={onDeleteLast}
            title="Elimina ultimo punteggio"
            disabled={
              team.history.length < other.history.length ||
              team.history.length === 0
            }
            color="error"
            confirmProps={{ children: "Elimina" }}
          >
            <BackspaceIcon />
          </ConfirmButton>
          <Box sx={{ flex: 1 }} />
          {!(teamWon || teamLost) && (
            <IconButton
              onClick={() => setEditScoreboardOpen(true)}
              disabled={
                team.history.length > other.history.length ||
                teamWon ||
                teamLost
              }
              color="primary"
            >
              <ScoreboardIcon />
            </IconButton>
          )}
          {teamWon && <EmojiEventsIcon color="success" />}
          {teamLost && <SentimentVeryDissatisfiedIcon color="error" />}
        </CardActions>
      </Card>

      <EditNameDialog
        onConfirm={onUpdateName}
        onClose={() => {
          setEditNameOpen(false);
        }}
        open={editNameOpen}
        teamName={team.name}
      />

      <UpdateScoreboardDialog
        onClose={() => setEditScoreboardOpen(false)}
        open={editScoreboardOpen}
        onConfirm={onUpdateScoreboard}
        fullWidth
      />
    </>
  );
}
