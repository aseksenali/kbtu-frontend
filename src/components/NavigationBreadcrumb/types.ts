export type BreadcrumbSection = {
    name: string,
    to: string
}

export type NavigationBreadcrumbProps = {
    sections: BreadcrumbSection[]
}