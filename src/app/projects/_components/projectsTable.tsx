import { authenticate } from '@/lib/auth';
import styles from './projects.module.css';
import prisma from '@/lib/db';
import Link from 'next/link';
import ProjectMoreOptions from './projectMoreOptions';

type Project = {
    id: string;
    name: string;
    creator: string;
}

async function getProjects(): Promise<Project[]> {
    const user = await authenticate();

    if (!user) {
        return [];
    }

    const projects: Project[] = await prisma.$queryRaw`
        SELECT p.id, p.name, u.username AS creator
        FROM UserProject up
        JOIN Project p ON up.projectId = p.id
        JOIN User u ON u.id = up.userId
        WHERE up.role = 'creator' AND up.projectId IN (
            SELECT projectId 
            FROM UserProject 
            WHERE userId = ${user.id}
        );
    `;

    return projects;
}

export default async function ProjectsTable() {
    const projects: Project[] = await getProjects();

    return (
        <table className={styles.table}>
            <colgroup>
                <col width="20%" />
                <col width="20%" />
                <col width="15%" />
            </colgroup>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Creator</th>
                    <th>More Options</th>
                </tr>
            </thead>
            <tbody>
                {projects.map(project => (
                    <tr key={project.id}>
                        <td>
                            <Link
                                href={`/projects/${project.id}`}
                            >
                                {project.name}
                            </Link>
                        </td>
                        <td>{project.creator}</td>
                        <td style={{ overflow: 'visible' }}>
                            <ProjectMoreOptions
                                projectId={project.id}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
