'use client';

import { UserContextProvider } from '@/contexts/userContext';
import Form from './_components/form';
import styles from './register.module.css';

export default function Register() {
    return (
        <main className="page-dark-bg">
            <section className={styles['form-container']}>
                <h2 className={styles.header}>Register your account</h2>
                <UserContextProvider>
                    <Form />
                </UserContextProvider>
            </section>
        </main>
    );
}
