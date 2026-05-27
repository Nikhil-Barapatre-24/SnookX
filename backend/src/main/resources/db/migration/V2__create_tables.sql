CREATE TABLE tables (
    id UUID PRIMARY KEY,
    table_number VARCHAR(50) NOT NULL,
    table_name VARCHAR(100),
    game_type VARCHAR(20) NOT NULL,
    price_per_hour DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'AVAILABLE',
    created_by UUID NOT NULL REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
