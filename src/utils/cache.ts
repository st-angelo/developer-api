import NodeCache from 'node-cache';
// Set the individual timeout for each key to 1h, after which they are deleted
const cache = new NodeCache({ stdTTL: 3600 });
export default cache;
