import React, { useState } from "react";
import Form from "./components/Form";
import Form_Search from "./components/Form-Search";
import Image_Form from "./components/Image-Form";
import Image_List from "./components/Image-List";

function App() {
  const [activeComponent, setActiveComponent] = useState("Form");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Form":
        return <Form title="Formulário de cadastro" />;
      case "Form_Search":
        return <Form_Search title="Formulário de Busca" />;
      case "Image_Form":
        return <Image_Form title="Formulário de Imagem" />;
      case "Image_List":
        return <Image_List title="Lista de Imagens" />;
      default:
        return null;
    }
  };

  return (
    <section className="App">
      <header className="form-header">
        <button className="button" onClick={() => setActiveComponent("Form")}>Form</button>
        <button className="button" onClick={() => setActiveComponent("Form_Search")}>Form Search</button>
        <button className="button" onClick={() => setActiveComponent("Image_Form")}>Image Form</button>
        <button className="button" onClick={() => setActiveComponent("Image_List")}>Image List</button>
      </header>

      {renderComponent()}
    </section>
  );
}

export default App;
