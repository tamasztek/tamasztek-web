import "./IllustratedTag.css";

interface IllustratedTagProps {
  image: string;
  label: string;
  alt?: string;
}

const IllustratedTag: React.FC<IllustratedTagProps> = ({
  image,
  label,
  alt,
}) => {
  return (
    <figure className="illustrated-tag">
      <img
        className="illustrated-tag__image"
        src={image}
        alt={alt ?? label}
        loading="lazy"
      />
      <figcaption className="illustrated-tag__label">{label}</figcaption>
    </figure>
  );
};

export default IllustratedTag;
