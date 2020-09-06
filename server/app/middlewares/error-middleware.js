const { DB_ERR_MAP, NODE_ERR_MAP } = require("../constants");

module.exports = (err, _, res, __) => {
  const code =
    err.statusCode ||
    (DB_ERR_MAP[err.code] && DB_ERR_MAP[err.code].code) ||
    (NODE_ERR_MAP[err.code] && NODE_ERR_MAP[err.code].code);

  let msg =
    (DB_ERR_MAP[err.code] && DB_ERR_MAP[err.code].msg) ||
    (NODE_ERR_MAP[err.code] && NODE_ERR_MAP[err.code].msg);

  if (msg) {
    msg += ` (${err.toString()})`;
  } else {
    msg = err.displayMsg || err.toString();
  }

  if(err.detail) {
    msg += " - " + err.detail;
  }

  res.errorMsg = msg;
  res.status(code || 500).json({ errors: [{ msg }] });

  console.log({ msg, err });
};
