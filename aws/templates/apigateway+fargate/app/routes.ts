import { Router, Request, Response } from 'express';

const routes = Router();

routes.post('/mensagem', (request: Request, response: Response) => {
    console.log(request.body)

    // return response.json('{ "teste": 12 }')
    return response.json({ code: 201, mensagem: "sua mensagem foi recebida!" })
});

routes.get('/_info', (request: Request, response: Response) => {
    console.log('Health Check!')
    return response.json("i'm alive!")
});

export { routes }