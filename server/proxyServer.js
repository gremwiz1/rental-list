const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

// Проксируем запросы на /api/v1/search/rentals
app.get('/api/v1/search/rentals', async (req, res) => {
    try {
        const params = req.query;
        
        const response = await axios.get('https://app-staging.selof.ru/api/v1/search/rentals', { params });
        
        res.json(response.data);
    } catch (error) {
        console.error('Ошибка при запросе к API:', error.message);
        res.status(error.response?.status || 500).json({
            message: 'Ошибка при запросе к удалённому серверу',
            details: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Прокси-сервер запущен на http://localhost:${PORT}`);
});
