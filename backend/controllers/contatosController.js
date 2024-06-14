import { deleteContatos } from "../services/contatos/deleteContatos.js";
import { updateContatos } from "../services/contatos/updateContatos.js";
import { createContatos } from "../services/contatos/createContatos.js";
import { getContatos } from "../services/contatos/getContatos.js";

export const getContatosController = async (req, res) => {
  try {
    const user_id = req.userId;
    const data = await getContatos(user_id);

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json("Error ao listar usuários");
  };
};

export const createContatosController = (req, res) => {
  try {
    const { name, phone } = req.body;
    const user_id = req.userId;

    if (name === "" || phone === "") {
      return res.status(400).json({ e: "Por favor, preencher todos os campos" });
    };

    createContatos(name, phone, user_id);

    return res.status(200).json("Usuário adicionado com sucesso!");
  } catch (e) {
    return res.status(400).json("Erro ao adicionar usuário.");
  };
};

export const updateContatosController = (req, res) => {
  try {
    const { name, phone } = req.body;
    const id = req.params.id;

    updateContatos(name, phone, id);

    return res.status(200).json("Usuário atualizado com sucesso!");
  } catch (e) {
    return res.status(400).json("Erro ao atualizar o usuário");
  };
};

export const deleteContatosController = (req, res) => {
  try {
    const id = req.params.id;

    deleteContatos(id);

    return res.status(200).json("Usuário deletado com sucesso!");
  } catch (e) {
    return res.status(400).json("Erro ao deletar o usuário");
  };
};
