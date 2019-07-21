import Link from 'umi/link'
import styles from '../index.css'
export let SideBar = () => {
  return (
    <div className={styles.side_left}>
      <div className="teacher">
        <Link to="/teachers/">教师系统</Link>
      </div>
      <div className="student">
        <Link to="/students/">学生系统</Link>
      </div>
    </div>
  )
}