// app/api/fetchTranscript/route.ts
'use server';
import axios from 'axios';

interface Word {
    text: string;
    start_timestamp: number;
    end_timestamp: number;
    language: string | null;
    confidence: number;
}

interface TranscriptSegment {
    words: Word[];
    speaker: string;
    language: string;
}

export const fetchTranscript = async (callId: string, apiKey: string): Promise<string | undefined> => {
    try {
        const response = await axios.get<TranscriptSegment[]>(`https://us-west-2.recall.ai/api/v1/bot/${callId}/transcript/`, {
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.length > 0) {
            const transcriptText = response.data.map((segment: TranscriptSegment) => 
                segment.words.map((word: Word) => word.text).join(' ')
            ).join(' ');

            return transcriptText;
        } else {
            throw new Error('No transcript found in response');
        }
    } catch (error) {
        console.error('Error fetching the transcript:', error);
        throw error;
    }
}
