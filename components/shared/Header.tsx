import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button";
import NavLinks from "./Navigation/NavLinks";
import { CiLogin } from "react-icons/ci";
import MobileNavigation from "./Navigation/MobileNavigation";

const Header = () => {

  const isLoggedIn = false;

  return (
    <header className="bg-white border-b pt-2 pb-2">
      <div className="container">

        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link href="/" title="To Homepage">
            <Image 
              src="/assets/logo/logo-small.png"
              alt="Places logo" 
              width={60}
              height={30}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <NavLinks/>
          </nav>

          <div className="flex gap-4 md:gap-6 items-center">
            {/* Add new place - button (desktop only) */}
            <Button className="hidden md:block" asChild variant="default">
              <Link href="/add-place">Add new place</Link>
            </Button>
            {/* User Profile / Login */}
            {isLoggedIn ? (
              <Link title="Show my profile" href="/profile">
                <Image 
                  src="/assets/uifaces-popular-image.jpg" 
                  alt="Placeholder Avatar"
                  width={48}
                  height={48}
                  className="rounded-full object-cover w-12 h-12"
                />
              </Link>
            ): (
              <Link title="Sign in" href="/sign-in">
                <CiLogin className="w-8 h-8" />
              </Link>
            )}

            {/* Mobile Navigation */}
            <MobileNavigation />
          </div>

        </div>

      </div>
    </header>
  )
}

export default Header