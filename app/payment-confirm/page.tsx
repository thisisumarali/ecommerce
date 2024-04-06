import Image from "next/image";
import React from "react";
import Link from "next/link";
const PaymentConfirm = () => {
  return (
    <div className="text-green-500 text-4xl flex flex-col transition-all items-center pt-12 font-semibold  mt-2 h-[100vh]">
      <Image src="/check.png" alt="check" width={175} height={175} />
      Payment Confirmed
      <Link href="/">
        <p className="text-[#555] text-lg">Back to the shopping</p>
      </Link>
    </div>
  );
};

export default PaymentConfirm;
