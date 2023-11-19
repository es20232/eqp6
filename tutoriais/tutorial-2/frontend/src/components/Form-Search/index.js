import './form.css';
import TextField from '../TextField';
import { useState, useEffect } from 'react';

const Form_Search = (props) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when starting the fetch

      if (search.length > 2) {
        try {
          // Clear the table by setting an empty array
          setSearchResults([]);

          const response = await fetch(`http://localhost:8000/api/users/?username=${search}`);
          const data = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false); // Set loading to false once the fetch is complete
        }
      } else {
        // Clear the table if the search query is empty
        setSearchResults([]);
        setLoading(false); // Set loading to false if the search query is empty
      }
    };

    fetchData();
  }, [search]);

  return (
    <section className="form-section">
      <form>
        <h2>{props.title}</h2>
        <TextField
          label="Pesquisar"
          placeholder="Digite o nome do usuário..."
          type="text"
          value={search}
          onChange={(value) => setSearch(value)}
        />
        {loading ? (
          <p>Loading users...</p>
        ) : searchResults.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Full Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.full_name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No results found.</p>
        )}
      </form>
    </section>
  );
};

export default Form_Search;
