function valueToPercent(value, min, max) {
  return (value - min) * 100 / (max - min);
}
export {
  valueToPercent as v
};
