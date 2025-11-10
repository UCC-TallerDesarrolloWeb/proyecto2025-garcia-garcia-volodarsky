import { Link } from "react-router-dom";

export default function Button({
  to,
  variant,
  className = "",
  children,
  ...rest
}) {
  const classes = ["btn"];
  if (variant) classes.push(variant);
  if (className) classes.push(className);
  const cn = classes.join(" ");

  if (to)
    return (
      <Link to={to} className={cn} {...rest}>
        {children}
      </Link>
    );

  return (
    <button className={cn} {...rest}>
      {children}
    </button>
  );
}
