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
      <div>
        <div className="title">Shell</div>
        <div className="keys">
          <div className="key">
            <div className="level one" /> Level 1
          </div>
          <div className="key">
            <div className="level two" /> Level 2
          </div>
        </div>
      </div>
      <div>
        <div className="title">Electron</div>
        <div className="keys">
          <div className="key">
            <div className="level invalid-p-electron" /> Invalid "p" electron
          </div>
          <div className="key">
            <div className="level invalid-s-electron" /> Invalid "s" electron
          </div>
        </div>
      </div>
    </div>
  );
};

export { Legend };
