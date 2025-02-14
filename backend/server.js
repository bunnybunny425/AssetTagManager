const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let assets = [
    { id: 1, name: 'Laptop A', manufacturer: 'Dell', tags: ['Dell'] },
    { id: 2, name: 'Laptop B', manufacturer: 'HP', tags: ['HP'] },
    { id: 3, name: 'Monitor A', manufacturer: 'Samsung', tags: ['Samsung'] },
    { id: 4, name: 'Printer A', manufacturer: 'Canon', tags: ['Canon'] },
    { id: 5, name: 'Desktop A', manufacturer: 'Apple', tags: ['Apple'] },
];

app.get('/api/assets', (req, res) => {
    res.json(assets);
});

app.post('/api/assets', (req, res) => {
    const { name, manufacturer } = req.body;
    const tags = [manufacturer];
    const newAsset = { id: assets.length + 1, name, manufacturer, tags };
    assets.push(newAsset);
    res.status(201).json(newAsset);
});

app.patch('/api/assets/:id/tags', (req, res) => {
    const { id } = req.params;
    const { tags } = req.body;

    const asset = assets.find(asset => asset.id === parseInt(id));
    if (asset) {
        asset.tags = tags;
        res.sendStatus(204);
    } else {
        res.status(404).json({ message: 'Asset not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
