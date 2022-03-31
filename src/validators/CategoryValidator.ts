import * as yup from 'yup';

const categoryValidator = yup.object().shape({
    name: yup.string().trim().required().max(50),
});

export default categoryValidator;
