import { useState, SyntheticEvent } from "react";
import TextField from "@mui/material/TextField";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import FormControl from "@mui/joy/FormControl";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ICreateCompanyDto } from "../../types/global.ts";
import httpModule from "../../helpers/http.ts";

import "./companies.scss";

const selectStyles = {
  width: 240,
  [`& .${selectClasses.indicator}`]: {
    transition: "0.2s",
    [`&.${selectClasses.expanded}`]: {
      transform: "rotate(-180deg)",
    },
  },
};

const AddCompany = () => {
  const [company, setCompany] = useState<ICreateCompanyDto>({
    name: "",
    size: "Small",
  });
  const navigate = useNavigate();

  const handleChangeSizeCompany = (
    _event: SyntheticEvent | null,
    newValue: string | null,
  ) => {
    setCompany({ ...company, size: newValue as string });
  };

  const handleClickSaveBtn = () => {
    if (company.name === "" || company.size === "") {
      alert("Please fill all fields");
      return;
    }
    httpModule
      .post("/Company/Create", company)
      .then(() => {
        navigate("/companies");
      })
      .catch((err) => console.log(err));
  };

  const handleClickBackBtn = () => {
    navigate("/companies");
  };

  return (
    <div className="content">
      <div className="add-company">
        <h2>Add New Company</h2>
        <TextField
          autoComplete="off"
          label="Company Name"
          variant="outlined"
          value={company.name}
          onChange={(e) => setCompany({ ...company, name: e.target.value })}
        />
        <FormControl>
          <Select
            placeholder="Company Size"
            indicator={<KeyboardArrowDown />}
            sx={selectStyles}
            value={company.size}
            defaultValue={"Small"}
            onChange={handleChangeSizeCompany}
          >
            <Option value="Small">Small</Option>
            <Option value="Medium">Medium</Option>
            <Option value="Large">Large</Option>
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

export default AddCompany;
