"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/userverification', {token})
            setVerified(true);
            toast.success("Email verified successfully!", {duration: 3000});
            router.push('/login');
            
        } catch (error:any) {
            setError(true);
            toast.error("Error verifying email", {duration: 3000});
            
        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950">
            {/* Ambient background blobs */}
            <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" style={{ animation: 'float 8s ease-in-out infinite' }} />
            <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" style={{ animation: 'float 8s ease-in-out infinite 4s' }} />

            <div className="relative z-10 w-full max-w-lg rounded-2xl border border-gray-800 bg-gray-900/60 p-8 shadow-2xl backdrop-blur-sm text-center" style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) both' }}>
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-2xl backdrop-blur-sm" style={{ animation: 'scaleIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
                    ✉️
                </div>

                <h1 className="mb-4 text-3xl font-bold tracking-tight text-white">Verify Email</h1>

                <p className="mb-2 text-sm leading-relaxed text-gray-400">Check your mailbox — a verification email has been sent to your email address.</p>
                <p className="mb-6 text-sm leading-relaxed text-gray-500">You can copy the link in your browser to verify, or click the <span className="font-semibold text-gray-300">link sent to your mail</span>.</p>

                <div className="mb-6 overflow-hidden rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3">
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-500">Token</p>
                    <p className="break-all text-sm font-mono text-amber-400">{token ? `${token}` : "token not found"}</p>
                </div>

                {verified && (
                    <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4 mb-4">
                        <h2 className="mb-2 text-xl font-semibold text-green-400">Email Verified</h2>
                        <Link href="/login" className="font-medium text-blue-400 transition-colors hover:text-blue-300">
                            Go to Login
                        </Link>
                    </div>
                )}
                {error && (
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                        <h2 className="text-xl font-semibold text-red-400">Verification Failed</h2>
                    </div>
                )}
            </div>
        </div>
    )

}