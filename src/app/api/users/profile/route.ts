import connectToDatabase from "@/src/DBConfig/DbConfig";
import User from "@/src/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/src/helpers/getDataFromToken";

export async function POST(request: NextRequest) {
    try {
        const decodedToken = await getDataFromToken(request);
        
        if (!decodedToken || !decodedToken.userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();

        const user = await User.findById(decodedToken.userId).select('-password');

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'User profile fetched successfully', user });

    } catch (error: any) {
        return NextResponse.json({ message: 'Error fetching user profile', error: error.message }, { status: 500 });
    }
}