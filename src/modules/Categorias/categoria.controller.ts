import { Request, Response } from "express";
import { Categorias } from "../../models";


const CategoriaController = {
  async getAll(req: Request, res: Response) {
    try {
      const categorias = await Categorias.findAll();

      return res.json(categorias);
    } catch (error) {
      return res.status(500).json("Algo errado aconteceu, chame o batman!");
    }
  },
  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const categoria = await Categorias.findByPk(id);

      return res.json(categoria);
    } catch (error) {
      return res.status(500).json("Algo errado aconteceu, chame o batman!");
    }
  },
  async create(req: Request, res: Response) {
    try {
      const newCategoria = await Categorias.create({
        ...req.body,
      });

      return res.status(201).json(newCategoria);
    } catch (error) {
      return res.status(500).json("Algo errado aconteceu, chame o batman!");
    }
  },
  
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const payloadUpdate = {};

      Object.assign(payloadUpdate, req.body);

      await Categorias.update(payloadUpdate, {
        where: { id },
      });

      const categorias = await Categorias.findByPk(id);

      return res.status(200).json(categorias);
    } catch (error) {
      return res.status(500).json("Algo errado aconteceu, chame o batman!");
    }
  },
  
};

export default CategoriaController;
