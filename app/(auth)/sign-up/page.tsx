import AuthForm from "@/components/shared/Auth/AuthForm"
import Image from "next/image"

const SignUp = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-white lg:w-[60%] lg:mx-auto h-screen flex flex-col justify-center p-6">
            <AuthForm type="signUp" />
        </div>
        <figure className="relative">
          <Image 
            src="/assets/sign-image.jpg" 
            alt="Sign in"
            width={1000}
            height={800}
            loading="eager"
            className="absolute w-full h-full top-0 left-0 right-0 bottom-0 object-cover"
          />
        </figure>
    </section>
  )
}

export default SignUp