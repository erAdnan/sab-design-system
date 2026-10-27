const React = require("react");
const { View } = require("react-native");

function angleFromPoints(start, end) {
  const from = start || { x: 0.5, y: 0 };
  const to = end || { x: 0.5, y: 1 };
  const dx = (to.x ?? 0.5) - (from.x ?? 0.5);
  const dy = (to.y ?? 1) - (from.y ?? 0);
  return Math.atan2(dy, dx) * (180 / Math.PI) + 90;
}

function LinearGradient({
  colors = ["transparent", "transparent"],
  start,
  end,
  style,
  children,
  ...rest
}) {
  const stops = Array.isArray(colors) ? colors.join(", ") : String(colors);
  return React.createElement(
    View,
    {
      ...rest,
      style: [
        style,
        { backgroundImage: `linear-gradient(${angleFromPoints(start, end)}deg, ${stops})` },
      ],
    },
    children
  );
}

module.exports = LinearGradient;
module.exports.LinearGradient = LinearGradient;
module.exports.default = LinearGradient;
