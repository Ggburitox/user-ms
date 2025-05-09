CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    dni CHAR(8) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Usuario para la API (permisos completos)
CREATE ROLE api_user WITH LOGIN PASSWORD 'api_password';
GRANT ALL PRIVILEGES ON TABLE usuarios TO api_user;

-- Usuario para Adminer (solo lectura)
CREATE ROLE adminer_user WITH LOGIN PASSWORD 'adminer_password';
GRANT SELECT ON TABLE usuarios TO adminer_user;
