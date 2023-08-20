import { useState, useRef, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { IProduct } from "../models/Product";
import { useStore } from "../store/MainStore";

const ProductList = () => {
  const gridRef = useRef({} as AgGridReact<any>);
  const [products, setProducts] = useState([] as IProduct[]);
  const { productStore } = useStore();
  const { fetchProducts } = productStore;

  useEffect(() => {
    fetchProducts().then((response) => setProducts(response));
  }, [fetchProducts]);

  const [columnDefs] = useState([
    { field: "name" },
    { field: "price" },
    { field: "productType", headerName: "Type" },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: "agTextColumnFilter",
    }),
    []
  );

  return (
    <div className="ag-theme-alpine" style={{ width: 800, height: 500 }}>
      <AgGridReact
        ref={gridRef}
        rowData={products}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default ProductList;
