import type { Field } from '@/app/api/types/types';
import type { User } from '@prisma/client';
import prisma from '@/lib/db';

type ProjectFormData = {
    name: Field;
}

export function isCreateProjectFormValid(formData: ProjectFormData): boolean {
    const { name } = formData;

    if (typeof name !== 'string' ||
        name.length < 1 ||
        name.length > 255
    ) {
        return false;
    }

    return true;
}

export async function isDeleteProjectFormValid(
    user: User,
    projectId: string | undefined
): Promise<boolean> {
    if (typeof projectId !== 'string') {
        return false;
    }

    const project = await prisma.userProject.findFirst({
        where: {
            userId: user.id,
            projectId
        }
    });

    if (!project || project.role !== 'creator') {
        return false;
    }

    return true;
}

export async function isUpdateProjectFormValid(
    formData: ProjectFormData,
    user: User,
    projectId: string | undefined
): Promise<boolean> {
    if (typeof projectId !== 'string') {
        return false;
    }

    const { name } = formData;

    if (typeof name === 'string' && (
        name.length < 1 ||
        name.length > 255
    )) {
        return false;
    }

    const project = await prisma.userProject.findFirst({
        where: {
            userId: user.id,
            projectId
        }
    });

    if (!project || project.role !== 'creator') {
        return false;
    }

    return true;
}
