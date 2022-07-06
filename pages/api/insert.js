import { Anime } from "../../models/anime";

/*
  Accessible depuis http://localhost:3000/api/insert
 */
export default async (req, res) => {
  if (req.method === "POST") {
    try {
      await Anime.bulkCreate(req.body);

      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error });
    }
  }
};
