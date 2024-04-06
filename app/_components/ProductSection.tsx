"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_utlis/GlobalApi";
import ProductList from "./ProductList";
import { ArrowRight } from "lucide-react";
import { Product } from "../_interface";
import Link from "next/link";
const ProductSection = () => {
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
      <div className="p-10 md:p-20">
        {/* mens */}
        <div className="flex justify-between my-3">
          <h2 className="font-bold text-[20px] my-3">
            Brand New Mens Products
          </h2>
          <Link href="/Mens">
            <span className="text-primary items-center flex cursor-pointer ">
              View All collection
              <ArrowRight />
            </span>
          </Link>
        </div>
        <ProductList productList={filterProductList("Male")} />
        {/* female */}
        <div className="flex justify-between my-3">
          <h2 className="font-bold text-[20px] my-3">
            Brand New Womens Products
          </h2>
          <Link href="/Womens">
            <span className="text-primary items-center flex cursor-pointer ">
              View All collection
              <ArrowRight />
            </span>
          </Link>
        </div>
        <ProductList productList={filterProductList("Female")} />
        {/* unisex */}
        <div className="flex justify-between my-3">
          <h2 className="font-bold text-[20px] my-3">
            Brand New Unisex Products
          </h2>
          <Link href="/Unisex">
            <span className="text-primary items-center flex  cursor-pointer ">
              View All collection
              <ArrowRight />
            </span>
          </Link>
        </div>
        <ProductList productList={filterProductList("Unisex")} />
      </div>
    )
  );
};

export default ProductSection;
