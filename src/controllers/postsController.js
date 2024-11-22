import fs from "fs"
import {getTodosPosts, buscarPostArrayPorId, posts, criarPost, atualizarPost } from "../models/postModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts (req, res) {
    // Busca todos os posts no banco de dados
    const posts = await getTodosPosts();
    // Envia os posts como resposta em formato JSON com status 200 (OK)
    res.status(200).json(posts);
};

export function listarPostsArrayPorId (req, res) {
    // Busca o índice do post no array
    const index = buscarPostArrayPorId(req.params.id);
    // Envia o post encontrado como resposta, ou um erro 404 se não encontrar
    if (index !== -1) {
        res.status(200).json(posts[index]);
    } else {
        res.status(404).json({ message: "Post não encontrado" });
    }
};

export async function postarNovopost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(201).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro":"Falha na requisição."});
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: "Imagem inserida via upload"
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.jpg`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(201).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro":"Falha na requisição."});
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.jpg`;
    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.jpg`);
        const descricao = await gerarDescricaoComGemini(imageBuffer);
        //const altText = await gerarDescricaoComGemini(imageBuffer, "alt");
        const post = {
            descricao: descricao,
            imgUrl: urlImagem,
            alt: req.params.alt
        }
        const postCriado = await atualizarPost(id, post);
        res.status(201).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Erro":"Falha na requisição."});
    }
}