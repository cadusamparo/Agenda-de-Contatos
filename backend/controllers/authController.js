import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserEmail } from "../services/users/getUserEmail.js";
import cache from "../utils/cache.js";
import { createUser } from "../services/users/createUser.js";

export const loginController = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ e: "Por favor, preencher todos os campos" });
  }

  try {
    const user = await getUserEmail(email);
    if (!user[0]) {
      return res.status(404).json({ e: "Usuário não encontrado" });
    };

    const { id: id, senha: hashedPassword } = user[0];
    if (!hashedPassword) {
      return res.status(400).json({ e: "Senha não encontrada para este usuário" });
    };

    const match = bcrypt.compareSync(senha, hashedPassword);
    if (!match) {
      return res.status(400).json({ e: "Senha incorreta, tente novamente!" });
    };

    delete user[0].senha;

    const token = jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "1h" });

    cache.set("token", token);

    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ e: error.message });
  };
};

export const registerController = async (req, res) => {
  try {
    const { email, username, senha } = req.body;

    if (!email || !username || !senha) {
      return res.status(400).json({ e: "Por favor, preencha todos os campos" });
    };

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);

    const user = await createUser(email, username, hash);
    console.error(user)

    if(user == "Email já cadastrado!" ) {
      return res.status(400).json("Email já cadastrado!")
    }
    
    if(user == "Registrado com sucesso!") {
      return res.status(200).json("Registrado com sucesso!")
    }

    if(user == "Erro ao procurar usuário") {
      return res.status(200).json("Erro ao procurar usuário")
    }
    return res.status(200).json(user)
  } catch (e) {
    return res.status(400).json(e);
  };
};

export const logoutController = (req, res) => {
  cache.del("token");

  return res.status(200).json("Deslogado com sucesso!");
};
