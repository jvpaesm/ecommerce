import express from 'express'
import cors from 'cors'
import db from './infra/database/index'
import usuarioRoutes from './modules/Usuarios/routes'
import authRoutes from './modules/Auth/routes'
import categoriaRoutes from './modules/Categorias/routes'
import produtoRoutes from './modules/Produtos/routes'


export const app = express()

app.use(express.json())
app.use(cors())
app.use(usuarioRoutes)
app.use(categoriaRoutes)
app.use(produtoRoutes)
app.use(authRoutes)
db.hasConection()