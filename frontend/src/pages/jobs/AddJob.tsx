import { useState, SyntheticEvent, useEffect, useId } from "react";
import TextField from "@mui/material/TextField";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import FormControl from "@mui/joy/FormControl";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ICompany, ICreateJobDto } from "../../types/global.ts";
import httpModule from "../../helpers/http.ts";

import "./jobs.scss";

const selectStyles = {
  width: 240,
  [`& .${selectClasses.indicator}`]: {
    transition: "0.2s",
    [`&.${selectClasses.expanded}`]: {
      transform: "rotate(-180deg)",
    },
  },
};

const jobLevels: string[] = [
  "Intern",
  "Entry",
  "MidLevel",
  "Senior",
  "TeamLead",
  "Cto",
  "Architect",
];

const AddJob = () => {
  const [job, setJob] = useState<ICreateJobDto>({
    title: "",
    level: "",
    companyId: "",
  });
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<ICompany[]>([]);

  useEffect(() => {
    httpModule
      .get<ICompany[]>("/Company/Get")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  const handleChangeJobLevel = (
    _event: SyntheticEvent | null,
    newValue: string | null,
  ) => {
    setJob({ ...job, level: newValue as string });
  };

  const handleChangeCompany = (
    _event: SyntheticEvent | null,
    newValue: string | null,
  ) => {
    setJob({ ...job, companyId: newValue as string });
  };

  const handleClickSaveBtn = () => {
    if (job.title === "" || job.level === "" || job.companyId === "") {
      alert("Please fill all fields");
      return;
    }
    httpModule
      .post("/Job/Create", job)
      .then(() => {
        navigate("/jobs");
      })
      .catch((err) => console.log(err));
  };

  const handleClickBackBtn = () => {
    navigate("/jobs");
  };

  return (
    <div className="content">
      <div className="add-job">
        <h2>Add New Job</h2>
        <TextField
          autoComplete="off"
          label="Company Title"
          variant="outlined"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />
        <FormControl>
          <Select
            placeholder="Job Level"
            indicator={<KeyboardArrowDown />}
            sx={selectStyles}
            value={job.level}
            defaultValue={"Intern"}
            onChange={handleChangeJobLevel}
          >
            {jobLevels.map((level) => (
              <Option key={useId()} value={level}>
                {level}
              </Option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select
            placeholder="Company"
            indicator={<KeyboardArrowDown />}
            sx={selectStyles}
            value={job.companyId}
            defaultValue={"Intern"}
            onChange={handleChangeCompany}
          >
            {companies.map((company) => (
              <Option key={company.id} value={company.id}>
                {company.name}
              </Option>
            ))}
          </Select>
        </FormControl>
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

export default AddJob;
