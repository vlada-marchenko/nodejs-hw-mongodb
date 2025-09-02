import { setUpServer } from "./server.js";
import { initMongoConnection } from "./db/initMongoConnection.js";
import { createDir } from "./utils/createDir.js";
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "./constants/index.js";

const bootstrap = async () => {
    await initMongoConnection();
    await createDir(TEMP_UPLOAD_DIR);
    await createDir(UPLOAD_DIR);
    setUpServer();
};

bootstrap();