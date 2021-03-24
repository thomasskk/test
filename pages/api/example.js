/*
  Accessible depuis https://localhost:3000/api/example
 */
export default async (req, res) => {
  res.status(202).json({
    message: 'Hello world ! 👋🏻'
  });
};