const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

let mahasiswa = [
    { id: 1, nama: 'Andi', jurusan: 'Informatika' },
    { id: 2, nama: 'Budi', jurusan: 'Sistem Informasi' }
];

app.get('/mahasiswa', (req, res) => {
    res.json(mahasiswa);
});

app.get('/mahasiswa/:id', (req, res) => {
    const id = Number(req.params.id);
    const data = mahasiswa.find(m => m.id === id);

    if (!data) {
        return res.status(404).json({
            pesan: 'Mahasiswa tidak ditemukan'
        });
    }

    res.json(data);
});

app.post('/mahasiswa', (req, res) => {
    const { nama, jurusan } = req.body;

    const dataBaru = {
        id: mahasiswa.length
            ? Math.max(...mahasiswa.map(m => m.id)) + 1
            : 1,
        nama,
        jurusan
    };

    mahasiswa.push(dataBaru);
    
    res.status(201).json({
        pesan: 'Mahasiswa berhasil ditambahkan',
        data: dataBaru
    });
});

app.put('/mahasiswa/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = mahasiswa.findIndex(m => m.id === id);

    if (index === -1) {
        return res.status(404).json({
            pesan: 'Mahasiswa tidak ditemukan'
        });
    }

    mahasiswa[index] = {
        id,
        nama: req.body.nama,
        jurusan: req.body.jurusan
    };

    res.json({
        pesan: 'Data mahasiswa berhasil diperbarui',
        data: mahasiswa[index]
    });
});

app.delete('/mahasiswa/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = mahasiswa.findIndex(m => m.id === id);

    if (index === -1) {
        return res.status(404).json({
            pesan: 'Mahasiswa tidak ditemukan'
        });
    }

    mahasiswa.splice(index, 1);

    res.json({
        pesan: 'Mahasiswa berhasil dihapus'
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});