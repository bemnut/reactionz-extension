import React, { useState, useRef } from "react";

const AudioRecorder = ({
    isRecording,
    setIsRecording,
    audioURL,
    setAudioURL,
    mediaRecorder,
    setMediaRecorder,
    audioBlob,
    setAudioBlob,
}) =>
    //startRecording
    {
        const audioRef = useRef<any>();

        const stopRecording = () => {
            if (mediaRecorder && mediaRecorder.state !== "inactive") {
                mediaRecorder.stop();
                mediaRecorder.stream
                    .getTracks()
                    .forEach((track) => track.stop());
                setIsRecording(false);
            }
        };

        const deleteAudio = () => {
            setAudioURL("");
            setAudioBlob(null);
        };

        //   const uploadAudio = async (event) => {
        //     event.preventDefault();
        //     if (audioBlob) {
        //       const file = new File([audioBlob], "recording.webm", { type: "audio/webm" });

        //       try {
        //         const { url, fields } = await getS3PreSignedUrl(
        //           "audio/webm",
        //           `audio_${Date.now()}`,
        //           file.name,
        //           file.type,
        //           "voice_note"
        //         );

        //         // logic to upload
        //       } catch (error) {
        //         console.error("Error uploading audio:", error);
        //       }
        //     }
        //   };

        const handleAudioPlay = () => {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
            }
        };

        return (
            <div className="audio-recorder" style={styles.container}>
                {/* {!isRecording && !audioBlob && (
                <button onClick={startRecording} style={styles.micButton}>
                    <FaMicrophone size={24} />
                </button>
            )} */}
                {isRecording && (
                    <div style={styles.controls}>
                        <span style={styles.recordingIndicator}></span>
                        <span style={styles.timer}>Recording...</span>
                        <button
                            onClick={stopRecording}
                            style={styles.stopButton}
                        >
                            {/* <FaStop size={20} /> */}
                        </button>
                    </div>
                )}
                {audioURL && (
                    <div style={styles.playback}>
                        <audio
                            controls
                            ref={audioRef}
                            src={audioURL}
                            style={styles.audioPlayer}
                            onPlay={handleAudioPlay}
                            onLoadedMetadata={() =>
                                (audioRef.current.currentTime =
                                    Number.MAX_SAFE_INTEGER)
                            }
                        />
                        {/* <button onClick={uploadAudio} style={styles.uploadButton}>
                        Upload
                    </button> */}
                        <button
                            onClick={deleteAudio}
                            style={styles.deleteButton}
                        >
                            {/* <FaTrash size={20} /> */}
                        </button>
                    </div>
                )}
            </div>
        );
    };

const styles = {
    container: {
        // position: "fixed",
        // top: "10px",
        // left: "10px",
    },
    micButton: {
        backgroundColor: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
    },
    controls: {
        display: "flex",
        alignItems: "center",
    },
    recordingIndicator: {
        width: "10px",
        height: "10px",
        backgroundColor: "#f00",
        borderRadius: "50%",
        marginRight: "10px",
        animation: "blink 1s infinite",
    },
    timer: {
        marginRight: "10px",
        color: "#333",
    },
    stopButton: {
        backgroundColor: "#f00",
        border: "none",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "#fff",
    },
    playback: {
        marginTop: "20px",
        display: "flex",
        alignItems: "center",
    },
    audioPlayer: {
        marginRight: "10px",
    },
    uploadButton: {
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        padding: "5px 10px",
        cursor: "pointer",
        marginRight: "10px",
    },
    deleteButton: {
        backgroundColor: "#FF4D4F",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        padding: "5px 10px",
        cursor: "pointer",
    },
};

export default AudioRecorder;
