import { useState, useEffect } from 'react'
import listaImg from '../assets/lista.svg'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'
import { Modal } from './Modal.jsx'
import Axios from 'axios'
import styles from '../styles/content.module.css'

export function Content() {
  const [repositories, setRepositories] = useState([])
  const [nome, setNome] = useState('')
  const [quantPag, setQuantPag] = useState('')
  const [resenha, setResenha] = useState('')
  const [imagem, setImagem] = useState('')
  const [success, setSuccess] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRepo, setSelectedRepo] = useState(null)
  const baseURL = 'https://back-end-85oy.onrender.com/livros'

  useEffect(() => {
    async function getData() {
      const response = await Axios.get(baseURL)
      setRepositories(response.data)
    }
    getData()
  }, [])

  function handleInputValueNome(event) {
    setNome(event.target.value)
  }

  function handleInputValueQuantPag(event) {
    setQuantPag(event.target.value)
  }

  function handleInputValueImagem(event) {
    setImagem(event.target.value)
  }

  function handleInputValueResenha(event) {
    setResenha(event.target.value)
  }

  function openModal(repo) {
    setSelectedRepo(repo)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setSelectedRepo(null)
  }

  async function handleCreateMessage(event) {
    event.preventDefault()

    console.log('Cadastro enviado', nome, quantPag, resenha, imagem)

    try {
      await Axios.post(baseURL, {
        nome,
        quantPag,
        resenha,
        imagem
      })
      const response = await Axios.get(baseURL)
      setRepositories(response.data)

      setSuccess(true)
      setNome('')
      setQuantPag('')
      setImagem('')
      setResenha('')
    } catch (error) {
      console.error('Erro ao cadastrar:', error)
    }
  }

  return (
    <>
      <Header
        title='Meus livros favoritos'
        subtitle='Ficha técnica dos livros'
        image={listaImg} // Se precisar alterar, faça aqui
      />

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

      {/* Modal */}
      {selectedRepo && (
        <Modal isOpen={modalOpen} onClose={closeModal} repo={selectedRepo} />
      )}

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
          {success && <p>Cadastro realizado com sucesso.</p>}
        </form>
      </div>

      <Footer />
    </>
  )
}
