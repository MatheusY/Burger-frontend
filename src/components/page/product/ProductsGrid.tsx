import { AgGridReact } from "ag-grid-react";
import { IProduct } from "../../../models/Product";
import { ColDef } from "ag-grid-community";
import { useMemo } from "react";
import styles from "./ProductsGrid.module.css";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const ProductsGrid = ({ products }: { products: IProduct[] }) => {
  const columnDefs: ColDef[] = [
    { field: "name", headerName: "Nome", flex: 10, filter: true },
    { field: "description", headerName: "Descrição", flex: 50, filter: true },
    {
      field: "price",
      headerName: "Preço",
      valueGetter: (data) =>
        data.data.price.toLocaleString("pt-br", {
          minimumFractionDigits: 2,
        }),
    },
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  );

  return (
    <div className={styles.body}>
      <div className={`ag-theme-alpine ${styles.grid}`}>
        <AgGridReact
          rowData={products}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"
        />
      </div>
    </div>
  );
};

export default ProductsGrid;
