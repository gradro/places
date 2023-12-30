import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTrigger
} from "@/components/ui/sheet"
import Image from "next/image"
import NavLinks from "./NavLinks"

const MobileNavigation = () => {
  return (
    <Sheet>
        {/* Mobile Navigation Trigger */}
        <SheetTrigger asChild>
            <button 
                aria-label="Open Mobile navigation" 
                className="w-[3rem] h-[3rem] bg-transparent border-0 p-2 md:hidden"
            >
                <span className="bg-black h-[1px] w-full block mb-2"></span>
                <span className="bg-black h-[1px] w-[85%] block mb-2"></span>
                <span className="bg-black h-[1px] w-[65%] block"></span>
            </button>
        </SheetTrigger>
        <SheetContent className="py-4 px-2">
            <SheetHeader className="border-b pb-4">
                {/* App Logo */}
                <Image 
                    src="/assets/logo/logo-small.png"
                    alt="Places logo"
                    width={60}
                    height={30}
                />
            </SheetHeader>
            <SheetDescription className="pt-4">
                <NavLinks/>
            </SheetDescription>
        </SheetContent>
    </Sheet>
  )
}

export default MobileNavigation