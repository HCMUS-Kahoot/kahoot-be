import { PORT } from '../constant';

export default () => ({
  [PORT]: process.env[PORT],
});
