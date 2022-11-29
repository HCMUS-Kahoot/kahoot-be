import { JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY } from '../constant';

export default () => ({
  [JWT_SECRET_KEY]: process.env[JWT_SECRET_KEY],
  [JWT_REFRESH_SECRET_KEY]: process.env[JWT_REFRESH_SECRET_KEY],
});