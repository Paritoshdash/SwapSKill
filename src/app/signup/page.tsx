import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SignupForm } from '@/components/auth/SignupForm';

export const metadata = {
    title: 'Sign Up - SwapSkill',
    description: 'Create a new SwapSkill account',
};

export default function SignupPage() {
    return (
        <AuthLayout
            title="Create an account"
            subtitle="Join the community of skill swappers today"
        >
            <SignupForm />
        </AuthLayout>
    );
}
