import type { User } from '@prisma/client';
import { authenticate } from '@/lib/auth';
import { isCreateProjectUserFormValid } from './validators';
import prisma from '@/lib/db';

export async function POST(
    request: Request,
    { params }: { params: { projectId: string | undefined } }
) {
    const user = await authenticate();

    if (!user) {
        return Response.json({
            data: 'You must be authenticated in order to add user to this project.',
            status: 'error'
        }, { status: 403 });
    }

    const { projectId } = params;
    const formData = await request.json();

    if (!await isCreateProjectUserFormValid(formData, user, projectId)) {
        return  Response.json({
            data: 'An error occurred when trying to add new user to the project.',
            status: 'error'
        }, { status: 400 });
    }

    const userToAdd = await prisma.user.findFirst({
        where: {
            username: formData.username
        }
    }) as User;

    await prisma.userProject.create({
        data: {
            userId: userToAdd.id,
            projectId: projectId as string,
            role: formData.role
        }
    });

    return Response.json({
        data: 'User has been successfully added to this project.',
        status: 'success'
    }, { status: 200 });
}
