import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
}

const BASE_URL = "https://anbudevs.vercel.app";
const DEFAULT_TITLE = "AnbuDevs — Developer Skills & Placement Hub";
const DEFAULT_DESCRIPTION =
  "Master coding, aptitude, communication, and explore career roadmaps. Practice 3000+ DSA problems with a real code editor.";

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
}) => {
  const fullTitle = title ? `${title} | AnbuDevs` : DEFAULT_TITLE;
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};
