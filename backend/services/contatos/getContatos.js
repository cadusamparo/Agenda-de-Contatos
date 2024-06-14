import { db } from "../../db.js";

export const getContatos = async (user_id) => {
  const q = "SELECT * FROM contatos WHERE `user_id` = ?";
  const values = [user_id];

  return new Promise((resolve, reject) => {
    db.query(q, values, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      };
    });
  });
};
