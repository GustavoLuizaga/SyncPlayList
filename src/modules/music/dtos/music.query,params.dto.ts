//TODO: Implementar limites y paginacion
export interface IMusicQueryParams {
    title?: string;
    artist?: string;
    sortBy?: "title" | "artist" | "duration" | "createdAt";
    sortOrder?: "asc" | "desc";
}