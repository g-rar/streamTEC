export interface User {
    subscription: "demand"|"music"|"video"|"premium"
    phoneNumber: string
    birthDate: Date
    city: string
    country: string
    direction: string
    email: string
    lastName: string
    name: string
    id: string
    ownedProducts: string[]
}

