import fs from "fs";
import matter from "gray-matter";
import MarkdownIt from "markdown-it"; // import the markdown-it library
import md from "markdown-it"; // import the markdown-it library
import { NextSeo } from 'next-seo';
import path from "path";

// The page for each post
export default function Post({frontmatter, content}) {
    const {title, author, category, date, bannerImage, tags} = frontmatter

    return <main>
        <img src={bannerImage}/>
        <h1>{title}</h1>
        <h2>{author} || {date}</h2>
        <h3>{category} || {tags.join()}</h3>
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
    </main>

}

// Generating the paths for each post
export async function getStaticPaths() {
  // Get list of all files from our posts directory
  const files = fs.readdirSync("posts");
  // Generate a path for each one
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));
  // return list of paths
  return {
    paths,
    fallback: false,
  };
}

// Generate the static props for the page
export async function getStaticProps({ params: { slug } }) {
  const fullPath = path.join("posts", `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);
  const md = new MarkdownIt();
  const htmlContent = md.render(content);

  return {
    props: {
      frontmatter,
      content: htmlContent,
    },
  };
}
