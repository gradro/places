"use client";

import { useSession } from "next-auth/react";

const SignedOut = ({ children }: { children: React.ReactNode }) => {

    const session = useSession()
    console.log(session)

    if( session?.status === "unauthenticated" ) {
        return (
            <>{children}</>
        )
    }
    return <></>
}

export default SignedOut