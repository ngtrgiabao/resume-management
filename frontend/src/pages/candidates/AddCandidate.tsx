import { useState, SyntheticEvent, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import FormControl from "@mui/joy/FormControl";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ICreateCandidateDto, IJob } from "../../types/global.ts";
import httpModule from "../../helpers/http.ts";

import "./candidates.scss";

const selectStyles = {
  width: 240,
  [`& .${selectClasses.indicator}`]: {
    transition: "0.2s",
    [`&.${selectClasses.expanded}`]: {
      transform: "rotate(-180deg)",
    },
  },
};

const AddCandidate = () => {
  const [candidate, setCandidate] = useState<ICreateCandidateDto>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
    jobId: "",
  });
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  useEffect(() => {
    httpModule
      .get<IJob[]>("/Job/Get")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  const handleChangeJob = (
    _event: SyntheticEvent | null,
    newValue: string | null,
  ) => {
    setCandidate({ ...candidate, jobId: newValue as string });
  };

  const handleClickSaveBtn = () => {
    if (
      candidate.firstName === "" ||
      candidate.lastName === "" ||
      candidate.email === "" ||
      candidate.coverLetter === "" ||
      candidate.phone === "" ||
      candidate.jobId === "" ||
      !pdfFile
    ) {
      alert("Please fill all fields");
      return;
    }

    const newCandidateFormData = new FormData();
    newCandidateFormData.append("firstName", candidate.firstName);
    newCandidateFormData.append("lastName", candidate.lastName);
    newCandidateFormData.append("email", candidate.email);
    newCandidateFormData.append("phone", candidate.phone);
    newCandidateFormData.append("coverLetter", candidate.coverLetter);
    newCandidateFormData.append("jobId", candidate.jobId);
    newCandidateFormData.append("pdfFile", pdfFile);

    httpModule
      .post("/Candidate/Create", newCandidateFormData)
      .then(() => {
        navigate("/candidates");
      })
      .catch((err) => console.log(err));
  };

  const handleClickBackBtn = () => {
    navigate("/candidates");
  };

  return (
    <div className="content">
      <div className="add-candidate">
        <h2>Add New Candidate</h2>
        <FormControl>
          <Select
            placeholder="Job"
            indicator={<KeyboardArrowDown />}
            sx={selectStyles}
            value={candidate.jobId}
            onChange={handleChangeJob}
          >
            {jobs.map((job) => (
              <Option key={job.id} value={job.id}>
                {job.title}
              </Option>
            ))}
          </Select>
        </FormControl>
        <TextField
          autoComplete="off"
          label="First Name"
          variant="outlined"
          value={candidate.firstName}
          onChange={(e) =>
            setCandidate({ ...candidate, firstName: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Last Name"
          variant="outlined"
          value={candidate.lastName}
          onChange={(e) =>
            setCandidate({ ...candidate, lastName: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Email"
          variant="outlined"
          value={candidate.email}
          onChange={(e) =>
            setCandidate({ ...candidate, email: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Phone"
          variant="outlined"
          value={candidate.phone}
          onChange={(e) =>
            setCandidate({ ...candidate, phone: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          label="Cover Letter"
          variant="outlined"
          value={candidate.coverLetter}
          onChange={(e) =>
            setCandidate({ ...candidate, coverLetter: e.target.value })
          }
        />
        <input
          type="file"
          onChange={(event) =>
            setPdfFile(event.target.files ? event.target.files[0] : null)
          }
        />
        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickBackBtn}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCandidate;
