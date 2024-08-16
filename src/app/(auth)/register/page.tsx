'use client';

import { UserContextProvider } from '@/contexts/userContext';
import Form from './_components/form';

export default function Register() {
    return (
        <main className="page-dark-bg">
            <section className="auth-form-container">
                <h3 className="auth-form-header">Register your account</h3>
                <UserContextProvider>
                    <Form />
                </UserContextProvider>
            </section>
        </main>
    );
}
