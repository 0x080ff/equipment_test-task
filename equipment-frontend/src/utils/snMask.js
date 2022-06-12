export default str => {
  const mask = str
    .replace(/Z/g, '[@_-]')
    .replace(/N/g, '[0-9]')
    .replace(/A/g, '[A-Z]')
    .replace(/a/g, '[a-z]')
    .replace(/X/g, '[A-Z0-9]');
  return new RegExp(`^${mask}+$`);
};
