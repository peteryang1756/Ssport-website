import fs from 'fs/promises';
import matter from "gray-matter";
import MarkdownIt from 'markdown-it';
import { NextSeo } from 'next-seo';

// The page for each post
export default function Post({frontmatter, content}) {
  const markdownToHtml = new MarkdownIt({
    const path = require('path')
    html: true,
    linkify: true,
    typographer: true,
  });
    const {title, author, category, date, bannerImage, tags} = frontmatter

    return <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
  <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
    <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
      <header className="mb-4 lg:mb-6 not-format">
          <img src={bannerImage}/>
          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
        {title}
        </h1>
        <address className="flex items-center mb-6 not-italic">
          <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
          
            <img
              className="mr-4 w-16 h-16 rounded-full"
              src="https://discuss.ssangyongsports.org/data/avatars/l/0/1.jpg?1679114793"
              alt="Peter yang"
            />
            <div>
              <a
                href="https://discuss.ssangyongsports.org/members/peter-yang.1/"
                rel="author"
                className="text-xl font-bold text-gray-900 dark:text-white"
              >
                {author}
              </a>
              <p className="text-base font-light text-gray-500 dark:text-gray-400">
                雙龍體育部長
              </p>
              <p className="text-base font-light text-gray-500 dark:text-gray-400">
                <time
                  pubdate=""
                  dateTime="{date}"
                  title="{date}"
                >
                  {date}
                </time>
              </p>
            </div>
          </div>
        </address>
      </header>
     <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </article>
<NextSeo
  title={`${title}-雙龍體育blog`}
  description={title}
/>

  </div>
</main>

}
export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = await fs.promises.readdir(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace(/\.md$/, ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}



export async function getStaticProps({ params }) {
  const { slug } = params;

  const markdownWithMetadata = fs
    .readFileSync(`posts/${slug}.md`)
    .toString();

  const { data: frontmatter, content } = matter(markdownWithMetadata);

  return {
    props: {
      frontmatter,
      content,
    },
  };
}
