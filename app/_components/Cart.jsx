// Cart component
import React, { useContext, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { CartContext } from "../_context/CartContext";

const Cart = () => {
  const { cart } = useContext(CartContext);

  useEffect(() => {
    cart && console.log(cart);
  }, [cart]);

  return (
    <div>
      <Sheet className="bg-slate-900">
        <SheetTrigger className="flex gap-1 cursor-pointer">
          {" "}
          <ShoppingCart /> ({cart?.length})
        </SheetTrigger>
        <SheetContent className="sm:max-w-lg w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-slate-900 text-2xl">
              Cart Items
            </SheetTitle>
          </SheetHeader>
          <div className="h-full flex flex-col justify-between">
            <div className="mt-6 space-y-6 overflow-auto">
              <ul className="space-y-4">
                {cart.map((item, index) => (
                  <li className="flex items-center gap-4" key={index}>
                    <img
                      src={
                        item?.product?.attributes?.banner?.data?.attributes?.url
                      }
                      alt=""
                      className="size-28 rounded object-cover"
                    />
                    <div>
                      <h3 className="text-lg text-secondary font-bold line-clamp-1">
                        {item?.product?.attributes?.title}
                      </h3>
                      <dl className="mt-0.5 space-y-px text-base text-secondary/80">
                        <div>
                          <dt className="inline font-bold">
                            {item?.product?.attributes?.category}
                          </dt>
                        </div>
                        <div>
                          <dt className="inline">
                            Rs {item?.product?.attributes?.pricing}
                          </dt>
                        </div>
                      </dl>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4 text-center mt-5   border-t border-gray-200 px-4 py-6 sm:px-6">
              <Link
                href="/cart"
                className="block rounded border border-green-600 px-5 py-3 text-sm text-white bg-green-600 transition hover:ring-1 hover:ring-green-400"
              >
                View my cart ({cart?.length})
              </Link>

              <Link
                href="#"
                className="inline-block text-sm text-green-500 underline underline-offset-4 transition hover:text-green-600"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Cart;
