import Runtime from 'regenerator-runtime/runtime';
import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "../../index.css"
import micro from "../../assets/micro.png";
import recording from "../../assets/recording.png";

export const Vocal = ({ setVocalReq }) => {
    const { transcript, listening } = useSpeechRecognition([]);


    const startListening = () => {
        SpeechRecognition.startListening();

        if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
            alert("your browser doesn't support Speech Recognition!")
        }
    }

    const stopListening = () => {
        SpeechRecognition.stopListening();
    }

    useEffect(() => {
        console.log("Transcript:", transcript);
        setVocalReq(transcript);
    }, [transcript])



    return (
        <div className='vocal-container'>
            <div>
                {listening ? (
                    // rely on "listening" property is better than the creating a toggler
                    <button className='btn-icon' onClick={stopListening}>
                        <img className='icon' src={recording} alt="recording..." />
                    </button>
                ) : (
                    <button className='btn-icon' onClick={startListening}>
                        <img className='icon' src={micro} alt="Micro" />
                    </button>
                )}
            </div>
        </div>
    );
}
