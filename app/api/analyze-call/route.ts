'use server';
import axios from 'axios';

export const analyzeCall = async (callId: string, apiKey: string): Promise<string | undefined> => {
    const url = `https://us-west-2.recall.ai/api/v2beta/bot/${callId}/analyze`;
    const data = {
      assemblyai_async_transcription: {
        summarization: true,
        summary_type: "paragraph",
        summary_model: "informative"
      }
    };
  
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log('Analysis started successfully:', response.data);
      return response.data
    } catch (error) {
      console.error('Error starting analysis:', error);
    }
}