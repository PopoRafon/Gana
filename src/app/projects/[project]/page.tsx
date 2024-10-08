import type { ClientTask } from './_components/tasks/types';
import { authenticate } from '@/lib/auth';
import { redirect } from 'next/navigation';
import styles from './page.module.css';
import prisma from '@/lib/db';
import Tasks from './_components/tasks/tasks';
import KanbanBoardHeader from './_components/header/kanbanBoardHeader';

type ProjectProps = {
    params: Record<string, string> | undefined;
}

async function isUserAllowed(projectId: string): Promise<boolean> {
    const user = await authenticate();

    if (!user) {
        return false;
    }

    const project = await prisma.userProject.findFirst({
        where: {
            userId: user.id,
            projectId
        }
    });

    return project !== null;
}

async function getTasks(projectId: string): Promise<Record<string, ClientTask[]>> {
    const tasks: Array<Record<string, string | ClientTask[]>> = await prisma.$queryRaw`
        SELECT Task.status, JSON_ARRAYAGG(JSON_OBJECT('id', Task.id, 'description', Task.description)) AS tasks
        FROM Task
        WHERE Task.projectId = ${projectId}
        GROUP BY Task.status
    `;
    const filteredTasks = tasks.reduce((prev, curr) => {
        prev[curr.status as string] = curr.tasks;

        return prev;
    }, { pending: [], inProgress: [], done: [] }) as Record<string, ClientTask[]>;

    return filteredTasks;
}

export default async function Project({ params }: ProjectProps) {
    if (!params || !await isUserAllowed(params.project)) {
        redirect('/');
    }

    const tasks = await getTasks(params.project);
    const pending = tasks.pending;
    const inProgress = tasks.inProgress;
    const done = tasks.done;

    return (
        <main className="page-dark-bg">
            <div className={styles.container}>
                <KanbanBoardHeader
                    project={params.project}
                />
                <div className={styles['tasks-container']}>
                    <Tasks
                        header="Pending"
                        type="pending"
                        tasks={pending}
                    />
                    <Tasks
                        header="In Progress"
                        type="inProgress"
                        tasks={inProgress}
                    />
                    <Tasks
                        header="Done"
                        type="done"
                        tasks={done}
                    />
                </div>
            </div>
        </main>
    );
}
