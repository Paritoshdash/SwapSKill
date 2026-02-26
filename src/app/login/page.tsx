import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata = {
    title: 'Login - SwapSkill',
    description: 'Sign in to your SwapSkill account',
};

export default function LoginPage() {
    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to continue swapping skills"
        >
            <LoginForm />
        </AuthLayout>
    );
}
