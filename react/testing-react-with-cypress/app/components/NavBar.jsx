import NavItem from "./NavItem";

const navItems = [
  {
    label: "Why Cypress?",
    path: "/",
    dataTestId: "nav-why-cypress"
  },
  {
    label: "Overview",
    path: "/overview",
    dataTestId: "nav-overview"
  },
  {
    label: "Fundamentals",
    path: "/fundamentals",
    dataTestId: "nav-fundamentals"
  },
  {
    label: "Forms",
    path: "/forms",
    dataTestId: "nav-forms"
  },
  {
    label: "Examples",
    path: "/examples",
    dataTestId: "nav-examples"
  },
  {
    label: "Component",
    path: "/component",
    dataTestId: "nav-component"
  },
  {
    label: "Best Practices",
    path: "/best-practices",
    dataTestId: "nav-best-practices"
  }
];

export default function NavBar() {
  return (
    <ul className="nav-bar">
      {navItems.map((item) => (
        <NavItem key={item.label} item={item} />
      ))}
    </ul>
  );
}
