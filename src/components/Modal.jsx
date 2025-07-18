import styles from '../styles/modal.module.css';

export function Modal({ isOpen, onClose, repo, onEdit, onDelete }) {
  if (!isOpen) return null;

  const handleEdit = () => {
    // Chamando a função de edição com os dados do livro
    onEdit(repo);
  };

  const handleDelete = () => {
    // Chamando a função de exclusão passando o ID do livro
    onDelete(repo._id);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <img src={repo.imagem} alt={repo.nome} className={styles.modalImage} />
        <div className={styles.modalDivUm}>
          <h2>{repo.nome}</h2>
          <p>Páginas: {repo.quantPag}</p>
          <q>Sobre o Livro: {repo.resenha}</q>
         <q>Categoria: {repo.categoria}</q>
        </div>


        {/* Botões de Editar e Excluir */}
        <div className={styles.modalActions}>  {/* Aqui é a classe para mexer no Css*/}
            <p>Ações</p>
            <button onClick={handleEdit} className={styles.editButton}>Editar</button>
            <button onClick={handleDelete} className={styles.deleteButton}>Excluir</button>
        </div>
        </div>  
      </div>


  );
}
