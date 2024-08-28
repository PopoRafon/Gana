import { authenticate } from '@/lib/auth';
import { isProjectFormValid } from './validators';
import prisma from '@/lib/db';

export async function POST(request: Request) {
    const user = await authenticate();

    if (!user) {
        return Response.json({
            data: 'You have to be authenticated in order to create new project.',
            status: 'error'
        }, { status: 403 });
    }

    const formData = await request.json();

    if (!isProjectFormValid(formData)) {
        return Response.json({
            data: 'You need to provide valid name in order to create new project.',
            status: 'error'
        }, { status: 400 });
    }

    const project = await prisma.project.create({
        data: {
            name: formData.name
        }
    });

    await prisma.userProject.create({
        data: {
            userId: user.id,
            projectId: project.id,
            role: 'creator'
        }
    });

    return Response.json({
        data: 'Your project has been successfully created.',
        status: 'success'
    }, { status: 200 });
}
