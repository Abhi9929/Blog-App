import { decode, sign, verify } from 'hono/jwt'


const verifyJWT = async (c: any, next: any) => {
    try {
        // get the token
        const jwt = c.req?.header('authorization') || "";
        if (!jwt) {
            c.status(401);
            return c.json({ error: "unauthorized" })
        }

        const token = jwt.split(' ')[1];
        
        // verify the token
        const decodedPayload = await verify(token, c.env.JWT_SECRET)
        if (!decodedPayload) {
            c.status(401);
            return c.json({ error: "unauthorized" })
        }
        c.set('userId', decodedPayload.id)
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        c.status(500);
        return c.json({ error: "Internal Server Error" });
    }
    await next()
}

export { verifyJWT }