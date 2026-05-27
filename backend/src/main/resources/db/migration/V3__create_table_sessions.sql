CREATE TABLE table_sessions (
    id UUID PRIMARY KEY,
    table_id UUID NOT NULL REFERENCES tables(id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    calculated_amount DECIMAL(10,2),
    received_amount DECIMAL(10,2),
    payment_method VARCHAR(20),
    created_by UUID NOT NULL REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_table_sessions_table_id ON table_sessions(table_id);
CREATE INDEX idx_table_sessions_end_time ON table_sessions(end_time);
