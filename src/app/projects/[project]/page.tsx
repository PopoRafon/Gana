import { authenticate } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';

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
    const tasks = await prisma.task.findMany({
        where: {
            projectId
        },
        select: {
            description: true,
            status: true
        }
    });

    return tasks;
}

export default async function Project({ params }: ProjectProps) {
    if (!params || !await isUserAllowed(params.project)) {
        redirect('/');
    }

    const tasks = await getTasks(params.project);

    return (
        <main className="page-dark-bg">
            {tasks.map((task, index) => (
                <div key={index}>
                    {task.description}
                </div>
            ))}
        </main>
    );
}
