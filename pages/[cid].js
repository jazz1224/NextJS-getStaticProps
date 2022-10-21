import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

function CategoryDetail(props) {
  const { loadedCategory } = props;

  return (
    <Fragment>
      <h1>This is {loadedCategory.category} category</h1>
      <p>Image URL : {loadedCategory.image}</p>
    </Fragment>
  );
}


async function getData(){
    const filePath = path.join(process.cwd(), "data", "bigcategory.json");
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    return data
}


export async function getStaticProps(context) {
  const { params } = context;
  const categoryId = params.cid;
  const data = await getData()
  const category = data.categories.find((a) => a.id === categoryId);

  return {
    props: {
      loadedCategory: category,
    },
  };
}

export async function getStaticPaths() {

    const data = await getData()
    const ids = data.categories.map((a)=>a.id)
    const pathsWithParams = ids.map((aaa)=>({params:{cid : aaa}}))
  return {
    paths: pathsWithParams,
    fallback: false,
  };
}

export default CategoryDetail;
