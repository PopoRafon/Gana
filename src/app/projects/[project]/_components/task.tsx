import styles from './project.module.css';
import Image from 'next/image';

type TaskProps = {
    task: string;
}

export default function Task({ task }: TaskProps) {
    return (
        <li className={styles.task}>
            <span>{task}</span>
            <button
                className={styles['task-settings']}
            >
                <Image
                    src="/images/icons/settings.svg"
                    width={16}
                    height={16}
                    alt="Settings image"
                />
            </button>
        </li>
    );
}
