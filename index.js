const express = require('express');
const app = express();

app.use(express.json());

let users = [
    { id: 1, name: 'Budi Santoso', email: 'budi@example.com' },
    { id: 2, name: 'Siti Aminah', email: 'siti@example.com' },
    { id: 3, name: 'Joko Susilo', email: 'joko@example.com' },
    { id: 4, name: 'Rina Wati', email: 'rina@example.com' },
    { id: 5, name: 'Agus Salim', email: 'agus@example.com' }
];

app.get('/users', (req, res) => {
    res.json({
        status: 'sukses',
        message: 'Berhasil mengambil data pengguna',
        data: users
    });
});

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: `Pengguna dengan ID ${id} tidak ditemukan`,
            data: null
        });
    }

    res.json({
        status: 'sukses',
        message: 'Detail pengguna berhasil ditemukan',
        data: user
    });
});

app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({
            status: 'error',
            message: 'Nama harus diisi dan berupa teks'
        });
    }
    if (!email || !email.includes('@')) {
        return res.status(400).json({
            status: 'error',
            message: 'Format email tidak valid (harus mengandung @)'
        });
    }

    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name: name.trim(),
        email: email.trim()
    };

    users.push(newUser);

    res.status(201).json({
        status: 'sukses',
        message: 'Pengguna berhasil ditambahkan',
        data: newUser
    });
});

app.use((req, res) => {
    res.status(404).json({ status: 'error', message: 'Endpoint tidak ditemukan' });
});

module.exports = app;

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
}