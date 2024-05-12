import { Request, Response, NextFunction } from 'express';

export function setupSSE(req: Request, res: Response, next: NextFunction): void {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Function to send a ping to keep the connection alive
    const ping = setInterval(() => {
        res.write(':\n\n');
    }, 30000);

    res.on('close', () => {
        clearInterval(ping);
        res.end();
    });

    next();
}
