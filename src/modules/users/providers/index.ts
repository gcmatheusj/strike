import { container } from 'tsyringe';

import IHashProviders from './HashProvider/models/IHashProvider';
import HashProvider from './HashProvider/implementations/BcryptHashProvider';

container.registerSingleton<IHashProviders>('HashProvider', HashProvider);
