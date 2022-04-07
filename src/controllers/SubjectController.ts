import Subject from '@/models/Subject';
import { ErrorResponse, NotFoundErrorResponse } from '@/resources/Error';
import { Success, SuccessCollection } from '@/resources/Success';
import { SubjectBodyData } from '@/types';
import { Request, Response } from 'express';

class SubjectController {
    constructor() {}

    public static async index(req: Request, res: Response) {
        const { count, subjects } = await Subject.getAll(req.pagination);
        return res.status(200).json(new SuccessCollection(subjects, count, 200));
    }

    public static async show(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const subject = await Subject.getById(id);

        if (!subject) {
            return res.status(404).json(new ErrorResponse('Subject Not Found'));
        }

        return res.json(subject);
    }

    public static async store(req: Request, res: Response) {
        const data: SubjectBodyData = req.validatedData;
        const userId = req.user.id;

        try {
            const newSubject = await Subject.create(data, userId);
            return res.status(201).json(new Success(newSubject));
        } catch (error) {
            if (error instanceof Error) {
                return res.status(422).json(new ErrorResponse(error.message, 422));
            }
        }
    }

    public static async update(req: Request, res: Response) {
        const subjectId = parseInt(req.params.id);
        const data = req.validatedData;
        const authorId = req.user.id;
        try {
            const updatedSubject = await Subject.update(subjectId, authorId, data);
            console.log(updatedSubject);

            return res.status(200).json(new Success(updatedSubject));
        } catch (error) {
            if (error instanceof NotFoundErrorResponse) {
                return res.status(error.status).json(error);
            }
        }
    }

    public static async delete(req: Request, res: Response) {
        // const id = parseInt(req.params.id);

        // try {
        //     await Category.destroy(id);
        //     return res.sendStatus(204);
        // } catch (error) {
        //     if (error instanceof Error) {
        //         return res.status(404).json(new NotFoundErrorResponse(error.message));
        //     }
        // }
        res.sendStatus(501);
    }
}

export default SubjectController;
