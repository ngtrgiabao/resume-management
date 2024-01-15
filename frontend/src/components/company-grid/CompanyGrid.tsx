import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { ICompany } from "../../types/global.ts";

import "./company-grid.scss";
interface ICompanyGridProps {
  data: ICompany[];
}

const column: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "size",
    headerName: "Size",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Creation Time",
    width: 200,
    renderCell: (params) => moment(params.row.createdAt).format("YYYY-MM-DD"),
  },
];

const CompanyGrid = ({ data }: ICompanyGridProps) => {
  return (
    <Box className="company-grid" sx={{ width: "100%", heigth: 450 }}>
      <DataGrid
        columns={column}
        rows={data}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default CompanyGrid;
