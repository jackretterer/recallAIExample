// app/page.tsx
'use client';
import { useState, FormEvent } from 'react';
import { joinCall } from '../app/api/join-call/route'
import { leaveCall } from "./api/leave-call/route";
import { fetchRecording } from './api/fetchRecording/route';
import { fetchTranscript } from './api/fetchTranscript/route';
import { analyzeCall } from './api/analyze-call/route';
import { fetchIntelligence } from './api/fetchIntelligence/route';

export default function Home() {
  const [meetingUrl, setMeetingUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [callId, setCallId] = useState(''); // State to store call ID
  const [showModal, setShowModal] = useState(false);
  const [recordingURL, setRecordingURL] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [triedToFetchRecording, setTriedToFetchRecording] = useState(false);
  const [triedToFetchTranscript, setTriedToFetchTranscript] = useState(false);
  const [triedToFetchSummary, setTriedToFetchSummary] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Meeting URL:', meetingUrl);
    console.log('API Key:', apiKey);

    try {
      const id = await joinCall(meetingUrl, apiKey);
      if (id !== undefined && id !== null) { 
        setCallId(id);
        console.log("Call ID received:", id);
        console.log('Call joined successfully');
      } else {
        console.log('No valid ID received from joinCall');
      }
    } catch (error) {
      console.error('Failed to join the call:', error);
    }
  };

  const handleLeave = async () => {
    if (!callId) {
      alert('No active call ID found');
      return;
    }
    try {
      await leaveCall(callId, apiKey);
      analyzeCall(callId, apiKey);
      console.log('Call left successfully');
    } catch (error) {
      console.error('Failed to leave the call:', error);
    }
  };

  const getRecording = async () => {
    if (!callId || !apiKey) {
      console.log("callID or API key is missing.");
      setRecordingURL(null);
      return;
    }
    try {
      const url = await fetchRecording(callId, apiKey);
      console.log("URL: " + url)
      if (url) {
        setRecordingURL(url);
        window.open(url, '_blank');
      } else {
        setTriedToFetchRecording(true);
        setRecordingURL('');
        console.error('No recording URL returned');
      }
    } catch (error) {
      setTriedToFetchTranscript(true);
      console.error('Failed to fetch the recording:', error);
      setRecordingURL(null);
    }
  };

  const getTranscript = async () => {
    if (!callId || !apiKey) {
      console.log("callID or API key is missing.");
      setTranscript(null);
      return;
    }
    try {
      const data = await fetchTranscript(callId, apiKey);
      setTranscript(data || null);
    } catch (error) {
      setTriedToFetchTranscript(true);
      console.error('Failed to fetch the transcript:', error);
      setTranscript(null);
    }
  };

  const getSummary = async () => {
    if (!callId || !apiKey) {
      console.log("callID or API key is missing.");
      setSummary(null);
      return;
    }
    try {
      const data = await fetchIntelligence(callId, apiKey);
      setSummary(data || null);
    } catch (error) {
      setTriedToFetchSummary(true);
      console.error('Failed to fetch the summary:', error);
      setSummary(null);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600">Add Recall to Your Meeting</h1>
        <p className="text-lg text-center text-gray-700 mt-4">Record, analyze and summarize your meetings</p>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-6">
            <label htmlFor="meetingUrl" className="block mb-2 text-sm font-medium text-gray-900">Meeting URL</label>
            <input
              type="url"
              id="meetingUrl"
              name="meetingUrl"
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value)}
              required
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="https://example.com/meeting"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="apiKey" className="block mb-2 text-sm font-medium text-gray-900">API Key</label>
            <input
              type="text"
              id="apiKey"
              name="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              required
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter your API Key"
            />
          </div>
          <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Join Call</button>
        </form>
        <h3 className="text-center text-blue-600 pt-5 pb-1">Call over or want the bot to leave?</h3>
        <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleLeave}>Leave Call</button>
        <h3 className="text-center text-blue-600 pt-5 pb-1">Want to view the call details?</h3>
        <div className="flex justify-center items-center w-full">
          <button onClick={() => setShowModal(true)} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            View Call Details
          </button>
        </div>

        {showModal && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setShowModal(false)} aria-hidden="true"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded-lg shadow-lg w-full max-w-lg z-50">
              <button onClick={() => setShowModal(false)} className="absolute top-0 right-0 m-4 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5">
                Close
              </button>
              <h2 className="text-lg font-bold text-blue-600 text-center">Call Details</h2>
              {!apiKey && !callId && <p className='text-red-500 pt-2'>Note: You need to have the bot join a call in order to fetch details.</p>}
              <div className="mt-4">
                <h3 className="text-md font-bold text-black">Call Recording:</h3>
                <button onClick={getRecording} className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5">
                  Download Recording
                </button>
                {triedToFetchRecording && recordingURL === null && <p className="mt-2 text-red-500">There's no recording for the meeting.</p>}
                {recordingURL && <p className="pt-3 text-black">Recording will open in a new tab.</p>}
              </div>
              <div className='pt-5'>
                <h3 className="text-md font-bold text-black">Call Transcript:</h3>
                <button onClick={getTranscript} className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5">
                  Show Transcript
                </button>
                {triedToFetchTranscript && transcript === null && <p className="mt-2 text-red-500">There's no transcript for the meeting.</p>}
                {transcript && <p className="text-black pt-3">Transcript: {transcript}</p>}
              </div>
              <div className='pt-5'>
                <h3 className="text-md font-bold text-black">Call Summary:</h3>
                <button onClick={getSummary} className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5">
                  Show Summary
                </button>
                {triedToFetchSummary && summary === null && <p className="mt-2 text-red-500">There's no summary for the meeting.</p>}
                {summary && <p className="text-black">Summary: {summary}</p>}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}