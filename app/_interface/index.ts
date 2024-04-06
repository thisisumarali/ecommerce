export interface Product {
  id: number;
  attributes: ProductAttributes;
}

export interface ProductAttributes {
  title: string;
  pricing: number;
  banner: BannerData;
  createdAt?: string;
  whatsIncluded?: null | string;
  category?: string;
  description?: DescriptionItem;
  publishedAt?: string;
  updatedAt?: string;
}

export interface BannerData {
  data: {
    id: number;
    attributes: BannerAttribute;
  };
}

export interface BannerAttribute {
  alternativeText: string;
  url: string;
}
export interface DescriptionItem {
  type: string;
  children: DescriptionChild[];
}
interface DescriptionChild {
  type: string;
  text: string;
}
export interface ProductListProps {
  productList: Product[];
}
export interface ProductItemProps {
  product: Product;
}
export interface ProjectBannerProps {
  attributes: any;
  product: ProductDetail | undefined;
}
export interface ProductDetail {
  id: number;
  attributes: {
    pricing: number;
    title: string;
    description: {
      type: string;
      children: { type: string; text: string }[];
    }[];
    category?: string;
    banner: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
  };
}
