export type CreateUserParams = {
    username: string
    password: string
    email?: string
    photo?: string
}

export type CreatePlaceParams = {
    title: string
    description: string
    countryCode: string
    mainImage: string
    images?: [ url: string ],
    creator: {
        _id: string,
        username: string,
        email: string
    }
}