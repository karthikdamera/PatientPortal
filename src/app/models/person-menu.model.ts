export interface NavItem {
    title: string;
    active: boolean;
    target: string;
    url: string;
    navigationItems: NavItem[];
}
