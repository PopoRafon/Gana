import { authenticate } from '@/lib/auth';
import styles from './projects.module.css';
import prisma from '@/lib/db';

async function getProjects(): Promise<string[]> {
    const user = await authenticate();

    if (!user) {
        return [];
    }

    const projects = await prisma.userProject.findMany({
        where: {
            userId: user.id
        },
        select: {
            project: {
                select: {
                    name: true
                }
            }
        }
    });

    return projects.map(project => project.project.name);
}

export default async function ProjectsList() {
    const projects = await getProjects();

    return (
        <ul className={styles.list}>
            {projects.map(project => (
                <li key={project}>
                    {project}
                </li>
            ))}
        </ul>
    );
}
