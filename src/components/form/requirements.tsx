import style from './form.module.css';

type RequirementsProps = {
    requirements: string[];
}

export default function Requirements({ requirements }: RequirementsProps) {
    return (
        <ul className={style.requirements}>
            {requirements.map(requirement => (
                <li key={requirement}>{requirement}</li>
            ))}
        </ul>
    );
}
