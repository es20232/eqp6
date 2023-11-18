import './form.css';
import { useState, useEffect } from 'react';

const Image_List = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/upload/');
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="form-section">
      <form>
        <h2>Uploaded Images</h2>
        <section>
          {files.map((file, index) => (
            <section key={index}>
              <p>Content Type: {file.content_type}</p>
              {file.file_content ? (
                <img
                  src={`data:${file.content_type};base64,${file.file_content}`}
                  alt={`Image ${index}`}
                  style={{ maxWidth: '100%', maxHeight: '300px' }}
                />
              ) : (
                <p>No file content available.</p>
              )}
            </section>
          ))}
        </section>
      </form>
    </section>
  );
};

export default Image_List;
