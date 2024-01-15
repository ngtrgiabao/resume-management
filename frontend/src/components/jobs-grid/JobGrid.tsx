import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { IJob } from "../../types/global.ts";

import "./job-grid.scss";
interface IJobGridProps {
  data: IJob[];
}

const column: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "size",
    headerName: "Level",
    width: 150,
  },
  {
    field: "companyName",
    headerName: "Company Name",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Creation Time",
    width: 200,
    renderCell: (params) => moment(params.row.createdAt).format("YYYY-MM-DD"),
  },
];

const JobGrid = ({ data }: IJobGridProps) => {
  return (
    <Box className="job-grid" sx={{ width: "100%", heigth: 450 }}>
      <DataGrid
        columns={column}
        rows={data}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default JobGrid;
