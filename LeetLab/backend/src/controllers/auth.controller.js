import bcrypt from "bcryptjs"
import { db } from "../libs/db.js"
import { UserRole } from "../generated/prisma/index.js"
import jwt from "jsonwebtoken"
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/apiError.js"


export const register = async (req, res) => {
    // fetch the data
    const { email, password, name } = req.body
    try {
        // check if user already exists or not
        const existingUser = await db.user.findUnique({
            where: {
                email
            }
        })

        if (existingUser) {
            throw new ApiError(400, "User already exists")
        }
        // hash the password

        const hashedPassword = await bcrypt.hash(password, 10)
        // create a user
        const newUser = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: UserRole.USER
            }
        })
        // create token
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })
        // send token via cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            sameSize: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1000 * 60 * 60 * 24 * 7 //7 days
        })
        // send response
        res.status(201).json(
            new ApiResponse(
                200,
                "User created successfully",
                {
                    user: {
                        id: newUser.id,
                        email: newUser.email,
                        name: newUser.name,
                        role: newUser.role,
                        image: newUser.image
                    }
                }
            )
        )
    } catch (error) {
        throw new ApiError(500, "Error creating user", error)
    }
}

export const login = async (req, res) => {
    // fetch email and password

    const { email, password } = req.body
    try {
        // find user based on email
        const user = await db.user.findUnique({
            where: {
                email
            }
        })

        // check user exists or not
        if (!user) {
            throw new ApiError(401, "User not found")
        }

        // match password
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw new ApiError(401, "Invalid Credentials")
        }
        // create token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })
        // send token via cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        })

        // send response
        res.status(200).json(
            new ApiResponse(
                200,
                "User Logged In Successfully",
                {
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        image: user.image
                    }
                })
        )
    } catch (error) {
        throw new ApiError(500, "Error logging in user", error)
    }
}

export const logout = async (req, res) => {
    try {
        // clear cookie (jwt token)
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development"
        })

        res.status(200).json(
            new ApiResponse(
                200,
                "User logged out successfully",
                {}
            )
        )
    } catch (error) {
        throw new ApiError(500,"Error logging out user",error)
    }
}

export const check = async (req,res) => {
    try {
        res.status(200).json(
            new ApiResponse(
                200,
                "User authenticated successfully",
                {
                    user:req.user
                }
            )
        )
    } catch (error) {
        throw new ApiError(500,"Error checking user",error)
    }
}