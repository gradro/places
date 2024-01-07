import Image from "next/image"

const Footer = () => {
  return (
    <footer className="border-t py-6 text-[14px]">
      <div className="container flex flex-col md:flex-row justify-between">
        <figure className="text-center w-[70%] mx-auto md:w-full">
          <Image
            src="/assets/logo/logo-small.png"
            alt="Places logo"
            width={50}
            height={30}
            className="object-cover mx-auto"
          />
          <figcaption className="mt-2">
            <strong className="font-medium">Places</strong>
            <p>Your Social network for discovering places around the world.</p>
          </figcaption>
        </figure>
      </div>

      {/* Copyright section */}
      <div className="text-center mt-4">
        <p>&copy; {new Date().getFullYear()} - All rights reserved</p>
      </div>

    </footer>
  )
}

export default Footer