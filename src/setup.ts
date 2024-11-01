const fs = require('fs').promises;
const { resolve } = require('path');

async function createEnvFile() {
    const envFilePath = resolve(process.cwd(), '.env');
    const envContent = `API_KEY=\nENVIRONMENT=PROD`;
    try {
        await fs.access(envFilePath);
        console.log('✖️ .env file already exists. No changes made.');
    } catch {
        await fs.writeFile(envFilePath, envContent, { encoding: 'utf8' });
        console.log('✔️ .env file created successfully with default values.');
    }
}

createEnvFile().catch((error) => {
    console.error(error);
});