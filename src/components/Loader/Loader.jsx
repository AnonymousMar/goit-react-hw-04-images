import css from './Loader.module.css';
import { BallTriangle } from 'react-loader-spinner';


export function Loader() {
    return (
        <div className={css.loaderWrapper}>
            <BallTriangle />
        </div>
    );
};

export default Loader;