import Server from './config/server.config'
import ENV from './config/env.config';

Server.listen(ENV.PORT, () => {
    console.log(`Server is running in http://localhost:${ENV.PORT}`);
});