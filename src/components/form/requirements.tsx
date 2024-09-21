import style from './form.module.css';

type RequirementsProps = {
    requirements: string[];
    showRequirements: boolean;
}

export default function Requirements({ requirements, showRequirements }: RequirementsProps) {
    return (
        <ul
            className={style.requirements}
            style={{ maxHeight: `${showRequirements ? '60px' : '0px'}` }}
        >
            {requirements.map(requirement => (
                <li key={requirement}>{requirement}</li>
            ))}
        </ul>
    );
}
