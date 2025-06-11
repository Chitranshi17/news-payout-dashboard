const NewsCard = ({ article }) => {
  return (
    <div className="border rounded-md p-4 shadow hover:shadow-md transition">
      <h3 className="font-bold text-lg">{article.title}</h3>
      <p className="text-sm text-gray-600">
        By {article.author || "Unknown"} on{" "}
        {new Date(article.publishedAt).toLocaleDateString()}
      </p>
      <p className="mt-2 text-gray-700">
        {article.description?.slice(0, 100)}...
      </p>
      <a
        href={article.url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 text-sm mt-2 inline-block"
      >
        Read More
      </a>
    </div>
  );
};

export default NewsCard;
