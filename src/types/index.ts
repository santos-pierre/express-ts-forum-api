export type FormErrors = {
    [key: string]: string[];
};

export type PaginationOption = {
    limit: number;
    offset: number;
};

export type UserPayload = {
    id: number;
    pseudo: string;
    isAdmin: boolean;
};

export type SubjectBodyData = {
    name: string;
    content: string;
    categories: number[];
};
