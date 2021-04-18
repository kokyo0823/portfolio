import Link from 'next/link';

export default function Home({portfolio}) {
  return (
    <div>
      <ul>
        {portfolio.map(portfolio => (
          <li key={portfolio.id}>
            <Link href={`portfolio/${portfolio.id}`}>
              <a>{portfolio.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch('https://kokyo-portfolio.microcms.io/api/v1/portfolio', key)
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      portfolio: data.contents,
    },
  };
};
