import { db } from "../../db.js";

export const createContatos = (name, phone, user_id) => {
  const q = "INSERT INTO contatos(name, phone, user_id) VALUES (?, ?, ?)";
  const values = [name, phone, user_id];

  db.query(q, values, (err, result) => {
    if (err) {
      throw new Error("Erro ao adicionar usuário.");
    };
    return result;
  });
};
