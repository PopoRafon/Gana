import styles from './form.module.css';

type SubmitProps = {
    value: string;
    disabled?: boolean;
    type?: 'primary' | 'danger';
}

export default function Submit({ value, disabled=false, type='primary' }: SubmitProps) {
    return (
        <input
            type="submit"
            className={`${styles.submit} ${styles[`submit-${type}`]}`}
            value={value}
            disabled={disabled}
        />
    );
}
