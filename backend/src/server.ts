import AppDataSource from './data-source';
import app from './app';

(async () => {
    await AppDataSource.initialize().catch(err => {
        console.error('Error during Data Source initialization', err);
    });

    app.listen(3001, () => {
        console.log('Servidor executando em http://localhost:3001');
    });
})();
