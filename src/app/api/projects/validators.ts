import type { Field } from '@/app/api/types/types';

type ProjectFormData = {
    name: Field;
}

export function isProjectFormValid(formData: ProjectFormData): boolean {
    const { name } = formData;

    if (!name ||
        typeof name !== 'string' ||
        name.length > 255
    ) {
        return false;
    }

    return true;
}
