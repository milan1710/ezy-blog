import "./thumbnail.css";

export default function Thumbnail({ title }) {
  return (
    <div className="thumbnail-container">
      <img 
        src="/thumbnail/template.png" 
        alt={title}
        className="thumbnail-image"
      />
      <div className="thumbnail-overlay">
        <h2 className="thumbnail-title">{title}</h2>
      </div>
    </div>
  );
}