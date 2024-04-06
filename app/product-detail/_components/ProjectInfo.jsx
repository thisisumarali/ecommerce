import SkeletonProductEffect from "@/app/_components/SkeletonProductEffect";
import { CartContext } from "@/app/_context/CartContext";
import GlobalApi from "@/app/_utlis/GlobalApi";
import { useUser } from "@clerk/nextjs";
import { ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
const ProjectInfo = ({ product }) => {
  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext); // Get cart and setCart from context
  const onAddtoCartClick = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    } else {
      const data = {
        data: {
          userName: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: product?.id,
        },
      };
      GlobalApi.addToCart(data).then(
        (resp) => {
          console.log("Add to cart", resp);
          if (resp) {
            setCart((cart) => [
              ...cart,
              {
                id: resp?.data?.id,
                product: product,
              },
            ]);
          }
          toast.success("Product added to cart successfully!");
        },
        (error) => {
          console.log(error);
          toast.error("Failed to add product to cart. Please try again!");
        }
      );
    }
  };

  return (
    <>
      <Toaster />
      {product ? (
        <div>
          <h2 className="text-[20px]">{product?.attributes?.title}</h2>
          <h2 className="text-[20px] text-gray-400">
            {product?.attributes?.category}
          </h2>
          <h2 className="text-[20px] mt-5 text-[#555]">
            {product?.attributes?.description[0]?.children[0]?.text}
          </h2>
          <h2 className="text-[32px] mt-5 font-medium text-slate-800">
            ${product?.attributes?.pricing}
          </h2>
          <button
            className="flex gap-2 p-3 px-10 mt-5 bg-primary hover:bg-primary/95 text-white rounded-lg"
            onClick={onAddtoCartClick}
          >
            <ShoppingCartIcon />
            Add to cart
          </button>
        </div>
      ) : (
        <SkeletonProductEffect />
      )}
    </>
  );
};

export default ProjectInfo;
