import styles from './project.module.css';
import Task from './task';

type TasksProps = {
    type: string;
    tasks: string[];
}

export default function Tasks({ type, tasks }: TasksProps) {
    return (
        <div className={styles.tasks}>
            <h3 className={styles['tasks-header']}>{type}</h3>
            <ul className={styles['tasks-list']}>
                {tasks.map((task, index) => (
                    <Task
                        task={task}
                        key={index}
                    />
                ))}
            </ul>
        </div>
    );
}
