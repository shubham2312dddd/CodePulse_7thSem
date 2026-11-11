const { sequelize } = require('./models');

async function migrate() {
    const q = sequelize.getQueryInterface();
    
    try {
        // users: add is_subscribed
        await sequelize.query("ALTER TABLE users ADD COLUMN is_subscribed TINYINT(1) NOT NULL DEFAULT 0");
        console.log('✅ users.is_subscribed added');
    } catch(e) { if (e.parent && e.parent.code === 'ER_DUP_FIELDNAME') console.log('ℹ️  users.is_subscribed already exists'); else console.error('❌ users.is_subscribed:', e.message); }

    try {
        await sequelize.query("ALTER TABLE problems ADD COLUMN is_premium TINYINT(1) NOT NULL DEFAULT 0");
        console.log('✅ problems.is_premium added');
    } catch(e) { if (e.parent && e.parent.code === 'ER_DUP_FIELDNAME') console.log('ℹ️  problems.is_premium already exists'); else console.error('❌ problems.is_premium:', e.message); }

    try {
        await sequelize.query("ALTER TABLE problems ADD COLUMN company_tags VARCHAR(255) DEFAULT NULL");
        console.log('✅ problems.company_tags added');
    } catch(e) { if (e.parent && e.parent.code === 'ER_DUP_FIELDNAME') console.log('ℹ️  problems.company_tags already exists'); else console.error('❌ problems.company_tags:', e.message); }

    try {
        await sequelize.query("ALTER TABLE problems ADD COLUMN frequency INT NOT NULL DEFAULT 0");
        console.log('✅ problems.frequency added');
    } catch(e) { if (e.parent && e.parent.code === 'ER_DUP_FIELDNAME') console.log('ℹ️  problems.frequency already exists'); else console.error('❌ problems.frequency:', e.message); }

    try {
        await sequelize.query("ALTER TABLE submissions ADD COLUMN test_results TEXT DEFAULT NULL");
        console.log('✅ submissions.test_results added');
    } catch(e) { if (e.parent && e.parent.code === 'ER_DUP_FIELDNAME') console.log('ℹ️  submissions.test_results already exists'); else console.error('❌ submissions.test_results:', e.message); }

    try {
        await sequelize.query(`CREATE TABLE IF NOT EXISTS contests (
            id INT NOT NULL AUTO_INCREMENT,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            start_time DATETIME NOT NULL,
            end_time DATETIME NOT NULL,
            created_at DATETIME NOT NULL,
            PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
        console.log('✅ contests table ready');
    } catch(e) { console.error('❌ contests:', e.message); }

    try {
        await sequelize.query(`CREATE TABLE IF NOT EXISTS testcases (
            id INT NOT NULL AUTO_INCREMENT,
            problem_id INT NOT NULL,
            input TEXT NOT NULL,
            expected_output TEXT NOT NULL,
            is_hidden TINYINT(1) DEFAULT 0,
            created_at DATETIME NOT NULL,
            PRIMARY KEY (id),
            KEY problem_id_idx (problem_id),
            CONSTRAINT testcases_ibfk_1 FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
        console.log('✅ testcases table ready');
    } catch(e) { console.error('❌ testcases:', e.message); }

    console.log('\n🎉 Migration complete!');
    await sequelize.close();
}

migrate();
