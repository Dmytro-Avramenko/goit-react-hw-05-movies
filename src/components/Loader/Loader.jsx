import { Bars } from 'react-loader-spinner';
import s from './Loader.module.css';

function Loader() {
  return (
    <div
      className={s.loader}
    >
      <Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loader