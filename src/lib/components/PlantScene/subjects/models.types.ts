type ModelType = 'plant' | 'pot';

type ModelAttributes = {
	readonly path: string;
	receiveShadow?: boolean;
};

export type { ModelAttributes, ModelType };
