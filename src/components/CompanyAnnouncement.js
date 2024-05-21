import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Lütfen bir dosya seçin!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/api/company/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        alert('Döküman başarıyla yüklendi: ' + response.data.document);
      } else {
        throw new Error('Dosya yüklenirken bir sorun oluştu.');
      }
    } catch (error) {
      alert('Yükleme sırasında hata oluştu: ' + error.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Yükle</button>
    </div>
  );
}

export default FileUpload;
