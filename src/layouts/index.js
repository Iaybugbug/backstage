import { Header } from '../header';
import { SideBar } from '../pages/sideBar';
import styles from './index.css';

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <div className={styles.wrap}>
        <Header />
        <div className={styles.content}>
          <SideBar />
          <div className={styles.side_right}>{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default BasicLayout;
