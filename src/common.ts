export function noop(): void {
}

export const PREFIX = 'ReactFormTool.';

export function displayName(suffix: string): string {
	return `${PREFIX}${suffix}`;
}
