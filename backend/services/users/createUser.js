import { db } from "../../db.js";

export const createUser = async (email, username, senha) => {
  const q = "SELECT * FROM usuarios WHERE email = ?";
  const values = [email];

  return new Promise((resolve, reject) => {
    db.query(q, values, (err, result) => {
      if (err) {
        console.error(`Erro ao procurar usuário: ${err.message}`);
        reject(new Error(`Erro ao procurar usuário: ${err.message}`));
        return "Erro ao procurar usuário";
      } else if (result.length > 0) {
        console.log(`Email já cadastrado: ${email}`);
        resolve("Email já cadastrado!");
        return "Email já cadastrado!"
      } else {
        console.log(`Email não encontrado, criando novo usuário: ${email}`);
        // Se o email não estiver cadastrado, você pode prosseguir para criar o usuário
        const insertQuery = "INSERT INTO usuarios (email, username, senha) VALUES (?, ?, ?)";
        const insertValues = [email, username, senha];

        db.query(insertQuery, insertValues, (insertErr, insertResult) => {
          if (insertErr) {
            console.error(`Erro ao criar usuário: ${insertErr.message}`);
            reject(new Error(`Erro ao criar usuário: ${insertErr.message}`));
            return "Erro ao criar usuário!";
          } else {
            console.log(`Usuário criado com sucesso: ${email}`);
            resolve("Usuário criado com sucesso!");
            return "Usuário criado com sucesso!";
          }
        });
      }
    });
  });
};
