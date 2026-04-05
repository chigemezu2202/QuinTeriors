import app from './app.js';

const PORT = Number(process.env.PORT || 8000);

app.listen(PORT, () => {
    console.log(`QuinTeriors Server listening on http://localhost:${PORT}`);
});
