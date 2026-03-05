import React from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SignupForm } from '@/components/auth/SignupForm';

export const metadata = {
    title: 'Sign Up - SwapSkill',
    description: 'Create a new SwapSkill account',
};

export default function SignupPage() {
    return (
        <AuthLayout
            title="Sign Up"
            subtitle={
                <span className="text-gray-600 text-[15px]">
                    Already have an account?{' '}
                    <Link href="/login" className="text-black font-semibold hover:underline">
                        Log In
                    </Link>
                </span>
            }
        >
            <SignupForm />
        </AuthLayout>
    );
}
