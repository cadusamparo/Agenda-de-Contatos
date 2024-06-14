import { db } from "../../db.js";

export const updateContatos = (name, phone, id) => {
  const q = "UPDATE contatos SET `name` = ?, `phone` = ? WHERE `id` = ?";
  const values = [name, phone, id];

  db.query(q, values, (err) => {
    if (err) throw new Error(err);

    return "Usuário atualizado com sucesso!";
  });
};
