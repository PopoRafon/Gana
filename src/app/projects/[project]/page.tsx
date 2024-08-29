import { authenticate } from '@/lib/auth';
import { redirect } from 'next/navigation';
import styles from './page.module.css';
import prisma from '@/lib/db';
import Tasks from './_components/tasks';

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

async function getTasks(projectId: string) {
    const tasks: Array<Record<string, string | string[]>> = await prisma.$queryRaw`
        SELECT Task.status, JSON_ARRAYAGG(Task.description) AS tasks
        FROM Task
        WHERE Task.projectId = ${projectId}
        GROUP BY Task.status
    `;

    return tasks;
}

export default async function Project({ params }: ProjectProps) {
    if (!params || !await isUserAllowed(params.project)) {
        redirect('/');
    }

    const tasks = await getTasks(params.project);
    const pending = tasks.filter(obj => obj.status === 'pending')[0].tasks as string[];
    const inProgress = tasks.filter(obj => obj.status === 'inProgress')[0].tasks as string[];
    const done = tasks.filter(obj => obj.status === 'done')[0].tasks as string[];

    return (
        <main className="page-dark-bg">
            <section className={styles.container}>
                <Tasks
                    type="Pending"
                    tasks={pending}
                />
                <Tasks
                    type="In Progress"
                    tasks={inProgress}
                />
                <Tasks
                    type="Done"
                    tasks={done}
                />
            </section>
        </main>
    );
}
