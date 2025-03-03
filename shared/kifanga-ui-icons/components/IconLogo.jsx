export function IconLogo({ title, firstPart, secondPart, firstPartColor, secondPartColor, ...props }) {
  const fontSize = 80;
  const firstPartWidth = firstPart.length * fontSize * 0.5;
  const spaceBetween = 10;
  const secondPartX = firstPartWidth + spaceBetween;

  return (
    <svg
      viewBox="0 0 512 128"
      fill="currentColor"
      height="3em"
      width="10em"
      {...props}
    >
      <title>{title}</title>
      
      {/* Render first part */}
      <text
        x="0"
        y="50%"
        dominantBaseline="middle"
        textAnchor="start"
        fill={firstPartColor || "currentColor"}
        fontSize={fontSize}
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        {firstPart}
      </text>
      
      {/* Render second part */}
      <text
        x={secondPartX}
        y="50%"
        dominantBaseline="middle"
        textAnchor="start"
        fill={secondPartColor || "currentColor"}
        fontSize={fontSize}
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        {secondPart}
      </text>
    </svg>
  );
}