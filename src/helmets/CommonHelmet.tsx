import { Helmet } from "react-helmet-async";

interface Props {
  pageTitle: string;
  url: string;
  description: string;
}

const CommonHelmet = ({ pageTitle, description, url }: Props) => {
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="subject" content="짤 추천 서비스" />
      <meta name="keywords" content="짤, 이미지, 밈, 짤 검색, 짤 추천" />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content="/thumbnail.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="짤뮤니티 로고" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:image" content="/thumbnail.jpg" />
      <meta name="twitter:image:alt" content="짤뮤니티 로고" />
    </Helmet>
  );
};

export default CommonHelmet;
