-- Migration: add missing columns to match Sequelize models

-- users table
ALTER TABLE users
  ADD COLUMN is_subscribed TINYINT(1) NOT NULL DEFAULT 0;

-- problems table
ALTER TABLE problems
  ADD COLUMN is_premium TINYINT(1) NOT NULL DEFAULT 0,
  ADD COLUMN company_tags VARCHAR(255) DEFAULT NULL,
  ADD COLUMN frequency INT NOT NULL DEFAULT 0;

-- submissions table
ALTER TABLE submissions
  ADD COLUMN test_results TEXT DEFAULT NULL;

-- contests table (new)
CREATE TABLE IF NOT EXISTS contests (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  created_at DATETIME NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- testcases table (new)
CREATE TABLE IF NOT EXISTS testcases (
  id INT NOT NULL AUTO_INCREMENT,
  problem_id INT NOT NULL,
  input TEXT NOT NULL,
  expected_output TEXT NOT NULL,
  is_hidden TINYINT(1) DEFAULT 0,
  created_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  KEY problem_id_idx (problem_id),
  CONSTRAINT testcases_ibfk_1 FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
