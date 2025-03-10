const express = require("express");

const app = express();
app.use(express.json());

let users = []; // Odamlar ro‘yxati (hozircha RAMda saqlanadi)

// Barcha odamlarni olish
app.get("/users", (req, res) => {
    res.json(users);
});

// Yangi odam qo‘shish
app.post("/users", (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Ism kiritilishi kerak" });
    }
    const user = { id: users.length + 1, name };
    users.push(user);
    res.status(201).json(user);
});

// Odamni o‘chirish
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(user => user.id !== id);
    res.json({ message: "O‘chirildi" });
});

// Serverni ishga tushirish
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portda ishlamoqda`);
});
