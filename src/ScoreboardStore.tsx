import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ActionDispatch,
  type PropsWithChildren,
} from "react";

type ScoreboardContextType = [State, ActionDispatch<[action: Action]>];

export type Team = {
  name: string;
  history: number[];
};

type State = {
  team1: Team;
  team2: Team;
  pointsToWin: number;
};

const ScoreboardContext = createContext({} as ScoreboardContextType);

export default function ScoreboardStore({ children }: PropsWithChildren) {
  const value = useReducer(
    reducer,
    JSON.parse(sessionStorage.getItem("pinella-state") ?? "null") ??
      INITIAL_STATE,
  );

  const [state] = value;
  useEffect(() => {
    sessionStorage.setItem("pinella-state", JSON.stringify(state));
  }, [state]);

  return <ScoreboardContext value={value}>{children}</ScoreboardContext>;
}

export function useScoreboard() {
  const ctx = useContext(ScoreboardContext);
  if (!ctx) {
    throw new Error("useScoreboard called outside of ScoreboardStore");
  }
  return ctx;
}

type Action =
  | { type: "restore"; payload: State }
  | { type: "update-points-to-win"; payload: number }
  | { type: "reset-history" }
  | { type: "update-team1-name"; payload: string }
  | { type: "update-team2-name"; payload: string }
  | { type: "update-team1-score"; payload: number }
  | { type: "update-team2-score"; payload: number }
  | { type: "delete-team1-last" }
  | { type: "delete-team2-last" };

function reducer(state: State, action: Action): State {
  if (action.type === "restore") {
    return { ...action.payload };
  }
  if (action.type === "update-points-to-win") {
    return {
      ...state,
      pointsToWin: action.payload,
    };
  }
  if (action.type === "reset-history") {
    return {
      ...state,
      team1: { ...state.team1, history: [] },
      team2: { ...state.team2, history: [] },
    };
  }
  if (action.type === "update-team1-name") {
    return {
      ...state,
      team1: {
        ...state.team1,
        name: action.payload,
      },
    };
  }
  if (action.type === "update-team2-name") {
    return {
      ...state,
      team2: {
        ...state.team2,
        name: action.payload,
      },
    };
  }
  if (action.type === "update-team1-score") {
    return {
      ...state,
      team1: {
        ...state.team1,
        history: [
          ...state.team1.history,
          (state.team1.history.at(-1) ?? 0) + action.payload,
        ],
      },
    };
  }
  if (action.type === "update-team2-score") {
    return {
      ...state,
      team2: {
        ...state.team2,
        history: [
          ...state.team2.history,
          (state.team2.history.at(-1) ?? 0) + action.payload,
        ],
      },
    };
  }
  if (action.type === "delete-team1-last") {
    return {
      ...state,
      team1: {
        ...state.team1,
        history: state.team1.history.slice(0, -1),
      },
    };
  }
  if (action.type === "delete-team2-last") {
    return {
      ...state,
      team2: {
        ...state.team2,
        history: state.team2.history.slice(0, -1),
      },
    };
  }
  return state;
}

const INITIAL_STATE: State = {
  team1: { name: "Team 1", history: [] },
  team2: { name: "Team 2", history: [] },
  pointsToWin: 2005,
} as const;
