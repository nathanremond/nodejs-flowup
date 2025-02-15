const express = require('express');
const cors = require('cors');
const Book = require('./models/book');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000'
}))

// Endpoints 
app.get('/books', async (req, res) => {
    try {
        const books = await Book.getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// GET SPECIFIC
app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.getBookById(req.params.id);
        book ? res.status(200).json(book) : res.status(404).json({
            message: "Pas trouvé"
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// POST BOOK
app.post('/books', async (req, res) => {
    try {
        const newBook = await Book.createBook(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// PUT BOOK
app.put('/books/:id', async (req, res) => {
    try {
        const updatedBook = await Book.updateBook(req.params.id, req.body);
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// DELETE
app.delete('/books/:id', async (req, res) => {
    try {
        await Book.deleteBook(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});