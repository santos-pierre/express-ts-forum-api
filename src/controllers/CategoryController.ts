import { Request, Response } from 'express';
import Category from 'src/models/Category';
import { ErrorResponse } from 'src/resources/Error';
import { SuccessCollection } from 'src/resources/Success';

class CategoryController {
    constructor() {}

    public static async index(req: Request, res: Response) {
        const { count, categories } = await Category.getAll(req.pagination);
        res.status(200).json(new SuccessCollection(categories, count, 200));
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

        const newCategory = await Category.create(data);

        return res.json(newCategory);
    }

    public static update(req: Request, res: Response) {
        res.sendStatus(501);
    }

    public static delete(req: Request, res: Response) {
        res.sendStatus(501);
    }
}

export default CategoryController;
