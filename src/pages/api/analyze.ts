import type { APIRoute } from 'astro';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { prompt } = body;

        if (!prompt) {
            return new Response(JSON.stringify({ error: 'Prompt is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const apiKey = import.meta.env.GEMINI_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'Server configuration error: Missing API Key' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const reportText = response.text();

        return new Response(JSON.stringify({ reportText }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Gemini API Error:', error);
        return new Response(JSON.stringify({ error: 'Failed to generate analysis' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
