import Form from "./components/Form";
import Form_Search from "./components/Form-Search";
import Image_Form from "./components/Image-Form";
import Image_List from "./components/Image-List";

function App() {
  return (
    <div className="App">
      <Form title="Formulário de cadastro"/>
      <Form_Search title="Formulário de Busca"/>
      <Image_Form title="Formulário de Imagem"/>
      <Image_List title="Lista de Imagens"/>
    </div>
  );
}

export default App;