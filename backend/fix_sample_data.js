const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'codepulse',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: console.log
    }
);

const sampleData = [
    {
        id: 47,
        sample_input: `["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]`,
        sample_output: `[null, null, null, 1, null, -1, null, -1, 3, 4]`
    },
    {
        id: 48,
        sample_input: `[2,7,11,15]\n9`,
        sample_output: `[1,2]`
    },
    {
        id: 49,
        sample_input: `[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]`,
        sample_output: `1`
    },
    {
        id: 50,
        sample_input: `[1,3]\n[2]`,
        sample_output: `2.00000`
    }
];

async function fixSampleData() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected to database.');

        for (const prob of sampleData) {
            const [rowsUpdated] = await sequelize.query(
                `UPDATE problems SET sample_input = ?, sample_output = ? WHERE id = ?`,
                {
                    replacements: [prob.sample_input, prob.sample_output, prob.id],
                    type: Sequelize.QueryTypes.UPDATE
                }
            );
            if (rowsUpdated > 0) {
                console.log(`✅ Updated problem ID ${prob.id}`);
            } else {
                console.log(`⚠️  Problem ID ${prob.id} not found or already updated.`);
            }
        }

        console.log('\n✅ All done! Sample input/output updated successfully.');
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await sequelize.close();
    }
}

fixSampleData();
