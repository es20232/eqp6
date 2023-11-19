import './form.css';
import { useState } from 'react';

const Image_Form = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      if(!selectedFile.type.startsWith('image/')) {
        alert('O arquivo selecionado não é uma imagem.');
        return;
      }
      if(selectedFile.size > 1024 * 1024 * 10) {
        alert('A imagem é muito grande. Selecione uma imagem com menos de 10MB.');
        return;
      }

      setLoading(true); // Set loading to true when starting the upload

      const formData = new FormData();
      formData.append('file_uploaded', selectedFile);

      fetch('http://localhost:8000/api/upload/', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          setLoading(false); // Set loading to false once the upload is complete
          alert('Imagem enviada!');
          // Handle the response from the server if needed
        })
        .catch(error => {
          setLoading(false); // Set loading to false in case of an error
          alert('Ocorreu um erro ao enviar a imagem.\n' + error);
        });
    } else {
      alert('Selecione uma imagem antes de enviar.');
    }
  };

  return (
    <section className="form-section">
      <form>
        <h2>Image Upload</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="button" onClick={handleUpload} disabled={loading}>
          {loading ? 'Enviando...' : 'Upload'}
        </button>
        {selectedFile && (
          <section>
            <p>Selected File: {selectedFile.name}</p>
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
              style={{ maxWidth: '100%', maxHeight: '300px' }}
            />
          </section>
        )}
      </form>
    </section>
  );
};

export default Image_Form;
