import connectToDatabase from "@/src/DBConfig/DbConfig";
import User from "@/src/models/userModel";
import { NextResponse, NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const reqBody = await request.json();
        const { token } = reqBody;

        if (!token) {
            return NextResponse.json({ message: 'Verification token is required' }, { status: 400 });
        }

        const verifiedUser = await User.findOne(
            {
                verificationToken: token,
                verificationTokenExpiry: { $gt: Date.now() }
            }
        )

        if (!verifiedUser) {
            return NextResponse.json({ message: 'Invalid or expired verification token' }, { status: 400 });
        }

        verifiedUser.isVerified = true;
        verifiedUser.verificationToken = undefined;
        verifiedUser.verificationTokenExpiry = undefined;

        await verifiedUser.save();
        return NextResponse.json({ message: 'User verified successfully' }, { status: 200 });

    } catch (error) {
        console.error("Error verifying user:", error);
        return NextResponse.json({ message: 'Error verifying user' }, { status: 500 });

    }
}