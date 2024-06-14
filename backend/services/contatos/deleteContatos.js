import { db } from "../../db.js";

export const deleteContatos = (id) => {
  const q = "DELETE FROM contatos WHERE `id` = ?";
  const values = id

  db.query(q, values, (err) => {
    if (err) throw new Error(err);

    return "Usuário deletado com sucesso!";
  });
};
