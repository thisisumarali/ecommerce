import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
const Mobnavbar = () => {
  return (
    <Sheet>
      <SheetContent>
        <Link href="/Home">Home</Link>
        <Link href="/Mens">Mens</Link>
        <Link href="/Womens">Womens</Link>
        <Link href="/Unisex">Unisex</Link>
      </SheetContent>
    </Sheet>
  );
};

export default Mobnavbar;
