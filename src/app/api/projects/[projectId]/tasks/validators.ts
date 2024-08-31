import type { Field } from '@/app/api/types/types';
import type { User } from '@prisma/client';
import prisma from '@/lib/db';

type TaskFormData = {
    description: Field;
    status: Field;
}

export async function isTaskFormValid(
    formData: TaskFormData,
    projectId: string | undefined,
    user: User
): Promise<boolean> {
    const { description, status } = formData;

    if (typeof description !== 'string' ||
        description.length < 1 ||
        description.length > 255
    ) {
        return false;
    }

    if (typeof status !== 'string' || (
        status !== 'pending' &&
        status !== 'inProgress' &&
        status !== 'done'
    )) {
        return false;
    }

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

    return true;
}
