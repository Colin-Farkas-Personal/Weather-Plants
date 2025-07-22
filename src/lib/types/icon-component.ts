import type { Snippet } from "svelte";

interface IconProps {
    size?: string;
}

interface SVGIconProps extends IconProps {
    children: Snippet;
    parentName: string;
    ariaLabel: string;
}

export type { IconProps, SVGIconProps };