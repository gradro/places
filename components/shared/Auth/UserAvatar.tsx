"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";
import { userDropdownItems } from "@/constants";

type Props = {
    dropdown?: boolean
    avatarSize?: number
    src?: string 
    alt?: string
}

const Avatar = ({ avatarSize, src, alt }: Props) => {
  
    return (
        <Image
            src={`${src ? src : "/assets/avatar-placeholdr.svg"}`}
            alt={`${src ? alt : "Placeholder Avatar"}`}
            width={avatarSize ? avatarSize : 48}
            height={avatarSize ? avatarSize: 48}
            className="rounded-full object-cover min-w-12 min-h-12"
        />
    )
    
}

const UserAvatar = ({ dropdown, avatarSize }: Props) => {

    const [isOpen, setOpen] = useState(false);
    const { data: session, status } = useSession();

    if(status === "authenticated" && session) {
        return (

            dropdown ? (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar 
                            avatarSize={avatarSize} 
                            src={session.user.photo} 
                            alt={`${session.user.username}'s avatar`}
                        />                    
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px] rounded-sm">
                        {userDropdownItems && userDropdownItems.map((item) => (
                            <DropdownMenuItem asChild className="cursor-pointer hover:bg-grey-400 focus:bg-grey-400 hover:text-black focus:text-black">
                                <Link href={item.path}>
                                    {item.label}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                            className="cursor-pointer hover:bg-grey-400 focus:bg-grey-400 hover:text-black focus:text-black"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        >
                            Sign out
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Avatar 
                    avatarSize={avatarSize} 
                    src={session.user.photo} 
                    alt={`${session.user.username}'s avatar`}
                />
            )
            
        )
    } return <></>
}

export default UserAvatar