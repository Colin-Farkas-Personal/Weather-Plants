	export function getComponentName(pathString: string): string {
		if (!pathString.endsWith('.svelte')) {
			return '';
		}

		const pathParts = pathString.split('/');
		const fileName = pathParts[pathParts.length - 1];
		return fileName.replace('.svelte', '') || '';
	}

	export function transformToTestId(parentName: string): string {
		return parentName
			.replace(/([a-z])([A-Z])/g, '$1-$2') // Insert hyphen before uppercase letters
			.toLowerCase(); // Convert to lowercase
	}