import * as yup from 'yup';

export const subjectValidator = yup.object().shape({
    name: yup.string().trim().required().min(3).max(255),
    content: yup.string().trim().required().min(10).max(1_000),
    categories: yup.array(yup.number()).default([]),
});

export const subjectUpdateValidator = yup.object().shape({
    name: yup.string().trim().required().min(3).max(255),
    content: yup.string().trim().required().min(10).max(1_000),
});

export const subjectCategoriesValidator = yup.object().shape({
    categories: yup.array(yup.number()).required(),
});
