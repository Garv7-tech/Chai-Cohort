import jwt from "jsonwebtoken"
import { db } from "../libs/db.js"
import { ApiError } from "../utils/apiError.js"

export const authMiddleware = async (req, res, next) => {
    try {

        // fetch token
        const token = req.cookies.jwt
        // check if token exists or not
        if (!token) {
            throw new ApiError(401, "Unauthorized - No token provided")
        }
        // decode the token
        let decoded

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            throw new ApiError(401, "Unauthorized - Invalid token")
        }

        // find user based on userId
        const user = await db.user.findUnique({
            where: {
                id: decoded.id
            },
            select: {
                id: true,
                image: true,
                name: true,
                email: true,
                role: true
            }
        })

        // check if user exists or not
        if (!user) {
            throw new ApiError(404, "User not found")
        }
        // set user in request object
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(500, "Error authenticating user", error)
    }
}