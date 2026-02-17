import connectToDatabase from "@/src/DBConfig/DbConfig";
import User from "@/src/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/src/helpers/mailer";

connectToDatabase();

async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        const existingUser = await User.findOne(email)

        if(existingUser){
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        await sendEmail(email, "Verification Email", savedUser._id);

        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
        
    } catch (error) {
        console.log('error to register the user ', error);
        return NextResponse.json({ message: 'Error registering user' }, { status: 500 });
    }
};