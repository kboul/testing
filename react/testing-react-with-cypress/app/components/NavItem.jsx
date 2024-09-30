import Link from "next/link";

export default function NavItem({ item }) {
  return (
    <Link data-testid={item.dataTestId} href={item.path}>
      {item.label}
    </Link>
  );
}
