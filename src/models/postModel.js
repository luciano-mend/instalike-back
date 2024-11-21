import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando as informações da variável de ambiente STRING_CONEXAO
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

function conectarBanco() {
    // Seleciona o banco de dados 'instabytes' e a coleção 'posts'
    const banco = conexao.db("instabytes");
    const colecao = banco.collection("posts");
    return colecao;
}

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
    const colecao = conectarBanco();
    // Retorna um array com todos os documentos da coleção
    return colecao.find().toArray();
};

// Função para encontrar o índice de um post pelo ID
export function buscarPostArrayPorId(id) {
    // Retorna o índice do post com o ID correspondente, ou -1 se não encontrar
    return posts.findIndex((post) => {
        return post.id === Number(id);
    });
};

export const posts = [
    {
        id: 1,
        descricao: "uma foto teste",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Gato preguiçoso tomando sol",
        imagem: "https://placekitten.com/400/200"
    },
    {
        id: 3,
        descricao: "Gatinho brincando com um novelo de lã",
        imagem: "https://placekitten.com/200/300"
    },
    {
        id: 4,
        descricao: "Dois gatos se amando",
        imagem: "https://placekitten.com/300/300"
    },
    {
        id: 5,
        descricao: "Gato curioso olhando pela janela",
        imagem: "https://placekitten.com/500/300"
    },
    {
        id: 6,
        descricao: "Gato fazendo cara de bravo",
        imagem: "https://placekitten.com/400/400"
    }
];

export async function criarPost(novoPost) {
    // Seleciona o banco de dados 'instabytes' e a coleção 'posts'
    const colecao = conectarBanco();
    // Insere um novo post na coleção 'posts'
    return colecao.insertOne(novoPost);
}

