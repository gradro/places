import * as z from 'zod';

// Sign up form schema
export const SignUpFormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long."
    }),
    email: z.string()
})

// Sign in form schema
export const SignInFormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long."
    }),
})

// Create place form schema
export const CreatePlaceFormSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters'),
    countryCode: z.string(),
    mainImage: z.string(),
    images: z.array(z.object({ url: z.string() }))
  })