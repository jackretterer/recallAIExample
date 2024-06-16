'use server';
import axios from 'axios';

export const leaveCall = async (callId: string, apiKey: string): Promise<void> => {
    try {
        const response = await axios.post(`https://us-west-2.recall.ai/api/v1/bot/${callId}/leave_call/`, {}, {
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            }
        });
        console.log('Call left successfully:', response.data);
    } catch (error) {
        console.error('Error leaving the call:', error);
    }
}
