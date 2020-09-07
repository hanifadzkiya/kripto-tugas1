import React, { useState } from 'react';

import './TextBox.css';

const TEXT_LENGTH_LIMIT = 2048;

function TextBox({ rows, cols, text, setText }) {
  const [fiveGroupView, setFiveGroupView] = useState(false);

  const handleChangeText = ({target: {value}}) => {
    setText(value);
  };

  const handleChangeFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => { 
      setText(e.target.result);
    };
    reader.readAsText(e.target.files[0]);
  }

  const handleDownloadFile = () => {
    const element = document.createElement('a');
    const file = new Blob([text]);
    element.href = URL.createObjectURL(file);
    element.download = 'downloadedFile';
    document.body.appendChild(element);
    element.click();
  }

  const truncatedText = text.length > TEXT_LENGTH_LIMIT
    ? text.substring(0, TEXT_LENGTH_LIMIT) + '\n\n-- text hidden due to overflow --'
    : text;

  return (
    <div className='text-box'>
      <textarea
        rows={rows}
        cols={cols}
        onChange={handleChangeText}
        value={fiveGroupView
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
