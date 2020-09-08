import React, { useState } from 'react';

import './TextBox.css';

const TEXT_LENGTH_LIMIT = 2048;

function TextBox({ rows, cols, text, setText, ext, setExt }) {
  const [fiveGroupView, setFiveGroupView] = useState(false);

  const handleChangeText = ({target: {value}}) => {
    setText(value);
  };

  const handleChangeFile = async (e) => {
    e.preventDefault();
    const fileExt = e.target.files[0].name.split('.').pop().toLowerCase();
    const isFileTypeTxt = fileExt === 'txt';
    const reader = new FileReader();
    if (isFileTypeTxt)
      reader.readAsText(e.target.files[0]);
    else
      reader.readAsArrayBuffer(e.target.files[0]);

    reader.onloadend = function (evt) {
      if (evt.target.readyState === FileReader.DONE) {
        setExt(fileExt);
        setText(isFileTypeTxt
          ? evt.target.result
          : new Uint8Array(evt.target.result));
      }
    }
  }

  const handleDownloadFile = () => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: "octet/stream" });
    element.href = URL.createObjectURL(file);
    element.download = `downloadedFile.${ext}`;
    document.body.appendChild(element);
    element.click();
  }
  
  const isTextBinary = text instanceof Uint8Array;
  let truncatedText = isTextBinary ? '-- binary file --\n\n' : '';
  truncatedText += text.length > TEXT_LENGTH_LIMIT
    ? text.slice(0, TEXT_LENGTH_LIMIT) + '\n\n-- text hidden due to overflow --'
    : text;

  return (
    <div className='text-box'>
      <textarea
        rows={rows}
        cols={cols}
        onChange={handleChangeText}
        value={fiveGroupView && !isTextBinary
          ? truncatedText.match(/.{1,5}/g).join(' ')
          : truncatedText}
      />
      <input type='file' onChange={handleChangeFile} />
      <button onClick={handleDownloadFile}>
        Download File
      </button>
      <button onClick={() => setFiveGroupView(!fiveGroupView)}>
        Change View
      </button>
    </div>
  );
}

export default TextBox;
