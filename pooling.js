const oracledb = require('oracledb');
const DBconn = {
    RTD: {
        user: "RTD",
        password: "RTD",
        connectString: "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=192.168.85.140)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=RTD21PDB)))",
        poolMin: 5,
        poolMax: 5,
        poolIncrement: 0,
        poolTimeout: 30,
        poolAlias: "RTD",
        enableStatistics: true
      }
}
async function pooling() {
  // const pool=msConfig.Get_Pool_list();
  const pool = Object.keys(DBconn);
  // console.log("SIZE",Object.keys(DBconn).length);
  var size = pool.length;
  for (i = 0; i < size; i++) {
    dbname = pool[i];
    var2 = DBconn[dbname];
    try {
      await oracledb.createPool(var2);
      console.log("Pool created For " + JSON.stringify(var2));
      console.log("Pool created For " + var2);
    } catch (err) {
      console.log("Error in Pool creation " + err);
      console.log("Pool error" + err);
    }
  }
}
module.exports = {
    pooling,
}