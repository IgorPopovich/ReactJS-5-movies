
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.StartLoaderContainer}>
    <p className={css.loadingTitle}>Loading...</p>
    <div className={css.StartLoader}>
    </div>
</div>
  );
};

export default Loader;