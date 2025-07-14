import * as fs from 'fs';
import * as path from 'path';

export const readKeyFile = (relativePath: string, name: string): string => {
  const fullPath = path.resolve(__dirname, relativePath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`${name} key file not found at ${fullPath}`);
  }

  return fs.readFileSync(fullPath, 'utf8').trim();
};
export const updateEnvFile = (key: string, value: string): void => {
  const envPath = path.resolve(process.cwd(), '.env');
  const quotedValue = `'${value}'`;
  const newEntry = `${key}=${quotedValue}`;

  let content = '';

  if (fs.existsSync(envPath)) {
    content = fs.readFileSync(envPath, 'utf8');

    const regex = new RegExp(`${key}\\s*=\\s*(['"])([\\s\\S]*?)\\1`, 'm');

    if (regex.test(content)) {
      content = content.replace(regex, newEntry);
    } else {
      content += `\n${newEntry}`;
    }
  } else {
    content = `${newEntry}\n`;
  }

  fs.writeFileSync(envPath, content, 'utf8');
};
