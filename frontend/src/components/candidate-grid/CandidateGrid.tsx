import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PictureAsPdf } from "@mui/icons-material";
import moment from "moment";
import { ICandidate } from "../../types/global.ts";

import "./candidate-grid.scss";
import { BASE_URL } from "../../constants/url.constants.ts";
interface ICandidateGridProps {
  data: ICandidate[];
}

const column: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "firstName",
    headerName: "First Name",
    width: 200,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },
  {
    field: "coverLetter",
    headerName: "Cover Letter",
    width: 150,
  },
  {
    field: "resumeUrl",
    headerName: "Download Resume",
    width: 200,
    renderCell: (params) => (
      <a
        href={`${BASE_URL}/Candidate/download/${params.row.resumeUrl}`}
        download
      >
        <PictureAsPdf />
      </a>
    ),
  },
  {
    field: "createdAt",
    headerName: "Creation Time",
    width: 200,
    renderCell: (params) => moment(params.row.createdAt).format("YYYY-MM-DD"),
  },
];

const CandidateGrid = ({ data }: ICandidateGridProps) => {
  return (
    <Box className="candidate-grid" sx={{ width: "100%", heigth: 450 }}>
      <DataGrid
        columns={column}
        rows={data}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default CandidateGrid;
