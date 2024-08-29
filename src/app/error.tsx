'use client';

import Image from 'next/image';

export default function Error() {
    const contactEmail: string = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '';

    return (
        <div className="error-page">
            <Image
                src="/images/error-sign.png"
                width={82}
                height={73}
                alt="Error sign image"
            />
            <p className="error-page-text">Something went wrong</p>
            <p className="error-page-contact">If this problem persists, contact us at {contactEmail}</p>
        </div>
    );
}
