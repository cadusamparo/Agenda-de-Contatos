import { db } from "../../db.js";

export const getUserEmail = async (email) => {
  const q = "SELECT * FROM usuarios WHERE `email` = ?";
  const values = email;

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