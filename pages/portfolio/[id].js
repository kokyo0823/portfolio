export default function BlogId({ portfolio }) {
  return (
    <main>
      <h1>{portfolio.title}</h1>
      <p>{portfolio.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${portfolio.body}`,
        }}
      />
    </main>
  );
}

// 静的生成のためのパスを指定
export const getStaticPaths = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch('https://kokyo-portfolio.microcms.io/api/v1/portfolio', key)
    .then(res => res.json())
    .catch(() => null);
  const paths = data.contents.map(content => `/portfolio/${content.id}`);
  return {paths, fallback: false};
};

// データをテンプレートに受け渡す部分の処理を記述
export const getStaticProps = async context => {
  const id = context.params.id;
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch(
    'https://kokyo-portfolio.microcms.io/api/v1/portfolio/' + id,
    key,
  )
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      portfolio: data,
    },
  };
};
