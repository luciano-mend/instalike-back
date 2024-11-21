import express from "express"
import multer from "multer";
import { listarPosts, listarPostsArrayPorId, postarNovopost, uploadImagem } from "../controllers/postsController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    // Permite que o Express entenda requisições JSON
    app.use(express.json());

    // Rota para obter todos os posts
    app.get("/posts", listarPosts);

    // Rota para obter um post específico do array pelo ID
    app.get("/postsArray/:id", listarPostsArrayPorId);

    // Rota para criar um post
    app.post("/posts", postarNovopost);

    app.post("/upload", upload.single("imagem"), uploadImagem);
}

export default routes;