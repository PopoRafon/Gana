import styles from './modal.module.css';
import Image from 'next/image';
import Link from 'next/link';

type CloseModalButtonProps = {
    returnURL: string;
}

export default function CloseModalButton({ returnURL }: CloseModalButtonProps) {
    return (
        <Link
            href={returnURL}
            className={styles['close-modal-button']}
        >
            <Image
                src="/images/icons/close.svg"
                width={20}
                height={20}
                alt="Close modal image"
            />
        </Link>
    );
}
