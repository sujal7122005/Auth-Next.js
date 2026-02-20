import { NextResponse, NextRequest } from "next/server";

import jwt from 'jsonwebtoken';

export async function getDataFromToken(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || "";
        console.log("Token from cookie:", token);

        if (!token) {
            throw new Error("No token provided");
        }

        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

        console.log("Decoded Token in helper:", decodedToken);
        return decodedToken.userId;

    } catch (error: any) {
        return NextResponse.json({ message: 'Error getting data from token', error: error.message }, { status: 500 });
    }
}