import Image from "next/image";
import styles from "./page.module.css";
import Gallery from "./gallery";


export default async function Home() {
  const users = await getData()

  return (
    <main className={styles.main}>
      <Gallery users={users}/>
    </main>
  );
}

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}