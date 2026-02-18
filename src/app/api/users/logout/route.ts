import connectToDatabase from "@/src/DBConfig/DbConfig";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();
        const token = request.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: 'No token provided' }, { status: 401 });
        }
        const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
        response.cookies.set("token", "", {
            httpOnly: true,
            maxAge: 0,
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({ message: 'Logout error', error: error.message }, { status: 500 });
    }
}