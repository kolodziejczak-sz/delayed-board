export default obj =>
  Object.assign({}, ...Object.entries(obj).map(([a, b]) => ({ [b]: a })));
