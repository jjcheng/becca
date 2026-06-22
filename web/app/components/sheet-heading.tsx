import Divider from "./divider";

type SheetHeadingProps = {
  id: string;
  title: string;
};

export default function SheetHeading({ id, title }: SheetHeadingProps) {
  return (
    <section className="home-title-stack reveal" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      <Divider />
    </section>
  );
}
