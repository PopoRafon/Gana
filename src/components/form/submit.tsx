import styles from './form.module.css';

type SubmitProps = {
    value: string;
    disabled?: boolean;
}

export default function Submit({ value, disabled=false }: SubmitProps) {
    return (
        <input
            type="submit"
            className={styles.submit}
            value={value}
            disabled={disabled}
        />
    );
}
