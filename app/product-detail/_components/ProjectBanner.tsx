import React from "react";
import Image from "next/image";
import { ProjectBannerProps } from "@/app/_interface";

const ProjectBanner: React.FC<ProjectBannerProps> = ({ product }) => {
  return (
    <div>
      {product ? (
        <Image
          src={product?.attributes?.banner.data.attributes.url}
          alt={product?.attributes?.banner.data.attributes.alternativeText}
          width={500}
          height={300}
          className="rounded-lg object-cover "
        />
      ) : (
        <div className="h-[300px] w-[500px] bg-slate-200 animate-pulse "/>
      )}
    </div>
  );
};

export default ProjectBanner;
