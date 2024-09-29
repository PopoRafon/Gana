import type { Field } from '@/app/api/types/types';
import type { User } from '@prisma/client';
import prisma from '@/lib/db';

type ProjectUserFormData = {
    username: Field;
    role: Field;
}

export async function isCreateProjectUserFormValid(
    formData: ProjectUserFormData,
    user: User,
    projectId: string | undefined
): Promise<boolean> {
    const { username, role } = formData;

    if (typeof projectId !== 'string') {
        return false;
    }

    const project = await prisma.userProject.findFirst({
        where: {
            userId: user.id,
            projectId
        }
    });

    if (!project) {
        return false;
    }

    if ((role !== 'member' || (project.role !== 'creator' && project.role !== 'admin')) &&
        (role !== 'admin' || project.role !== 'creator')
    ) {
        return false;
    }

    if (typeof username !== 'string' ||
        username.length === 0
    ) {
        return false;
    }

    const userToAdd = await prisma.user.findFirst({
        where: {
            username
        }
    });

    if (!userToAdd) {
        return false;
    }

    const projectCheck = await prisma.userProject.findFirst({
        where: {
            userId: userToAdd.id,
            projectId
        }
    });

    if (projectCheck) {
        return false;
    }

    return true;
}
