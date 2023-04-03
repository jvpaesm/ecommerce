import Usuarios from "./Usuarios"
import Categorias from "./Categorias"
import Produtos from "./Produtos"

//Categorias.belongsToMany(Produtos, {foreignKey: "categoria" })
Categorias.hasMany(Produtos, { foreignKey: "categoria" })

export {
    Usuarios,
    Produtos,
    Categorias
}