// export const BACKEND_URL=' http://127.0.0.1:8787'
import { config } from "dotenv"
config();

export const API_KEY = process.env.API_KEY;
export const BACKEND_URL='https://medium.wearedevs.workers.dev'