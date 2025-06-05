const express = require('express');
const cors = require('cors');
require('dotenv').config()
function createHttpServer(options = {}) {
    const app = express();
    const port = options.port || process.env.PORT || 3000;
    const middlewares = [];
    let server = null;

    // Default middlewares
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    function use(middleware) {
        middlewares.push(middleware);
        app.use(middleware);
        return api;
    }

    function setupErrorHandling() {
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({
                error: 'Something went wrong!',
                message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
            });
        });
    }

    function setup404Handler() {
        app.use('/{*splat}', (req, res) => {
            res.status(404).json({
                error: 'Route not found',
                path: req.originalUrl
            });
        });
    }

    function start(callback) {
        setupErrorHandling();
        setup404Handler();

        server = app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);

            if (callback) callback();
        });

        return server;
    }

    function stop(callback) {
        if (server) server.close(callback);
    }

    function getApp() {
        return app;
    }

    // Public API
    const api = {
        use,
        start,
        stop,
        getApp
    };

    return api;
}

module.exports = createHttpServer;
