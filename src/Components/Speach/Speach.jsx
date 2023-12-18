const Speach = ({
  browserSupportsSpeechRecognition,
  handleMic,
  listening,
  resetTranscript,
  transcript
}) => {
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <div className="speachParent">
      <div>
        <i
          onClick={handleMic}
          className={
            listening
              ? `fa-solid fa-microphone-lines text-danger `
              : `fa-solid fa-microphone-lines text-dark`
          }
        ></i>
        <i className={transcript==''?'d-none':"fa-solid fa-delete-left deleteParen"} onClick={resetTranscript}></i>
      </div>
    </div>
  );
};
export default Speach;
