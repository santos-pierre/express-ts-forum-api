import { Request, Response } from 'express';
import Category, { CategoryData } from '@/models/Category';
import { ErrorResponse, NotFoundErrorResponse } from '@/resources/Error';
import { Success, SuccessCollection } from '@/resources/Success';
import db from '../models';

class CategoryController {
    constructor() {}

    public static async index(req: Request, res: Response) {
        const { count, categories } = await Category.getAll(req.pagination);
        return res.status(200).json(new SuccessCollection(categories, count, 200));
    }

    public static async show(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const category = await Category.getById(id);

        if (!category) {
            return res.status(404).json(new ErrorResponse('Category Not Found'));
        }

        return res.json(category);
    }

    public static async store(req: Request, res: Response) {
        const data: { name: string } = req.validatedData;

        try {
            const newCategory = await Category.create(data);
            return res.status(201).json(new Success(newCategory));
        } catch (error) {
            if (error instanceof Error) {
                return res.status(422).json(new ErrorResponse(error.message, 422));
            }
        }
    }

    public static async update(req: Request, res: Response) {
        const data: CategoryData = { ...req.validatedData, id: parseInt(req.params.id) };

        try {
            const updatedCategory = await Category.update({ ...data });

            if (!updatedCategory) {
                return res
                    .status(404)
                    .json(new NotFoundErrorResponse(`The category with the id : ${data.id} does not exist`));
            }

            return res.status(200).json(new Success(updatedCategory));
        } catch (error) {
            if (error instanceof Error) {
                return res.status(422).json(new ErrorResponse(error.message, 422));
            }
        }
    }

    public static async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        try {
            await Category.destroy(id);
            return res.sendStatus(204);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(404).json(new NotFoundErrorResponse(error.message));
            }
        }
    }
}

export default CategoryController;
