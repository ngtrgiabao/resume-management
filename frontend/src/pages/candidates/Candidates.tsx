import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/joy/CircularProgress";

import httpModule from "../../helpers/http.ts";
import { ICandidate } from "../../types/global.ts";

import "./candidates.scss";
import CandidateGrid from "../../components/candidate-grid/CandidateGrid.tsx";

const Candidates = () => {
  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<ICandidate[]>("/Candidate/Get")
      .then((response) => {
        setCandidates(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="content candidates">
      <div className="heading">
        <h2>Candiates</h2>
        <Button variant="outlined" onClick={() => navigate("/candidates/add")}>
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size="md" />
      ) : candidates.length === 0 ? (
        <h1>No candidates</h1>
      ) : (
        <CandidateGrid data={candidates} />
      )}
    </div>
  );
};

export default Candidates;
