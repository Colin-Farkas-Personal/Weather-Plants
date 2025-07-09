import type { Snippet } from "svelte";

interface IconProps {
    size?: string;
}

interface SVGIconProps extends IconProps {
    children: Snippet;
    parentName: string;
}

export type { IconProps, SVGIconProps };