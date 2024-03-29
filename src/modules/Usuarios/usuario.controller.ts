import { Pedidos, Usuarios } from "../../models/";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
const UsuarioController = {
  async getAll(req: Request, res: Response) {
    try {
      const usuarios = await Usuarios.findAll();

      return res.json(usuarios);
    } catch (error) {
      return res.status(500).json("Algo errado aconteceu, chame ajuda!");
    }
  },
  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usuario = await Usuarios.findByPk(id);

      return res.json(usuario);
    } catch (error) {
      return res.status(500).json("Algo errado aconteceu, chame ajuda!");
    }
  },
  async create(req: Request, res: Response) {
    try {
      const { senha } = req.body;

      const newSenha = bcrypt.hashSync(senha, 10);
      const newUsuario = await Usuarios.create({
        ...req.body,
        senha: newSenha,
        tipo: "user"
      });

      return res.status(201).json(newUsuario);
    } catch (error) {
      return res.status(500).json("Algo errado aconteceu, chame ajuda!");
    }
  },
  async createAdmin(req: Request, res: Response) {
    try {
      const { senha } = req.body;

      const newSenha = bcrypt.hashSync(senha, 10);
      const newUsuario = await Usuarios.create({
        ...req.body,
        senha: newSenha,
        tipo: "admin"
      });
      return res.status(201).json(newUsuario)
    } catch (error) {
      return res.status(500).json("Algo errado aconteceu, chame ajuda!");
    }
  },
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { senha } = req.body;
      const payloadUpdate = {};

      Object.assign(payloadUpdate, req.body);

      if (senha) {
        const newSenha = bcrypt.hashSync(senha, 10);
        Object.assign(payloadUpdate, { senha: newSenha });
      }

      await Usuarios.update(payloadUpdate, {
        where: { id },
      });

      const usuarios = await Usuarios.findByPk(id);

      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json("Algo errado aconteceu, chame ajuda!");
    }
  },

  async delete(req:Request,res:Response){
    try {
      const { id } = req.params
      const possuiPedidos = await Pedidos.count({
        where: {
          usuario_id: id,
        },
      });
      if (possuiPedidos) {
        return res
          .status(401)
          .json(
            "Existe pedidos associados a esse usuário, não é possivel deletar!"
          );
      }
      await Usuarios.destroy({
        where: {
          id,
        },
      });

      return res.sendStatus(204);

    } catch (error) {
      return res.status(500).json("Algo errado aconteceu, chame ajuda!");
    }
  },
  
};

export default UsuarioController;
