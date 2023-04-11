import { Request, Response } from "express";
import { Cupons } from "../../models";


const CuponsController = {
  async getAll(req: Request, res: Response) {
    try {
      const cupons = await Cupons.findAll();

      return res.json(cupons);
    } catch (error) {
      return res.status(500).json("Algo errado aconteceu, chame ajuda!");
    }
  },
  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cupom = await Cupons.findByPk(id);

      return res.json(cupom);
    } catch (error) {
      return res.status(500).json("Algo errado aconteceu, ajuda!");
    }
  },
  async create(req: Request, res: Response) {
    try {
      const newCupom = await Cupons.create({
        ...req.body,
      });

      return res.status(201).json(newCupom);
    } catch (error) {
      return res.status(500).json("Algo errado aconteceu, chame ajuda!");
    }
  },
  
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const payloadUpdate = {};

      Object.assign(payloadUpdate, req.body);

      await Cupons.update(payloadUpdate, {
        where: { id },
      });

      const cupons = await Cupons.findByPk(id);

      return res.status(200).json(cupons);
    } catch (error) {
      return res.status(500).json("Algo errado aconteceu, chame ajuda!");
    }
  },
  
};

export default CuponsController;