import styles from './index.less';
import { useEffect } from 'react';

export default function IndexPage() {
  useEffect(() => {}, []);
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
