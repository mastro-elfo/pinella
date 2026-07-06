import { Route, Routes } from "react-router";
import Dashboard from "./Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="" element={<Dashboard />}></Route>
    </Routes>
  );
}
