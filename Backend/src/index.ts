import { Hono } from 'hono'
import userRouter from "./routes/user"
import blogRouter from './routes/blog';
import { cors } from 'hono/cors';

const app = new Hono();


app.get('/', async (c) => {
    c.text("hello working");
})

app.use(
    '/*',
    cors()
)
// routes
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter)

export default app

