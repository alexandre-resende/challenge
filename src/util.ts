export const validator = async function(res: any, validations: ((res: any) => any)[]): Promise<void> {
    const errors: any[] = [];
    for (let index = 0; index < validations.length; index++) {
        try {
            const funcName = validations[index];
            if (typeof funcName !== 'function') {
                throw new Error(`Validation at index ${index} is not a function`);
            }
            await funcName(res);
        } catch (error: any) {
            errors.push(`${index + 1}: ${error.message}`);
        }
    }
    if (errors.length > 0) {
        const start = (errors.length === 1) ? 'Error' : 'Multiple errors' + ':\n';
        const middle = errors.join('\n') + '\n\n';
        const response = res?.body?.error || res?.body?.message || res?.error?.message || res?.message;
        const responseValue = (typeof response === 'object') ? JSON.stringify(response, undefined, 4) : response;
        const end = `Code: ${res.status} | Response: ${responseValue}`;
        const errorMessage = start + middle + end;
        return Promise.reject(new Error(errorMessage));
    }
};