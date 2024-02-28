export type DrawFunc<T> = (data: T[]) => void;

export function consoleErrorNoGET(): void {
    console.error('No callback for GET response');
}
