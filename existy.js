function existy(x) { return x != null; }

function truthy(x) { return (x !== false) && existy(x); }

module.exports.existy = existy;
module.exports.truthy = truthy;
