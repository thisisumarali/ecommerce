import React from "react";
import ProductItem from "./ProductItem";
import { ProductListProps } from "../_interface";

const ProductList: React.FC<ProductListProps> = ({ productList }) => {
  return (
    <div className="grid grid-cols-1  sm:grid-cols-2  lg:grid-cols-4 gap-2 md:gap-4 ">
      {productList.map(
        (item, index) =>
          index <= 3 && (
            <div key={index}>
              <ProductItem product={item} />
            </div>
          )
      )}
    </div>
  );
};

export default ProductList;
