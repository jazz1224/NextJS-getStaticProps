import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";
import Link from 'next/link';
export default function Home(props) {
  const { categories } = props;

  return (
    <Fragment>
      <h1>Choose your dream about</h1>
      <ul>
        {categories.map((a) => {
          return <li key={a.id}><Link href={`${a.id}`}>{a.category}</Link></li>;
        })}
      </ul>
    </Fragment>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "bigcategory.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      categories: data.categories,
    },
  };
}
