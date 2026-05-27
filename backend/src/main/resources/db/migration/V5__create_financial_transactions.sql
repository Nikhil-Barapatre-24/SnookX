CREATE TABLE financial_transactions (
    id UUID PRIMARY KEY,
    transaction_id VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    table_id UUID NOT NULL REFERENCES tables(id),
    table_number VARCHAR(50) NOT NULL,
    table_name VARCHAR(255) NOT NULL,
    session_id UUID REFERENCES table_sessions(id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    duration_minutes BIGINT NOT NULL,
    price_per_hour DECIMAL(10,2) NOT NULL,
    expected_amount DECIMAL(10,2) NOT NULL,
    actual_amount DECIMAL(10,2) NOT NULL,
    difference DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(20) NOT NULL,
    payment_status VARCHAR(20) NOT NULL,
    transaction_date DATE NOT NULL,
    reference_number VARCHAR(100),
    notes TEXT,
    created_by UUID NOT NULL REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_financial_transactions_transaction_id ON financial_transactions(transaction_id);
CREATE INDEX idx_financial_transactions_customer_phone ON financial_transactions(customer_phone);
CREATE INDEX idx_financial_transactions_table_id ON financial_transactions(table_id);
CREATE INDEX idx_financial_transactions_transaction_date ON financial_transactions(transaction_date);
CREATE INDEX idx_financial_transactions_payment_status ON financial_transactions(payment_status);
CREATE INDEX idx_financial_transactions_created_at ON financial_transactions(created_at);
