"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import * as z from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../../ui/input";
import Image from "next/image";
import { Button } from "../../ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { createUser } from "@/lib/actions/user.action";
import { SignInFormSchema, SignUpFormSchema } from "@/lib/formSchema";
import { useState } from "react";

type AuthFormProps = {
    type: "signIn" | "signUp"
} 

const AuthForm = ({ type }: AuthFormProps) => {

    const [authError, setAuthError] = useState(false)
    const router = useRouter();

    // Set form schema based on type (signIn or signUp form)
    const formSchema = type === "signIn" ? SignInFormSchema : SignUpFormSchema;

    // Set default form values based on type (signIn or signUp form)
    let defaultValues;
    if (type === "signIn") {
        defaultValues = {
            username: "", password: ""
        }
    } else {
        defaultValues = {
            username: "", password: "", email: ""
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    })

    // Form submit handler
    const handleSignIn = async (values: z.infer<typeof formSchema>) => {
        await signIn("credentials", {
            username: values.username,
            password: values.password,
            redirect: false
        })
        .then((res) => {
            if(res?.ok) {
                console.log(res)
                return router.push("/");
            }
            return setAuthError(true);
        })
    }

    // Form submit handler
    const handleSignUp = async (values: z.infer<typeof formSchema>) => {
        await createUser({ user: values })
    }

    return (
        <>
            <figure className="flex flex-col text-[16px] text-center items-center mb-10">
                <Image
                    src="/assets/logo/logo-small.png"
                    alt="Places logo"
                    width={100}
                    height={80}
                    className="mb-4"
                    loading="eager"
                />
                <figcaption>
                    <strong className="font-medium mb-1">Places</strong>
                    <p>Your Social network for discovering places <br/> around the world.</p>
                </figcaption>
            </figure>
            <h1 className="h4 mt-5 mb-5">{type == "signIn" ? "Sign in" : "Sign up"}</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit( type === "signUp" ? handleSignUp : handleSignIn )}>
                    {type === "signUp" && 
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    }
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Create Account / Already has account link */}
                    <Link href={type === "signIn" ? "/sign-up" : "/sign-in"} className="block mb-4 text-[14px]">
                        {type === "signIn" ? "Don't have an account?" : "Already have an account?"}
                    </Link>

                    {/* Submit button */}
                    <Button type="submit">
                        {type === 'signIn' ? 'Sign in' : 'Sign up'}
                    </Button>

                    {authError && (
                        <p className="text-sm font-medium text-destructive mt-5">
                            Username or Password don't match. Please try again.
                        </p>
                    )}

                </form>
            </Form>
        </>
    )
}

export default AuthForm