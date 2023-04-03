import { Request, Response } from "express";
import { Categorias, Produtos } from "../../models";


const ProdutoController = {
  async getAll(req: Request, res: Response) {
    try {
      const produtos = await Produtos.findAll();

      produtos.forEach(async (item: string | number) => {
        const { nome } = await Categorias.findByPk(JSON.parse(produtos[item].categoria))
        produtos[item].categoria = nome
      });

      console.log(produtos[0].categoria)
      return res.json(produtos);
    } catch (error) {
      return res.status(500).json("Algo errado aconteceu, chame o batman!");
    }
  },
  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const produto = await Produtos.findByPk(id);
      
      const { nome } = await Categorias.findByPk(produto.categoria)
      produto.categoria = nome

      return res.json(produto);
    } catch (error) {
      return res.status(500).json("Algo errado aconteceu, chame o batman!");
    }
  },
  async create(req: Request, res: Response) {
    try {
      const newProduto = await Produtos.create({
        ...req.body,
      });

      return res.status(201).json(newProduto);
    } catch (error) {
      return res.status(500).json("Algo errado aconteceu, chame o batman!");
    }
  },
  
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const payloadUpdate = {};

      Object.assign(payloadUpdate, req.body);

      await Produtos.update(payloadUpdate, {
        where: { id },
      });

      const produtos = await Produtos.findByPk(id);

      return res.status(200).json(produtos);
    } catch (error) {
      return res.status(500).json("Algo errado aconteceu, chame o batman!");
    }
  },
  
};

export default ProdutoController;
