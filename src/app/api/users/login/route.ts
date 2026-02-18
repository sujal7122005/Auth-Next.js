import connectToDatabase from "@/src/DBConfig/DbConfig";
import User from "@/src/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/src/helpers/mailer";
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
        }

        if (!user.isVerified) {
            await sendEmail(email, "Verification Email", user._id);
            return NextResponse.json({ message: 'Email not verified. A new verification email has been sent.' }, { status: 400 });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

        const response = NextResponse.json({ message: 'Login successful', token }, { status: 200 });
        
        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60,
        });

        return response;




    } catch (error: any) {
        return NextResponse.json({ message: 'login error', error: error.message }, { status: 500 });
    }
}