import React, { useState } from 'react';
import '../styles/App.css';

function Home() {
    const [inputText, setInputText] = useState('');
    const [encodedResult, setEncodedResult] = useState('');
    const [inputTextDecode, setInputTextDecode] = useState('');
    const [decodedResult, setDecodedResult] = useState('');

    const handleEncode = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8002/api/run-script/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input_text: inputText }),
            });
            const data = await response.json();
            setEncodedResult(data.result);
        } catch (error) {
            console.error('Error:', error);
            setEncodedResult('Error: ' + error);
        }
    };

    const handleDecode = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8002/api/run-script/decode/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input_text: inputTextDecode }),
            });
            const data = await response.json();
            setDecodedResult(data.results);
        } catch (error) {
            console.error('Error:', error);
            setDecodedResult('Error: ' + error);
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen gap-10 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Base64 Encoder</h1>
                <div className="mb-4">
                    <label htmlFor="inputText" className="block text-gray-700 font-semibold mb-2">Enter text:</label>
                    <textarea
                        id="inputText"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter text"
                    />
                </div>
                <button
                    onClick={handleEncode}
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    Submit
                </button>
                <div id="result" className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded-lg overflow-auto break-words max-h-96">
                    {encodedResult}
                </div>
            </div>

            <div>
                <a href="/logout" className='px-6 py-3 bg-green-400 font-bold text-xl rounded hover:bg-green-600 duration-200'>Logout</a>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Base64 Decoder</h1>
                <div className="mb-4">
                    <label htmlFor="inputTextDecode" className="block text-gray-700 font-semibold mb-2">Enter encoded text:</label>
                    <textarea
                        id="inputTextDecode"
                        value={inputTextDecode}
                        onChange={(e) => setInputTextDecode(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter encoded text"
                    />
                </div>
                <button
                    onClick={handleDecode}
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    Submit
                </button>
                <div id="resultDecode" className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded-lg overflow-auto break-words max-h-96">
                    {decodedResult}
                </div>
            </div>
        </div>
    );
}

export default Home