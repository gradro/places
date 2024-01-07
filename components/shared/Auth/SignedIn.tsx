"use client";

import { useSession } from "next-auth/react";

const SignedIn = ({ children }: { children: React.ReactNode }) => {

    const session = useSession()
    console.log(session)

    if( session?.status === "authenticated" ) {
        return (
            <>{children}</>
        )
    } 
    return <></>
}

export default SignedIn