"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_utlis/GlobalApi";
import PageList from "../_components/PageProductsList";
import { Product } from "../_interface";

const Mens = () => {
  const [productList, setProductList] = useState<Product[]>([]); // Specify the type as Product[]

  useEffect(() => {
    getLatestProducts_();
  }, []);

  const getLatestProducts_ = () => {
    GlobalApi.getLatestProducts().then((resp) => {
      console.log(resp.data.data);
      setProductList(resp.data.data);
    });
  };

  const filterProductList = (category: string) => {
    const result = productList.filter(
      (item) => item.attributes.category === category
    );
    return result;
  };

  return (
    productList && (
      <div className="p-10 md:p-16">
        {/* mens */}
        <div className="flex justify-between my-3">
          <h2 className=" text-3xl my-3 font-semibold">Products For Womens</h2>
        </div>
        <PageList productList={filterProductList("Female")} />
      </div>
    )
  );
};

export default Mens;
