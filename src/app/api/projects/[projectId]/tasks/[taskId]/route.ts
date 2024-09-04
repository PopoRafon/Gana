import type { Task } from '@prisma/client';
import { authenticate } from '@/lib/auth';
import { isUpdateTaskFormValid } from '../validators';
import prisma from '@/lib/db';

export async function PATCH(
    request: Request,
    { params }: { params: { projectId: string | undefined, taskId: string | undefined } }
) {
    const user = await authenticate();

    if (!user) {
        return Response.json({
            data: 'You have to be authenticated in order to update task.',
            status: 'error'
        }, { status: 403 });
    }

    const formData = await request.json();
    const taskId = Number(params.taskId);
    const { projectId } = params;

    if (!await isUpdateTaskFormValid(formData, projectId, taskId, user)) {
        return Response.json({
            data: 'Error occurred when trying to update task.',
            status: 'error'
        }, { status: 400 });
    }

    const data: Partial<Task> = {};

    if (formData.description) {
        data.description = formData.description;
    }

    if (formData.status) {
        data.status = formData.status;
    }

    await prisma.task.update({
        where: {
            id: taskId
        },
        data
    });

    return Response.json({
        data: 'Your task has been successfully updated.',
        status: 'error'
    }, { status: 200 });
}
