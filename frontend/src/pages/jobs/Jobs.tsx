import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/joy/CircularProgress";

import httpModule from "../../helpers/http.ts";
import { IJob } from "../../types/global.ts";

import "./jobs.scss";
import JobGrid from "../../components/jobs-grid/JobGrid.tsx";

const Jobs = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<IJob[]>("/Job/Get")
      .then((response) => {
        setJobs(response.data);
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
    <div className="content jobs">
      <div className="heading">
        <h2>Jobs</h2>
        <Button variant="outlined" onClick={() => navigate("/jobs/add")}>
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size="md" />
      ) : jobs.length === 0 ? (
        <h1>No job</h1>
      ) : (
        <JobGrid data={jobs} />
      )}
    </div>
  );
};

export default Jobs;
