// Script to mark existing problems as premium with company tags and frequency
const { sequelize, Problem } = require('./models');

const premiumUpdates = [
    { title: 'Two Sum', is_premium: true, company_tags: 'Google,Amazon,Meta', frequency: 97 },
    { title: 'Valid Anagram', is_premium: true, company_tags: 'Amazon,Microsoft', frequency: 88 },
    { title: 'Climbing Stairs', is_premium: true, company_tags: 'Apple,Google', frequency: 85 },
    { title: 'Maximum Subarray', is_premium: true, company_tags: 'Amazon,Microsoft,Meta', frequency: 92 },
    { title: 'Longest Substring', is_premium: true, company_tags: 'Google,Amazon', frequency: 90 },
    { title: 'Container With Most Water', is_premium: true, company_tags: 'Amazon,Apple', frequency: 87 },
    { title: 'Group Anagrams', is_premium: true, company_tags: 'Google,Meta,Amazon', frequency: 89 },
    { title: 'Product of Array Except Self', is_premium: true, company_tags: 'Amazon,Apple,Microsoft', frequency: 91 },
    { title: '3Sum', is_premium: true, company_tags: 'Microsoft,Google', frequency: 86 },
    { title: 'Longest Consecutive Sequence', is_premium: true, company_tags: 'Google,Meta', frequency: 83 },
    { title: 'Trapping Rain Water', is_premium: true, company_tags: 'Google,Amazon,Microsoft', frequency: 94 },
    { title: 'Minimum Window Substring', is_premium: true, company_tags: 'Google,Meta', frequency: 84 },
];

async function run() {
    try {
        for (const update of premiumUpdates) {
            const [rows] = await Problem.update(
                { is_premium: update.is_premium, company_tags: update.company_tags, frequency: update.frequency },
                { where: { title: update.title } }
            );
            console.log(`✅ Updated "${update.title}" — ${rows} row(s) affected`);
        }
        console.log('\n🎉 All premium problems updated!');
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await sequelize.close();
    }
}

run();
