export interface UIMenuItem
{
    label?: string;
    icon?: string;
    url?: string;
    items?: UIMenuItem[];
    active?: boolean;
    expanded?: boolean;
}