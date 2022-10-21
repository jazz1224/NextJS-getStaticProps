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

export async function getStaticProps(context) {
  const { params } = context;
  const categoryId = params.cid;
  const filePath = path.join(process.cwd(), "data", "bigcategory.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  const category = data.categories.find((a) => a.id === categoryId);

  return {
    props: {
      loadedCategory: category,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { cid: "c1" } },
      { params: { cid: "c2" } },
      { params: { cid: "c3" } },
    ],
    fallback: false,
  };
}

export default CategoryDetail;
