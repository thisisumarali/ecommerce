import React from "react";
import ProductItem from "./ProductItem";
import { ProductListProps } from "../_interface";

const PageList: React.FC<ProductListProps> = ({ productList }) => {
  return (
    <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 ">
      {productList.map((item, index) => (
        <div key={index}>
          <ProductItem product={item} />
        </div>
      ))}
    </div>
  );
};

export default PageList;
