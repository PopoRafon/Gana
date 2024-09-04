import { isCreateTaskFormValid } from './validators';
import { authenticate } from '@/lib/auth';
import prisma from '@/lib/db';

export async function POST(
    request: Request,
    { params }: { params: { projectId: string | undefined } }
) {
    const user = await authenticate();

    if (!user) {
        return Response.json({
            data: 'You have to be authenticated in order to create new task.',
            status: 'error'
        }, { status: 403 });
    }

    const formData = await request.json();
    const projectId: string | undefined = params.projectId;

    if (!await isCreateTaskFormValid(formData, projectId, user)) {
        return Response.json({
            data: 'Error occurred when trying to create new task.',
            status: 'error'
        }, { status: 400 });
    }

    await prisma.task.create({
        data: {
            creatorId: user.id,
            projectId: projectId as string,
            description: formData.description,
            status: formData.status
        }
    });

    return Response.json({
        data: 'Your task has been successfully created.',
        status: 'success'
    }, { status: 200 });
}
