//app/api/fetchRecording/route.ts
'use server';
import axios from 'axios';

export const fetchRecording = async (callId: string, apiKey: string): Promise<string | undefined> => {
    try {
        const response = await axios.get(`https://us-west-2.recall.ai/api/v1/bot/${callId}`, {
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            }
        });
        if (response.data.video_url) {
            return response.data.video_url;
        } else {
            throw new Error('No ID found in response');
        }
    } catch (error) {
        console.error('Error joining the call:', error);
        throw error;
    }
}