const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

// Test Python detection
const pythonCandidates = [
    'C:\\Python314\\python.exe',
    'C:\\Python313\\python.exe',
    'C:\\Python312\\python.exe',
    'C:\\Python311\\python.exe',
];
const foundPython = pythonCandidates.find(p => fs.existsSync(p));
console.log('Found Python:', foundPython || 'Not found - will use PATH');

// Test actual execution
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-exec-'));
const code = 'print(42)';
const pyCode = 'import json\nnull = None\ntrue = True\nfalse = False\n\n' + code;
fs.writeFileSync(path.join(tmpDir, 'script.py'), pyCode);

const pythonPath = foundPython ? `"${foundPython}"` : 'python';
const scriptPath = path.join(tmpDir, 'script.py');
const cmd = `${pythonPath} "${scriptPath}"`;
console.log('Running cmd:', cmd);

try {
    const out = execSync(cmd, { encoding: 'utf-8', timeout: 5000 });
    console.log('Python output:', out.trim());
    console.log('SUCCESS: Python execution works!');
} catch(e) {
    console.log('ERROR:', e.stderr || e.message);
}
fs.rmSync(tmpDir, { recursive: true, force: true });
