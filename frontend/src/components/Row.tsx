interface Props {
  items: any[];
}

export default function Row({ items }: Props) {
  if (!Array.isArray(items) || items.length === 0) {
    return <p className="text-gray-400">Sin contenido</p>;
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {items.map(item => (
        <img
          key={item.id}
          src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
          alt={item.title || item.name}
          className="w-40 rounded"
        />
      ))}
    </div>
  );
}
