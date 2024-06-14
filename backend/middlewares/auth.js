import pkg from "jsonwebtoken";
const { verify } = pkg;
import cache from "../utils/cache.js";

const auth = async (req, res, next) => {
  const token = cache.get("token");
  if (!token) {
    return res.status(401).json({ e: "Token não encontrado." });
  };

  try {
    const decoded = verify(token, process.env.JWT_KEY);

    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ e: "Token inválido." });
  };
};

export default auth;
