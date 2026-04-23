import type { ComponentProps, Dispatch, SetStateAction } from "react";
import "./configurationinput.css";

const ConfigurationInput = ({
  value,
  onKeyUp,
  error,
}: {
  value: string;
  onKeyUp: Dispatch<SetStateAction<string>>;
  error: string;
}) => {
  return (
    <div className="configuration-layout">
      <label className="configuration-label">Electron configuration</label>
      <input
        className="configuration"
        type="text"
        placeholder="1s2"
        ref={(e) => e?.focus()}
        value={value}
        onChange={(e) => onKeyUp(e.target.value)}
      />
      <div
        style={{ display: error ? "block" : "none" }}
        className="configuration-error"
      >
        {error}
      </div>
    </div>
  );
};

export { ConfigurationInput };
