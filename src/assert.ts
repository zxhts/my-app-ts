
// 简单断言
export const useAssert = (scope: string) => (condition: any, message: string) => {
    if (condition !== null && condition !== undefined && condition !== false) return;
    throw new Error(`[${scope}]: ${message}`);
};
  
export const assert = (condition: boolean, message: string | object) => {
    if (condition !== null && condition !== undefined && condition !== false) return;
    const errmsg = typeof message === 'object' ? JSON.stringify(message) : message;
    throw new Error(errmsg);
};
