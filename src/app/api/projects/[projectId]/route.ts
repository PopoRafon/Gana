import type { Project } from '@prisma/client';
import { authenticate } from '@/lib/auth';
import { isDeleteProjectFormValid, isUpdateProjectFormValid } from '../validators';
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

export async function PATCH(
    request: Request,
    { params }: { params: { projectId: string | undefined } }
) {
    const user = await authenticate();

    if (!user) {
        return Response.json({
            data: 'You must be authenticated in order to update this project.',
            status: 'error'
        }, { status: 403 });
    }

    const { projectId } = params;
    const formData = await request.json();

    if (!await isUpdateProjectFormValid(formData, user, projectId)) {
        return Response.json({
            data: 'Error occurred when trying to update provided project.',
            status: 'error'
        }, { status: 400 });
    }

    const data: Partial<Project> = {};

    if (formData.name) {
        data.name = formData.name;
    }

    await prisma.project.update({
        where: {
            id: projectId
        },
        data
    });

    return Response.json({
        data: 'Your project has been successfully updated.',
        status: 'sucess'
    }, { status: 200 });
}
