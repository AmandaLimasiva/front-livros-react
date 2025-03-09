import styles from '../styles/modal.module.css';

export function Modal({ isOpen, onClose, repo }) {
    if (!isOpen) return null;


    return (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={onClose}>X</button>
            <img src={repo.imagem} alt={repo.nome} className={styles.modalImage} />
            <h2>{repo.nome}</h2>
            <p>{repo.quantPag}</p>
            <q>{repo.resenha}</q>
          </div>
        </div>
      );
    }