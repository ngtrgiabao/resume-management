import { useContext, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeContext } from "./context/theme.context.tsx";
import Navbar from "./components/navbar/Navbar.tsx";

import "./App.css";

import CustomLinearProgress from "./components/custom-linear-progress/CustomLinearProgress.tsx";

const Companies = lazy(() => import("./pages/companies/Companies.tsx"));
const Home = lazy(() => import("./pages/home/Home.tsx"));
const AddCompany = lazy(() => import("./pages/companies/AddCompany.tsx"));
const Job = lazy(() => import("./pages/jobs/Jobs.tsx"));
const AddJob = lazy(() => import("./pages/jobs/AddJob.tsx"));
const Candidate = lazy(() => import("./pages/candidates/Candidates.tsx"));
const AddCandidate = lazy(() => import("./pages/candidates/AddCandidate.tsx"));

function App() {
  const { darkMode } = useContext(ThemeContext);
  const appStyles = darkMode ? "app dark" : "app";

  return (
    <div className={appStyles}>
      <Navbar />
      <div className="wrapper">
        <Suspense fallback={<CustomLinearProgress />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies">
              <Route index element={<Companies />} />
              <Route path="add" element={<AddCompany />} />
            </Route>
            <Route path="/jobs">
              <Route index element={<Job />} />
              <Route path="add" element={<AddJob />} />
            </Route>
            <Route path="/candidates">
              <Route index element={<Candidate />} />
              <Route path="add" element={<AddCandidate />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
