import { Usuarios, Pedidos, Produtos, DetalhesPedido, Cupons } from "../../models";
import { Request, Response } from "express";
import Auth from "../../middlewares/authToken"

const PedidoController = {

    async getAll(req: Request, res:Response){
        try {  
            const pedidos = await Pedidos.findAll({
                include: [
                {
                    model: Produtos
                }
            ]
            })
            return res.status(201).json(pedidos)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json("Algo errado aconteceu, chame ajuda");
        }
    },

    async getOne(req: Request, res:Response){
        try {
            const { id } = req.params;
            const pedidos = await Pedidos.findOne({
                where: {id: id},
                include: [
                {
                    model: Produtos
                }
            ]
            })
            return res.status(201).json(pedidos)
        } catch (error) {
            return res.status(500).json("Algo errado aconteceu, chame ajuda");
        }
    },

  async create(req: Request, res: Response) {
    try {
        const usuario = Auth.getToken(req,res);
        
        const { listaprodutos, nomeCupom } = req.body
        var produtoValido = true
        var soma = 0;
        var descontoCupom = 0;
        

        for(var i =0; i<listaprodutos.length; i++){
            const listaMapped = await Produtos.findByPk(listaprodutos[i].idproduto)
            if(!listaMapped){
                produtoValido = false;
                res.status(400).json("Produto invalido")
                break;
            }
            soma = soma + listaMapped.preco*listaprodutos[i].quantidade
        }
 
        if(produtoValido == true){

            if(nomeCupom){
                const { desconto } = await Cupons.findOne({
                    where: {nome: nomeCupom},
                })
                descontoCupom = desconto
                
            }
            const newPedido = await Pedidos.create({usuario_id: usuario.id ,valor:soma-descontoCupom, cupom: nomeCupom})
            for(var i=0; i<listaprodutos.length; i++){
                await DetalhesPedido.create({
                    pedido_id:newPedido.id,
                    produto_id:listaprodutos[i].idproduto,
                    quantidade:listaprodutos[i].quantidade
                })
            }

            const result2 = await Pedidos.findAll({
                where: {id: newPedido.id},
                include: [
                {
                    model: Produtos,
                }],
            })


            return res.status(201).json(result2)
        }
        

    } catch (error) {
        console.log(error)
        return res.status(500).json("Algo errado aconteceu, chame ajuda");
    }    
  },

    async update(req:Request,res:Response){
        try {
            const { id } = req.params;
            const payloadUpdate = {};

            Object.assign(payloadUpdate, req.body);

            await Pedidos.update(payloadUpdate, {
                where: { id },
              });

              const pedidos = await Pedidos.findOne({
                where: {id: id},
                include: [
                {
                    model: Produtos
                }
            ]
            })
            return res.status(201).json(pedidos) 

        } catch (error) {
            console.log(error)
            return res.status(500).json("Algo errado aconteceu, chame ajuda");
        }
    },

};

export default PedidoController;