import React from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata = {
    title: 'Login - SwapSkill',
    description: 'Sign in to your SwapSkill account',
};

export default function LoginPage() {
    return (
        <AuthLayout
            title="Log In"
            subtitle={
                <span className="text-gray-600 text-[15px]">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="text-black font-semibold hover:underline">
                        Create An Account
                    </Link>
                </span>
            }
        >
            <LoginForm />
        </AuthLayout>
    );
}
