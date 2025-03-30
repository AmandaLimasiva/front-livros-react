import { useState, useEffect } from 'react';
import listaImg from '../assets/lista.svg';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import { Modal } from './Modal.jsx';
import Axios from 'axios';
import styles from '../styles/content.module.css';


//Barra de notificação controlo aqui
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export function Content() {
  const [repositories, setRepositories] = useState([]);
  const [nome, setNome] = useState('');
  const [quantPag, setQuantPag] = useState('');
  const [resenha, setResenha] = useState('');
  const [imagem, setImagem] = useState('');
  const [success, setSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const baseURL = 'https://back-end-85oy.onrender.com/livros'; //Minha API

  //(GET)
  useEffect(() => {
    async function getData() {
      const response = await Axios.get(baseURL);
      setRepositories(response.data);
    }
    getData();
  }, []);

  function handleInputValueNome(event) {
    setNome(event.target.value);
  }

  function handleInputValueQuantPag(event) {
    setQuantPag(event.target.value);
  }

  function handleInputValueImagem(event) {
    setImagem(event.target.value);
  }

  function handleInputValueResenha(event) {
    setResenha(event.target.value);
  }

  function openModal(repo) {
    setSelectedRepo(repo);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelectedRepo(null);
  }

  // (POST)
  async function handleCreateMessage(event) {
    event.preventDefault();
  
    try {
      await Axios.post(baseURL, {
        nome,
        quantPag,
        resenha,
        imagem
      });
  
      const response = await Axios.get(baseURL);
      setRepositories(response.data);
  
      setSuccess(true);
      setNome('');
      setQuantPag('');
      setImagem('');
      setResenha('');
  
      toast.success('Livro cadastrado com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (error) {
      //console.error('Erro ao cadastrar:', error);
      toast.error('Erro ao cadastrar o livro. Tente novamente!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  }
  
  // (PATCH)
  const handleEdit = async (repo) => {
    try {
      await Axios.patch(`${baseURL}/${repo._id}`, {
        nome: repo.nome,
        quantPag: repo.quantPag,
        resenha: repo.resenha,
        imagem: repo.imagem,
      });

      const response = await Axios.get(baseURL);
      setRepositories(response.data);

      setModalOpen(false); // Fecha o modal após a edição
    } catch (error) {
      console.error("Erro ao editar livro:", error);
    }
  };

  // (DELETE)
  const handleDelete = async (bookId) => {
    try {
      await Axios.delete(`${baseURL}/${bookId}`);

      const response = await Axios.get(baseURL);
      setRepositories(response.data);

      setModalOpen(false); // Fecha o modal após a exclusão
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
    }
  };

  return (
    <>
      <Header
        title="Meus livros favoritos"
        subtitle="Ficha técnica dos livros"
        image={listaImg} // Se precisar alterar, faça aqui
      />

      {/* Formulário de Cadastro */}
      <div>
        <h2 className={styles.projectsTitle}>Adicione um livro</h2>
        <form className={styles.form} onSubmit={handleCreateMessage}>
          <input
            onChange={handleInputValueNome}
            placeholder="Digite o nome"
            value={nome}
            className={styles.formInput}
          />
          <input
            onChange={handleInputValueImagem}
            placeholder="Digite o link da imagem"
            value={imagem}
            className={styles.formInput}
          />
          <input
            onChange={handleInputValueQuantPag}
            placeholder="Digite a quantidade de páginas"
            value={quantPag}
            className={styles.formInput}
          />
          <textarea
            onChange={handleInputValueResenha}
            placeholder="Digite a resenha"
            value={resenha}
            className={styles.formTextArea}
          />
          <button className={styles.formButton} type="submit">Enviar</button>
        </form>
      </div>

      <div className={styles.projectsContainer}>
        <div className={styles.cardsRepoContainer}>
          {repositories.map((repo) => (
            <div key={repo._id} className={styles.cardRepo} onClick={() => openModal(repo)}>
              <div className={styles.cardImgContainer}>
                <img className={styles.cardRepoImage} src={repo.imagem} alt={repo.nome} />
              </div>
              <h3 className={styles.cardRepoSummary}>{repo.nome}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Modal com as ações de Editar e Excluir */}
      {selectedRepo && (
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          repo={selectedRepo}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      <ToastContainer/>
      <Footer />
    </>
  );
}
