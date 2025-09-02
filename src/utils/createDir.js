import fs from 'node:fs/promises';

export const createDir = async (url) => {
    try {
        await fs.access(url);
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.mkdir(url);
        }
    }
};