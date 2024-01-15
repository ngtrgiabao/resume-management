import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/joy/CircularProgress";

import httpModule from "../../helpers/http.ts";
import { ICompany } from "../../types/global.ts";

import "./companies.scss";
import CompanyGrid from "../../components/company-grid/CompanyGrid.tsx";

const Companies = () => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<ICompany[]>("/Company/Get")
      .then((response) => {
        setCompanies(response.data);
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
    <div className="content companies">
      <div className="heading">
        <h2>Companies</h2>
        <Button variant="outlined" onClick={() => navigate("/companies/add")}>
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size="md" />
      ) : companies.length === 0 ? (
        <h1>No company</h1>
      ) : (
        <CompanyGrid data={companies} />
      )}
    </div>
  );
};

export default Companies;
