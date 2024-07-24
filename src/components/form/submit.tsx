import styles from './form.module.css';

type SubmitProps = {
    value: string;
}

export default function Submit({ value }: SubmitProps) {
    return (
        <input
            type="submit"
            className={styles.submit}
            value={value}
        />
    );
}
