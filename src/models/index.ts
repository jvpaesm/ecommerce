import Usuarios from "./Usuarios"
import Categorias from "./Categorias"
import Produtos from "./Produtos"
import Pedidos from "./Pedidos"
import DetalhesPedido from "./DetalhesPedido"

Categorias.hasMany(Produtos, { foreignKey: "categoria" })
Usuarios.hasMany(Pedidos, { foreignKey: "usuario_id" })


Produtos.belongsToMany(Pedidos, {
    foreignKey: "produto_id",
    through: DetalhesPedido,
  });
  
Pedidos.belongsToMany(Produtos, {
    foreignKey: "pedido_id",
    through: DetalhesPedido,
  });
  
  DetalhesPedido.belongsTo(Produtos, { foreignKey: "produto_id" });
  DetalhesPedido.belongsTo(Pedidos, { foreignKey: "pedido_id" });

export {
    Usuarios,
    Produtos,
    Categorias,
    Pedidos,
    DetalhesPedido,
}