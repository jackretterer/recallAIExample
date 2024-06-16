'use server';
import axios from 'axios';

export const joinCall = async (meetingUrl: string, apiKey: string): Promise<void> => {
    try {
        const response = await axios.post('https://us-west-2.recall.ai/api/v1/bot',
            {
                meeting_url: meetingUrl,
                transcription_options: {
                    provider: "meeting_captions"
                },
                bot_name: "Jack Bot"
            },
            {
                headers: {
                    'Authorization': apiKey,
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        if (response.data && response.data.id) {
            return response.data.id;
        } else {
            throw new Error('No ID found in response');
        }
    } catch (error) {
        console.error('Error joining the call:', error);
        throw error;
    }
}