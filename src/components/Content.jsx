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
  //Campos novoss
  const [categoria, setCategoria] = useState(''); 
  const [autor, setAutor] = useState('');
  const [status, setStatus] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataTermino, setDataTermino] = useState('');
  const [notaLeitura, setNotaLeitura] = useState(0);



  //const baseURL = 'https://back-end-85oy.onrender.com/livros'; //Minha API
  const baseURL = 'http://localhost:3333/livros';



  //(GET)
 useEffect(() => {
  async function getData() {
    try {
      const response = await Axios.get(baseURL);
      setRepositories(response.data); 
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  }
  getData();
}, []);


//Funções que controlo o input do forms
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

  //Campos novos

  function handleInputValueAutor(event) {
  setAutor(event.target.value);
  }

  function handleInputValuestatus(event) {
  setStatus(event.target.value);
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
  
    console.log('📦 Dados sendo enviados para o backend:', {
    nome,
    quantPag,
    imagem,
    resenha,
    categoria,
    autor, 
    status,
    dataInicio,
    dataTermino,
    notaLeitura

    });

    try {
      await Axios.post(baseURL, {
        nome,
        quantPag,
        resenha,
        imagem,
        categoria, 
        autor,
        status,
        dataInicio,
        dataTermino,
        notaLeitura

      });
  
      const response = await Axios.get(baseURL);
      setRepositories(response.data);

      //Resetar o campo depois de enviar 
      setSuccess(true);
      setNome('');
      setQuantPag('');
      setImagem('');
      setResenha('');
      setCategoria('');
      setAutor('');
      setStatus('');
      setDataInicio('');
      setDataTermino('');
      setNotaLeitura(0); 


      toast.success('Livro cadastrado com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
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
        hideProgressBar: false,
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
        categoria: repo.categoria, 
        autor: repo.autor, 
        status: repo.status 
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
      //Exclui o livro
      await Axios.delete(`${baseURL}/${bookId}`);

      //Retorna os livros okay
      const response = await Axios.get(baseURL);
      setRepositories(response.data);

      setModalOpen(false); // Fecha o modal após a exclusão
      //Notificação de sucesso 

      toast.success('Livro excluído com sucesso!', {
        position: "top-right",  // Posição da notificação
        autoClose: 5000,  // Tempo de duração
        hideProgressBar: false,  
        theme: "colored",
      });
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
      toast.error('Erro ao excluir o livro. Tente novamente!', {
        position: "top-right",  // Posição da notificação
        autoClose: 5000,  // Tempo de duração
        hideProgressBar: false, 
        theme: "colored",
      });
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

          <select
            onChange={(e) => setCategoria(e.target.value)}
            value={categoria}
            className={styles.formInput}
          >
            <option value="">Qual o gênero??</option>
            <option value="Romance">Romance</option>
            <option value="Ficção Científica">Ficção Científica</option>
            <option value="Fantasia">Fantasia</option>
            <option value="Biografia">Biografia</option>
            <option value="Terror">Terror</option>
            <option value="Outro">Outro</option>
          </select>

          <input
            onChange={handleInputValueNome}
            placeholder="Qual o título?"
            value={nome}
            className={styles.formInput}
          />

          <input
            onChange={handleInputValueAutor}
            placeholder="Quem é o autor?"
            value={autor}
            className={styles.formInput}
          />

          <input
            onChange={handleInputValueImagem}
            placeholder="Adiciona a capa ;)"
            value={imagem}
            className={styles.formInput}
          />
          <input
            onChange={handleInputValueQuantPag}
            placeholder="Digite a quantidade de páginas"
            value={quantPag}
            className={styles.formInput}
          />

          <select
            onChange={handleInputValuestatus}
            value={status}
            className={styles.formInput}
          >
            <option value="">Qual o status da leitura?</option>
            <option value="Quero ler">Quero ler</option>
            <option value="Lendo">Lendo</option>
            <option value="Lido">Lido</option>
            <option value="Abandonado">Abandonado</option>
          </select> 

          <textarea
            onChange={handleInputValueResenha}
            placeholder="Digite a resenha"
            value={resenha}
            className={styles.formTextArea}
          />

        <div className={styles.dateInputs}>
          <label>
            Início da leitura:
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className={styles.formInput}
            />
          </label>

          <label>
            Término da leitura:
            <input
              type="date"
              value={dataTermino}
              onChange={(e) => setDataTermino(e.target.value)}
              className={styles.formInput}
            />
          </label>
        </div>

        <div className={styles.ratingContainer}>
          <p>Quanto você gostou da leitura?</p>
          {[1, 2, 3, 4, 5].map((nota) => (
            <span
              key={nota}
              onClick={() => setNotaLeitura(nota)}
              style={{
                cursor: 'pointer',
                fontSize: '24px',
                color: notaLeitura >= nota ? 'red' : 'gray',
              }}
            >
              ❤️
            </span>
          ))}
        </div>


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
