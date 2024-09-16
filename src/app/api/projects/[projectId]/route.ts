import { authenticate } from '@/lib/auth';
import { isDeleteProjectFormValid } from '../validators';
import prisma from '@/lib/db';

export async function DELETE(
    request: Request,
    { params }: { params: { projectId: string | undefined } }
) {
    const user = await authenticate();

    if (!user) {
        return Response.json({
            data: 'You must be authenticated in order to delete this project.',
            status: 'error'
        }, { status: 403 });
    }

    const { projectId } = params;

    if (!await isDeleteProjectFormValid(user, projectId)) {
        return Response.json({
            data: 'Error occurred when trying to delete provided project.',
            status: 'error'
        }, { status: 400 });
    }

    await prisma.project.delete({
        where: {
            id: projectId
        }
    });

    return Response.json({
        data: 'Your project has been successfully deleted.',
        status: 'sucess'
    }, { status: 200 });
}
