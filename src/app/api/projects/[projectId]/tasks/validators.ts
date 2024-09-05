import type { Field } from '@/app/api/types/types';
import type { User } from '@prisma/client';
import prisma from '@/lib/db';

type TaskFormData = {
    description: Field;
    status: Field;
}

export async function isCreateTaskFormValid(
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

export async function isUpdateTaskFormValid(
    formData: TaskFormData,
    projectId: string | undefined,
    taskId: number,
    user: User
): Promise<boolean> {
    const { description, status } = formData;

    if (typeof description === 'string' && (
        description.length < 1 ||
        description.length > 255
    )) {
        return false;
    }

    if (typeof status === 'string' && (
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

    const task = await prisma.task.findFirst({
        where: {
            id: taskId
        }
    });

    if (!task || task.projectId !== project.projectId) {
        return false;
    }

    return true;
}

export async function isDeleteTaskFormValid(
    projectId: string | undefined,
    taskId: number,
    user: User
): Promise<boolean> {
    if (typeof projectId !== 'string') {
        return false;
    }

    const project = await prisma.userProject.findFirst({
        where: {
            projectId,
            userId: user.id
        }
    });

    if (!project) {
        return false;
    }

    const task = await prisma.task.findFirst({
        where: {
            id: taskId
        }
    });

    if (!task || task.projectId !== project.projectId) {
        return false;
    }

    return true;
}
