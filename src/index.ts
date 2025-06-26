import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {startServer, clearCache} from './server';

yargs(hideBin(process.argv)).command('start', 'Start the application', 
    {
        port: {
            alias: 'p',
            type: 'number',
            description: 'Port to run the application on',
            demandOption: true,
        },
        origin: {
            alias: 'o',
            type: 'string',
            description: 'Origin URL for Proxy',
            demandOption: true,
        },
    },
    (argv: { port: number; origin: string; }) => {
        console.log(`Starting application on port ${argv.port} with origin ${argv.origin}`);
        // Here you would typically start your application logic
        startServer(argv.port, argv.origin)
    }
).command('clear', 'Clear the proxy cache',{},
    async () => {
        console.log('Clearing proxy cache...');
        await clearCache()
    }
).parse();