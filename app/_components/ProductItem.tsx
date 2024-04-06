import React from "react";
import Image from "next/image";
import { ChevronRightIcon } from "lucide-react";
import { ProductItemProps } from "../_interface";
import Link from "next/link";

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <Link href={`/product-detail/${product.id}`}>
      <div className="hover:border p-1 border-gray-50 rounded-lg cursor-pointer transition-all">
        <Image
          src={product?.attributes?.banner?.data?.attributes?.url}
          alt={product?.attributes?.banner?.data?.attributes?.alternativeText}
          width={400}
          height={350}
          className="rounded-t-lg h-[190px] object-cover"
        />
        <div className="flex justify-between items-center shadow-lg p-3 py-3 rounded-b-lg bg-gray-50">
          <div className="">
            <h2 className="text-[14px] font-semibold line-clamp-1 ">
              {product.attributes.title}
            </h2>
            {product.attributes?.category && (
              <h2 className="text-[12px] text-gray-500 flex gap-2">
                <ChevronRightIcon className="h-4 w-4" />
                {product.attributes?.category}
              </h2>
            )}
          </div>
          <h2 className="font-semibold ">${product.attributes.pricing}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
