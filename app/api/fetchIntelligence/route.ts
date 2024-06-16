//app/api/fetchRecording/route.ts
'use server';
import axios from 'axios';

export const fetchIntelligence = async (callId: string, apiKey: string): Promise<string | undefined> => {
    try {
        const response = await axios.get(`https://us-west-2.recall.ai/api/v1/bot/${callId}/intelligence`, {
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            }
        });
        const summary = response.data['assembly_ai.summary'];
        if (summary) {
            return summary;
        } else {
            console.error('No summary found in response');
            throw new Error('No summary found in response');
        }
    } catch (error) {
        console.error('Error joining the call:', error);
        throw error;
    }
}