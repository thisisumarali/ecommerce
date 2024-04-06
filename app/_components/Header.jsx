// Header component
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import Cart from "./Cart";
import GlobalApi from "../_utlis/GlobalApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartContext } from "../_context/CartContext";

const Header = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const cartContext = useContext(CartContext);
  const cart = cartContext.cart;
  const setCart = cartContext.setCart;

  const openCart = () => {
    setIsOpenCart(true);
  };

  const getCartItem = () => {
    GlobalApi.getUserCartItem(user.primaryEmailAddress.emailAddress).then(
      (resp) => {
        const result = resp.data.data;
        result &&
          result.forEach((prd) => {
            setCart((cart) => [
              ...cart,
              {
                id: prd.id,
                product: prd.attributes.products.data[0],
              },
            ]);
            console.log(prd.attributes.products);
          });
      }
    );
  };

  useEffect(() => {
    setIsLogin(router.pathname === "/sign-in");
  }, [router.pathname]);

  useEffect(() => {
    user && getCartItem();
  }, [user]);

  useEffect(() => {
    if (cart.length > 0) {
      openCart();
    }
  }, [cart]);

  return (
    !isLogin && (
      <>
        <header className="bg-gray-50 shadow-sm relative">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex-1 md:flex md:items-center md:gap-12">
                <Link href="/">
                  <Image src="/logo.svg" alt="Logo" width={117} height={117} />
                </Link>
              </div>

              <div className="md:flex md:items-center md:gap-12">
                <nav aria-label="Global" className="hidden md:block">
                  <ul className="flex items-center gap-6 text-sm">
                    <li>
                      <Link
                        className="text-secondary transition font-bold hover:text-secondary/75"
                        href="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-secondary transition font-bold hover:text-secondary/75"
                        href="/Mens"
                      >
                        Mens
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-secondary transition font-bold hover:text-secondary/75"
                        href="/Womens"
                      >
                        Womens
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-secondary transition font-bold hover:text-secondary/75"
                        href="/Unisex"
                      >
                        Unisex
                      </Link>
                    </li>
                  </ul>
                </nav>
                <div className="flex items-center gap-4">
                  {!user ? (
                    <div
                      className="sm:flex sm:
                    gap-4"
                    >
                      <Link
                        className="rounded-md bg-primary px-5 py-2.5 text-sm hover:bg-primary/75 font-medium text-white shadow"
                        href="/sign-in"
                      >
                        Login
                      </Link>
                      <div className="hidden sm:flex">
                        <Link
                          className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary"
                          href="/sign-up"
                        >
                          Register
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-5">
                      <div className="hidden sm:flex">
                        <UserButton />
                      </div>
                      {isOpenCart && <Cart />}
                    </div>
                  )}
                  <div className="block md:hidden">
                    <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  );
};

export default Header;
