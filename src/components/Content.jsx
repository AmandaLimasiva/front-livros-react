import { useState, useEffect } from 'react'
import listaImg from '../assets/lista.svg'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'

import Axios from 'axios'

import styles from '../styles/content.module.css'

export function Content() {
  const [repositories, setRepositories] = useState([])
  const [nome, setNome] = useState('')
  const [quantPag, setQuantPag] = useState('')  // Alterado de minibio para quantPag
  const [resenha, setResenha] = useState('')  // Alterado de citacao para resenha
  const [imagem, setImagem] = useState('')
  const [success, setSuccess] = useState(false)
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
    setQuantPag(event.target.value)  // Atualizado para refletir quantPag
  }

  function handleInputValueImagem(event) {
    setImagem(event.target.value)
  }

  function handleInputValueResenha(event) {
    setResenha(event.target.value)  // Atualizado para refletir resenha
  }

  async function handleCreateMessage(event) {
    event.preventDefault()

    console.log('Cadastro enviado', nome, quantPag, resenha, imagem)

    try {
      await Axios.post(baseURL, {
        nome: nome,
        quantPag: quantPag,  // Enviado corretamente como quantPag
        resenha: resenha,  // Enviado corretamente como resenha
        imagem: imagem
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
        title='Mulheres em Tech Brasil'
        subtitle='Conheça personalidades femininas que estão transformando a tecnologia no Brasil'
        image={listaImg}
      />
      <div className={styles.projectsContainer}>
        <div className={styles.cardsRepoContainer}>
          {repositories.map((repo) => (
            <div key={repo._id} className={styles.cardRepo}>
              <div className={styles.cardImgContainer}>
                <img className={styles.cardRepoImage} src={repo.imagem} />
              </div>
              <details>
                <summary className={styles.cardRepoSummary}>
                  {repo.nome}
                </summary>
                <p className={styles.cardRepoText}>Páginas: {repo.quantPag}</p>
                <q className={styles.cardRepoQuote}>{repo.resenha}</q>
              </details>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className={styles.projectsTitle}>Cadastre uma rainha tech:</h2>
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
