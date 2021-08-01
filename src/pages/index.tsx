import styles from './index.less';
import { useEffect } from 'react';

export default function IndexPage() {
  useEffect(() => {

    // fetch('./roles/list?gameId=1')
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //   });
  }, []);
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
