import Image from 'next/image';
import styles from './header.module.css';
import prisma from '@/lib/db';
import Link from 'next/link';

type KanbanUser = {
    username: string;
    avatar: string;
}

async function getUsers(project: string): Promise<KanbanUser[]> {
    const users: KanbanUser[] = await prisma.$queryRaw`
        SELECT u.username, u.avatar
        FROM User u
        JOIN UserProject up ON u.id = up.userId
        WHERE up.projectId = ${project}
    `;

    return users;
}

type KanbanBoardHeaderProps = {
    project: string;
}

export default async function KanbanBoardHeader({ project }: KanbanBoardHeaderProps) {
    const users = await getUsers(project);

    return (
        <div className={styles['kanban-board-header']}>
            <h2 className={styles['kanban-board-header-text']}>Kanban Board</h2>
            <div className={styles['kanban-board-header-body']}>
                <label className={styles['search-task-label']}>
                    <Image
                        src="/images/icons/search.svg"
                        width={18}
                        height={18}
                        alt="Search image"
                        className={styles['search-task-image']}
                    />
                    <input
                        placeholder="Search"
                        className={styles['search-task-input']}
                    />
                </label>
                <div className={styles['project-users-list']}>
                    {users.map(user => (
                        <div className={styles['project-users-list-user-container']} key={user.username}>
                            <Image
                                src={user.avatar}
                                width={26}
                                height={26}
                                className={styles['project-users-list-user-image']}
                                alt="User avatar"
                                title={user.username}
                            />
                        </div>
                    ))}
                    <Link
                        href={`/projects/${project}?modal=users`}
                        title="Add User"
                        className={styles['project-users-list-add-user-button']}
                    >
                        <Image
                            src="/images/icons/add-user.svg"
                            width={26}
                            height={26}
                            className={styles['project-users-list-user-image']}
                            alt="Add user image"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}
