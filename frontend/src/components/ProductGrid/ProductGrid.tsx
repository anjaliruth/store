export default function ProductGrid({ dataFromServer }) {
  return (
    <div className="productGrid">
      {dataFromServer.map((item) => (
        <div key={item.id} className="productCard">
          <img src={item.image} alt={item.name} />
          <h1 className="productName">{item.name}</h1>
          <h2>Price: £{item.price}</h2>
          <h3>{item.description}</h3>
        </div>
      ))}
    </div>
  );
}
