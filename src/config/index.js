import dev from "./dev.js";
import prod from "./prod.js";

let config;

if (process.env.NODE_EN === "production") {
  config = {
    ...prod,
  };
} else {
  config = {
    ...dev,
  };
}

export default config;
