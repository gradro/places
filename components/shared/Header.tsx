import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button";
import NavLinks from "./Navigation/NavLinks";
import { CiLogin } from "react-icons/ci";
import MobileNavigation from "./Navigation/MobileNavigation";
import SignedIn from "./Auth/SignedIn";
import SignedOut from "./Auth/SignedOut";
import UserAvatar from "./Auth/UserAvatar";

const Header = () => {

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
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <NavLinks/>
          </nav>

          <div className="flex gap-4 md:gap-6 items-center">
            <SignedIn>
              {/* Add new place - button (desktop only) */}
              <div className="hidden md:block">
                <Button asChild>
                  <Link href="/add-place">Add new place</Link>
                </Button>
              </div>
              {/* User Profile / Login */}
              <UserAvatar dropdown/>
            </SignedIn>
           
            <SignedOut>
              <Button asChild>
                <Link title="Sign in" href="/sign-in">
                  <span className="mr-2">Sign in</span>
                  <CiLogin className="w-7 h-7" />
                </Link>
              </Button>
            </SignedOut>

            {/* Mobile Navigation */}
            <MobileNavigation />

          </div>

        </div>

      </div>
    </header>
  )
}

export default Header