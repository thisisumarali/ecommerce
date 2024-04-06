"use client";
import Breadcrumbs from "@/app/_components/Breadcrumbs.jsx";
import GlobalApi from "@/app/_utlis/GlobalApi";
import React, { useEffect, useState } from "react";
import ProjectBanner from "../_components/ProjectBanner";
import ProjectInfo from "../_components/ProjectInfo";
import ProductList from "../../_components/ProductList";
import { usePathname } from "next/navigation";


const ProjectDetail = ({ params }) => {
  const path = usePathname()
  const [productDetail, setProductDetail] = useState();
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    console.log("Project Id", params?.projectId);
    params?.projectId && getProductDetail_();
  }, [params?.projectId]);

  const getProductDetail_ = async () => {
    try {
      const response = await GlobalApi.getProductById(params?.projectId);
      setProductDetail(response.data.data);
      getProductListByCategory(response.data.data);
    } catch (error) {
      console.error("Error fetching product detail:", error);
    }
  };
  const getProductListByCategory = (productDetail) => {
    if (
      !productDetail ||
      !productDetail.attributes ||
      !productDetail.attributes.category
    ) {
      console.log("Product detail is undefined or has no category attribute.");
      return;
    }

    GlobalApi.getProductByCategory(productDetail.attributes.category)
      .then((resp) => {
        console.log(resp.data.data, "data response");
        setProductList(resp.data.data);
      })
      .catch((error) => {
        console.error("Error fetching product list by category:", error);
      });
  };

  return (
    <div className="p-5 px-20 py-12 md:px-28">
      <Breadcrumbs path={path}/>
      <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-5 sm:gap-5 ">
        <ProjectBanner product={productDetail} />
        <ProjectInfo product={productDetail} />
      </div>
      {productList && (
        <div className="mt-20">
          <h2 className="text-[24px] mb-4 font-bold">Similar Products</h2>
          <ProductList productList={productList} />
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
