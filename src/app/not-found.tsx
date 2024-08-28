import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
    return (
        <main>
            <Image
                src="/images/not-found.png"
                width={197}
                height={170}
                alt="Not found image"
            />
            <p className="page-not-found-information">The page you were looking for does not exist</p>
            <Link
                href="/"
                className="page-not-found-go-home-button"
            >
                Go Home
            </Link>
        </main>
    );
}
