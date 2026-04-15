import "./legend.css";

const Key = ({
  colour,
  description,
}: {
  colour: string;
  description: string;
}) => {
  return <div className=""></div>;
};

const Legend = () => {
  return (
    <div className="legend">
      <div className="title">Shells</div>
      <div className="keys">
        <div className="key">
          <div className="level one" /> Level 1
        </div>
        <div className="key">
          <div className="level two" /> Level 2
        </div>
      </div>
    </div>
  );
};

export { Legend };
