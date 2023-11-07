const oracledb = require('oracledb');
// const SoNCVet_DBConn = require('./SoNCVet_DBConn');
//oracledb.outFormat = oracledb.ARRAY;
// const Utils = require('../Utils/Utils.js');
// const msConfig = require('../Security/MSConfig');
oracledb.autoCommit = true;






module.exports =
{
    async createAlias(dbConn, theDBSql, theParams, theOptions) {
        let conn;
        let aRetVal = '';
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            conn = await oracledb.getPool(dbConn.user).getConnection();
            var result = await conn.execute(theDBSql, theParams, theOptions);
            aRetVal  =  result.outBinds.pRetVal;
            await aRetVal.close();
            aRetVal = { "status": "Success", "alias_id":aRetVal };
            
            console.log(aRetVal);

        }
        catch (err) {
            console.log('Ouch!', err);
            aRetVal = { "status": "Failed", "error": err };
        }
        finally {
            if (conn) {
                await conn.close();
            }
        console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
        // how many of those connections are held by the application    
        }
        
        return aRetVal;
    },
    async insertClient(dbConn, dbSQL, dataParams, options) {
        let conn;
        let aRetVal = '';
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            conn = await oracledb.getPool(dbConn.user).getConnection();
            var result = await conn.execute(dbSQL, dataParams, options);

            var aRLResult = result.outBinds.oClientID;
            await aRLResult.close();
            if (aRLResult == 'FALSE') {
                aRetVal = { "status": "Failed", "Error":aRLResult };
            }
            else {
                aRetVal = { "status": "Success", "client_id": aRLResult };
            }
            console.log(aRetVal);
        }
        catch (err) {
            console.log('Ouch!', err);
            aRetVal = { "status": "Failed", "error": err };
            this.LogMessage(aRetVal);

        }
        finally {
            if (conn) {
                await conn.close();
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
            console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
           
        }
        return aRetVal;
    },
    async insertTrip(dbConn, dbSQL, dataParams, options) {
        let conn;
        let aRetVal = '';
        var TripRefId = dataParams.p_S_LOCATION_ENT;
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            conn = await oracledb.getPool(dbConn.user).getConnection();
            const result = await conn.execute(dbSQL, dataParams, options);

            var aRLResult = result.outBinds.oTRIPID;
            await aRLResult.close();
            if (aRLResult == 'FALSE') {
                aRetVal = { "status": "Failed", "Error": result.outBinds.oTRIPID };
            }
            else {
                aRetVal = { "status": "Success", "id": TripRefId, "trip_id": result.outBinds.oTRIPID };
            }
            console.log(aRetVal); //"id": "pStKnLADmIEcvgJCfWzb",

        }
        catch (err) {
            console.log('Ouch!', err);
            aRetVal = { "status": "Failed", "error": err };
            this.LogMessage(aRetVal);
        }
        finally {
            if (conn) {
                await conn.close();
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
            console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
           
        }
        return aRetVal;
    },
    async CancelTrip(dbConn, dbSQL, dataParams, options) {
        let conn;
        let aRetVal = '';
        var TripId = dataParams.pTripId;
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            conn = await oracledb.getPool(dbConn.user).getConnection();
            const result = await conn.execute(dbSQL, dataParams, options);

            //var aRLResult = result.outBinds.oTRIPID;
            // if (aRLResult == 'FALSE') {
            //     aRetVal = { "status": "Failed", "Error": result.outBinds.oTRIPID };
            // }
            // else {
            //     aRetVal = { "status": "Success", "id": TripRefId, "trip_id": TripId };
            // }
            //aRetVal = { "status": "Success", "trip_id": TripId };
            aRetVal = 'OK';
            
            console.log(aRetVal); //"id": "pStKnLADmIEcvgJCfWzb",

        }
        catch (err) {
            console.log('Ouch!', err);
            aRetVal = { "status": "Failed", "error": err };
            this.LogMessage(aRetVal);
        }
        finally {
            if (conn) {
                await conn.close();
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
            console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
           
        }
        return aRetVal;
    },
    async addUpdateVehicle(dbConn, dbSQL, dataParams, options) {
        let conn;
        let aRetVal = '';
        let aVehId = dataParams.pVeh_Id;  //Hold For Response Because 'UPDATE' Comes from DB Proc

        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            conn = await oracledb.getPool(dbConn.user).getConnection();
            var result = await conn.execute(dbSQL, dataParams, options);

            var aRLResult = result.outBinds.oVehicleId;
            await aRLResult.close();
            if (aRLResult == 'FALSE') {
                aRetVal = { "status": "Failed", "Error": result.outBinds.oVehicleId };
            }
            else {
                //aRetVal = { "status": "Success", "vehile_id": result.outBinds.oVehicleId };
                aRetVal = { "status": "Success", "vehicle_id": aVehId };
            }
            console.log(aRetVal);

        }
        catch (err) {
            console.log('Ouch!', err);
            aRetVal = { "status": "Failed", "error": err };
            this.LogMessage(aRetVal);
        }
        finally {
            if (conn) {
                await conn.close();
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
            console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
           
        }
        return aRetVal;
    },
    async addUpdateDriver(dbConn, dbSQL, dataParams, options) {
        let conn;
        let aRetVal = '';
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            conn = await oracledb.getPool(dbConn.user).getConnection();
            var result = await conn.execute(dbSQL, dataParams, options);

            var aRLResult = result.outBinds.oDriverID;
            await aRLResult.close();
            if (aRLResult == 'FALSE') {
                aRetVal = { "status": "Failed", "Error": result.outBinds.oDriverID };
            }
            else {
                aRetVal = { "status": "Success", "driver_id": result.outBinds.oDriverID };
            }
            console.log(aRetVal);

        }
        catch (err) {
            console.log('Ouch!', err);
            aRetVal = { "status": "Failed", "error": err };
            this.LogMessage(aRetVal);
        }
        finally {
            if (conn) {
                await conn.close();
            }
        console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
        }
        return aRetVal;
    },
    async insertTrackingData(dbConn, dbSQL, dataParams, options) {
        let conn;
        let aRetVal = '';
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            conn = await oracledb.getPool(dbConn.user).getConnection();
            var result = await conn.execute(dbSQL, dataParams, options);

            aRetVal = { "status": "Success", "Count": result.rowsAffected };
            // await result.close();
            console.log(JSON.stringify(aRetVal));

        }
        catch (err) {
            console.log('Ouch!', err);
            aRetVal = { "status": "Failed", "error": err };
            this.LogMessage(aRetVal);
        }
        finally {
            if (conn) {
                await conn.close();
            }
        console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        return aRetVal;
    },
    async getOERFeatureValue(dbConn, dbSQL, options) {
        let conn;
        let aRetVal = '';
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            conn = await oracledb.getPool(dbConn.user).getConnection();
            var result = await conn.execute(dbSQL, {}, options);
           
            var jsonResult = JSON.stringify(result.rows);
            // await result.close();
            console.log(jsonResult);
            return jsonResult;
        }
        catch (err) {
            console.log('Ouch!', err);
            aRetVal = { "status": "Failed", "error": err };
            this.LogMessage(aRetVal);
        }
        finally {
            if (conn) {
                await conn.close();
            }
        console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        return aRetVal;
    },
    async getDistanceTimeFromOSRM(dbConn, dbSQL, options) {
        let conn;
        let aRetVal = '';
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            conn = await oracledb.getPool(dbConn.user).getConnection();
            var result = await conn.execute(dbSQL, {}, options);
            
            var jsonResult = JSON.stringify(result.rows);
            // await result.close();
            //console.log(jsonResult);
            return jsonResult;
        }
        catch (err) {
            console.log('Ouch!', err);
            aRetVal = { "status": "Failed", "error": err };
            this.LogMessage(aRetVal);
        }
        finally {
            if (conn) {
                await conn.close();
            }
        console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
            
        }
        return aRetVal;
    },
    async getClientDetails(dbConn, dbSQL, options) {
        let conn;
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            conn = await oracledb.getPool(dbConn.user).getConnection();
            const result = await conn.execute(dbSQL, {}, options);
            let aRCount = result.rows.length;
            // await result.close();
            if (aRCount > 0) {
                return JSON.stringify(result.rows[0]);;
            }
            else { return null; }
        }
        catch (err) {
            console.log('Ouch!', err);
            aRetVal = { "status": "Failed", "error": err };
            this.LogMessage(aRetVal);
        }
        finally {
            if (conn) {
                await conn.close();
                dbSQL = null;
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
            console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
               
        }
        return aRetVal;
    },
    async getDriverDetails(dbConn, dbSQL, options) {
        let conn;
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            conn = await oracledb.getPool(dbConn.user).getConnection();
            const result = await conn.execute(dbSQL, {}, options);
            let aRCount = result.rows.length;
            // await result.close();
            if (aRCount > 0) {
                return JSON.stringify(result.rows[0]);;
            }
            else { return null; }
        }
        catch (err) {
            console.log('Ouch!', err);
            aRetVal = { "status": "Failed", "error": err };
            this.LogMessage(aRetVal);
        }
        finally {
            if (conn) {
                await conn.close();
                dbSQL = null;
            }
        console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        return aRetVal;
    },
    async getTripDetails(dbConn, dbSQL, options) {
        let conn;
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            conn = await oracledb.getPool(dbConn.user).getConnection();
            const result = await conn.execute(dbSQL, {}, options);
            let aRCount = result.rows.length;
            // await result.close();
            if (aRCount > 0) {
                return JSON.stringify(result.rows[0]);;
            }
            else { return null; }
        }
        catch (err) {
            console.log('Ouch!', err);
            aRetVal = { "status": "Failed", "error": err };
            this.LogMessage(aRetVal);
        }
        finally {
            if (conn) {
                await conn.close();
                dbSQL = null;
            }
        console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        return aRetVal;
    },
    async getVehicleDetails(dbConn, dbSQL, options) {
        let conn;
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            conn = await oracledb.getPool(dbConn.user).getConnection();
            const result = await conn.execute(dbSQL, {}, options);
            let aRCount = result.rows.length;
            // await result.close();
            if (aRCount > 0) {
                return JSON.stringify(result.rows[0]);;
            }
            else { return null; }
        }
        catch (err) {
            console.log('Ouch!', err);
            aRetVal = { "status": "Failed", "error": err };
            this.LogMessage(aRetVal);
        }
        finally {
            if (conn) {
                await conn.close();
                dbSQL = null;
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        return aRetVal;
    },
    async getDetails(dbConn, dbSQL, options, QryName, RequestCId) {
        let conn;
        var aRes = {
            requestcacheid: "",
            source_name: "",
            record_count: 0,
            status: "OK",
            error: "",
            data: null
        }

        aRes.source_name = QryName;
        aRes.data = null;
        aRes.requestcacheid = RequestCId;


        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            conn = await oracledb.getPool(dbConn.user).getConnection();
            var result = await conn.execute(dbSQL, {}, options);
            const resultNew = result.rows;
            // await resultNew.close();
            //await result.close()
            if (resultNew === undefined) {
                aRes.data = result;
                aRes.error = "";
                aRes.record_count = result.rowsAffected;
            }
            else {
                aRes.data = resultNew;
                aRes.error = "";
                aRes.record_count = resultNew.length;
                //console.log(aRes);
            }
        }
        catch (err) {
            console.log('Ouch!', err);
            aRes.error = err.message;
            aRes.status = "NOK";
            this.LogMessage(aRes);
        }
        finally {
            if (conn) {
                await conn.close();
                dbSQL = null;
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        return aRes;
    },
    async getDetailsWithParameter(dbConn, dbSQL, dataParams, options, QryName) {
        let conn;
        var aRes = {
            requestcacheid: "",
            source_name: "",
            record_count: 0,
            status: "OK",
            error: "",
            data: null
        }
        aRes.source_name = QryName;

        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            conn = await oracledb.getPool(dbConn.user).getConnection();
            var result = await conn.execute(dbSQL, dataParams, options);
             
            aRes.data.push(result);
            aRes.error = "";
            await result.close();

            //console.log(aRes);         

        }
        catch (err) {
            console.log('Ouch!', err);
            aRes.error = err.message;
            aRes.status = "NOK";
            this.LogMessage(aRes);
        }
        finally {
            if (conn) {
                await conn.close();
                dbSQL = null;
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        return aRes;
    },
    async ProcedurecallOutType_ORS(dbConn, dbSQL, dataParams, options, QryName, numRows, RequestCId) {

        let connection;
        var aRes = {
            requestcacheid: "",
            source_name: "",
            record_count: 0,
            status: "OK",
            error: "",
            data: null
        }
        aRes.source_name = QryName;
        aRes.data = null;
        aRes.requestcacheid = RequestCId;

        oracledb.outFormat = oracledb.OBJECT;
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            connection = await oracledb.getPool(dbConn.user).getConnection();
            var result = await connection.execute(dbSQL, dataParams, options);
            if (result != null) {
                const ResultSet2 = result.outBinds.ORS;
                var Data = await ResultSet2.getRows(numRows);
                await ResultSet2.close();
                aRes.record_count = Data.length;
                aRes.data = Data;
                aRes.error = "";
            }
            // console.log(aRes);


        } catch (err) {
            console.log('Ouch!', err);
            aRes.error = err.message;
            aRes.status = "NOK";
            this.LogMessage(aRes);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                    this.LogMessage(err);
                }
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        return aRes;

    },

    async ProcedurecallOutType_oResult(dbConn, dbSQL, dataParams, options, QryName, numRows, RequestCId) {

        let connection;
        var aRes = {
            requestcacheid: "",
            source_name: "",
            record_count: 0,
            status: "OK",
            error: "",
            data: null
        }
        aRes.source_name = QryName;
        aRes.data = null;
        aRes.requestcacheid = RequestCId;

        oracledb.outFormat = oracledb.OBJECT;
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            connection = await oracledb.getPool(dbConn.user).getConnection();
            var result = await connection.execute(dbSQL, dataParams, options);
            if (result != null) {
                const ResultSet2 = result.outBinds.oResult;
                if (ResultSet2 === null) {
                    aRes.record_count = 0;
                }
                else {
                    aRes.record_count = 1;
                }
		// console.log("NO SHOW RECONFIRM", ResultSet2);
                if (ResultSet2 === "1" && (QryName === 'soreversesegmentcalculate' || QryName === 'soforwardsegmentcalculate' || QryName === 'forwardsegmentcalculate' || QryName === 'reversesegmentcalculate')) {


                    aRes.data = "Calculation Done!" + ResultSet2;
                    aRes.error = "";
                }
                else if (ResultSet2 === "0" && QryName === 'set_trips_disposition_scheduling') {
                   
                    // console.log("NO SHOW RECONFIRM inside resultset", ResultSet2,dataParams.pDisposition,dataParams.pTripReconfimStatus);
                    if (dataParams.pDisposition === 'T' && dataParams.pTripReconfimStatus === 'T') {
                        aRes.data = "Trip Confirmed and Unassigned!";
                        aRes.error = "";
                    }
                    else if (dataParams.pDisposition === 'T' && dataParams.pTripReconfimStatus === 'N') {
                                    aRes.data = "Trip Confirmed and Unperformed!";
                                    aRes.error = "";
                                }

                }
                else if (ResultSet2 === "1" && (QryName === 'set_trips_disposition_dts'||QryName === 'set_trips_disposition_scheduling')) {  
                    if (dataParams.pDisposition === 'T'&& dataParams.pTripReconfimStatus==='T') {
                        aRes.data = "Trip Confirmed and Unassigned!";
                        aRes.error = "";
                    }         
                    else if (dataParams.pDisposition === 'T') {
                        aRes.data = "Trip Confirmed!";
                        aRes.error = "";
                    }
                    else if (dataParams.pDisposition === 'C') {
                        aRes.data = "Trip Cancelled!";
                        aRes.error = "";
                    }
                    else if (dataParams.pDisposition === 'N') {
                        aRes.data = "Trip marked as NO Show!";
                        aRes.error = "";
                    }
                    else if (dataParams.pDisposition === 'A') {
                        aRes.data = "Trip marked as cancel on arrival!";
                        aRes.error = "";
                    }
                    else {
                        aRes.data = ResultSet2;
                        aRes.error = "";
                    }

                }
                else if (QryName === 'update_trip_dts' && ResultSet2 == '1') {
                    aRes.data = "Sucessfully Updated!";
                    aRes.error = "";
                }
                else if (QryName === 'set_rearrange_stop') {

                    if (ResultSet2 === "Not Allowed") {
                        aRes.data = [];
                        aRes.error = "The System cannot assign the selected trip(s) to the segment.";
                        aRes.status = "NOK";
                    }
                    else if (Number(ResultSet2) <= 0) {
                        aRes.data = [];
                        aRes.error = "Wrong Move or drop off should not be before pickup.";
                        aRes.status = "NOK";
                    }
                    else if (Number(ResultSet2) >= 1) {
                        aRes.data = "Rearranged Successfully!";
                        aRes.error = "";
                    }
                    else {
                        aRes.data = ResultSet2;
                        aRes.error = "";
                    }
                }
                else if (QryName === 'set_transfer_trips') {
                    aRes.data = ResultSet2;
                    aRes.error = "";
                    aRes.record_count = 1;
                }
                else if ((QryName === 'unassigntrips_dts' || QryName === 'unassigntrips_cal_dts') && (ResultSet2 === null || ResultSet2 == 'OK' || ResultSet2 === '1')) {
                    aRes.status = 'OK';
                    aRes.data = { "Result": "unassigned succesfully" };
                    aRes.error = "";

                }
                else if (QryName === 'driver_vehicle_breakdown_dts'){
                    
                    if(ResultSet2 === 'Updated'){
                    aRes.status= 'OK';
                    aRes.data = ResultSet2;
                    }
                    else{
                        aRes.status='NOK';
                        aRes.error = ResultSet2;
                        aRes.data = []
                    }
                }
                else {
                    aRes.status = 'OK';
                    aRes.data = { "Result": ResultSet2 };
                    aRes.error = "";
                }
            }
            //console.log( aRes);


        } catch (err) {
            console.log('Ouch!', err);
            aRes.error = err.message;
            aRes.status = "NOK";
            this.LogMessage(aRes);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                    this.LogMessage(err);
                }
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        return aRes;

    },


   /* async ProcedurecallOutType_oResult_Heartbeat (dbSQL,QryName,RequestCId){
        
      
        let connection;
       
        var aRes=
        {
            source_name: "getversion",
           
                count: "5",
                data: [
                    { name: "Disp360NS", status: "OK", version: "" },
                    {
                        name: "Redis",
                        status: "OK",
                        version: msConfig.Get_MS_Redis_Appversion()
                    },
                    {
                        name: "VendorNS",
                        status: "OK",
                        version: msConfig.Get_MS_Vendor_Appversion()
                    }, 
                    {
                        name: "TripMS",
                        status: "NOK",
                        version: msConfig.Get_MS_Trip_Appversion(),
                        NOKreason:""
                    }
                   
                ]
           
        }
        var Data = [];
        
        for(var key of Object.keys(SoNCVet_DBConn)){
            try {
                let dbConn=SoNCVet_DBConn[key];
                    
                connection = await oracledb.getPool(dbConn.user).getConnection();
                var result = await connection.execute(dbSQL);
                
                if (result != null) {
                    Data=result.rows[0]
                    
                    aRes.data[3].status="OK";
    
                }
                else {
                    aRes.data[3].status="NOK";

                    aRes.data[3].NOKreason="There was some issue for tenant: " + key;
                    break;
                }
              
    
            } catch (err) {
                console.log('Ouch!', err);
                aRes.data[3].status="NOK";
                this.LogMessage(aRes);
                aRes.data[3].reason="There was some issue for tenant: " + key;
                break;
            } finally {
                if (connection) {
                    try {
                        await connection.close();
    
    
                    } catch (err) {
                        console.error(err);
                        
                        this.LogMessage(err);
                    }
                }
            }

        }
       
        return aRes;

    }, */
    async ProcedurecallOutType_oRS(dbConn, dbSQL, dataParams, options, QryName, numRows, RequestCId) {

        let connection;
        var aRes = {
            requestcacheid: "",
            source_name: "",
            record_count: 0,
            status: "OK",
            error: "",
            data: null
        }
        var Data = [];
        aRes.source_name = QryName;
        aRes.data = null;
        aRes.requestcacheid = RequestCId;

        oracledb.outFormat = oracledb.OBJECT;
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            // console.log("checking ", dbConn.user)
            connection = await oracledb.getPool(dbConn.user).getConnection();
            var result = await connection.execute(dbSQL, dataParams, options);
            if (result != null) {
                const ResultSet2 = result.outBinds.oRS;
                Data = await ResultSet2.getRows(numRows);
                await ResultSet2.close();
                aRes.record_count = Data.length;
                aRes.data = Data;
                aRes.error = "";

            }
            else {
                aRes.data = [null];
                aRes.status = "NOK";
            }
            // console.log(aRes);

        } catch (err) {
            console.log('Ouch!', err);
            aRes.error = err.message;
            aRes.status = "NOK";
            this.LogMessage(aRes);
        } finally {
            if (connection) {
                try {
                    await connection.close();


                } catch (err) {
                    console.error(err);
                    this.LogMessage(err);
                }
        console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
            }
        }
        return aRes;

    },
    async ProcedurecallOutType_oFailed(dbConn, dbSQL, dataParams, options, QryName, numRows, RequestCId) {

        let connection;
        var aRes = {
            requestcacheid: "",
            source_name: "",
            record_count: 0,
            status: "OK",
            error: "",
            data: null
        }
        aRes.source_name = QryName;
        aRes.data = null;
        aRes.requestcacheid = RequestCId;

        oracledb.outFormat = oracledb.OBJECT;
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            connection = await oracledb.getPool(dbConn.user).getConnection();
            var result = await connection.execute(dbSQL, dataParams, options);
            if (result != null) {
                const ResultSet2 = result.outBinds.oFailed;
                aRes.data = ResultSet2;
                aRes.error = "";
                if (ResultSet2 === 'NOK') {
                    aRes.record_count = 0;
                    aRes.error = "Null Returning";
                }
                else {
                    aRes.record_count = 1;
                }
                // console.log(aRes);
            }

        } catch (err) {
            console.log('Ouch!', err);
            aRes.error = err.message;
            aRes.status = "NOK";
            this.LogMessage(aRes);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                    this.LogMessage(err);
                }
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        return aRes;

    },
    async ProcedurecallOutType_WithoutOutBind(dbConn, dbSQL, dataParams, options, QryName, numRows, RequestCId) {
        console.log("ProcedurecallOutType_WithoutOutBind() starts: " + dbSQL);
        let connection;
        var aRes = {
            requestcacheid: "",
            source_name: "",
            record_count: 0,
            status: "OK",
            error: "",
            data: null
        }
        aRes.source_name = QryName;
        aRes.data = null;
        aRes.requestcacheid = RequestCId;

        oracledb.outFormat = oracledb.OBJECT;
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            connection = await oracledb.getPool(dbConn.user).getConnection();
            var result = await connection.execute(dbSQL, dataParams, options);
            if (QryName === 'driver_vehicle_breakdown_dts') {
                aRes.data = "Sucessfully Update!";
                aRes.error = "";
            }else if(QryName === 'agent_schedule'){
                aRes.record_count = 0;
                aRes.data = "OK~LC Run";
                aRes.error = "";
            }
            else {
                aRes.record_count = 0;
                aRes.data = "OK";
                aRes.error = "";
            }
            console.log(aRes);
        } catch (err) {
            console.log('Ouch!', err);
            aRes.error = err.message;
            aRes.status = "NOK";
            this.LogMessage(aRes);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                    this.LogMessage(err);
                }
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        console.log("ProcedurecallOutType_WithoutOutBind() ends");
        return aRes;

    },
    LogMessage(msg) {
        //console.log(msg);
        var msLOG = ' [TRIP_MS] ' + JSON.stringify(msg);
        // Utils.writelog(msLOG);
        console.log(msLOG);
    },
    async ProcedurecallOutType_pOut(dbConn, dbSQL, dataParams, options, QryName, numRows, RequestCId) {

        let connection;
        var dbOptions = { fetchAsString: oracledb.CLOB }
        var aRes = {
            requestcacheid: "",
            source_name: "",
            record_count: 0,
            status: "OK",
            error: "",
            data: null
        }
        aRes.source_name = QryName;
        aRes.data = null;
        aRes.requestcacheid = RequestCId;
        // oracledb.outFormat = oracledb.DEFAULT;
        // oracledb.fetchAsString = [oracledb.CLOB]
        try {
            oracledb.fetchAsString = [oracledb.CLOB];
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            connection = await oracledb.getPool(dbConn.user).getConnection();
            var result = await connection.execute(dbSQL, dataParams, options);
            if (result != null) {
                
               
                var ResultSet = await result.outBinds.pOut
                if(ResultSet != null){
                ResultSet= await ResultSet.getData();
                console.log("replaydata",ResultSet)
                // aRes.data = JSON.parse(ResultSet);
                aRes.data =ResultSet? ResultSet.split("},").map((function(item,index){
                    try{
                           if(index!==ResultSet.split("},").length-1)
                           {
                               return JSON.parse(item+"}")
                           }
                           return JSON.parse(item);
                       } catch (err) 
                       {
                           console.log("This is not a json: ", item);
                           this.LogMessage("This is not a json: ", item);
                       }})):[];

            }
                else{
                    aRes.data = [];

                }
                // Data1 =  ResultSet;
                
               
            //    aRes.data = Data1;
                aRes.error = "";
                aRes.record_count = aRes.data.length;
            }
            else {
                aRes.data = null;
                aRes.status = "NOK";
                aRes.error = "Result is null";
            }
            console.log(aRes);

        } catch (err) {
            console.log('Ouch!', err);
            aRes.error = err.message;
            aRes.status = "NOK";
            this.LogMessage(aRes);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                    this.LogMessage(err);
                }
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        return aRes;

    },
    async ProcedurecallOutType_oRS_oR1(dbConn, dbSQL, dataParams, options, QryName, numRows, RequestCId) {

        let connection;
        var aRes = {
            requestcacheid: "",
            source_name: "",
            record_count: 0,
            status: "OK",
            error: "",
            data: null
        }
        var Data1 = [];
        var Data2 = [];
        aRes.source_name = QryName;
        aRes.data = null;
        aRes.requestcacheid = RequestCId;

        oracledb.outFormat = oracledb.OBJECT;
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            connection = await oracledb.getPool(dbConn.user).getConnection();
            var result = await connection.execute(dbSQL, dataParams, options);
			this.LogMessage('after executing oRS_oR1');
            if (result != null) {
                this.LogMessage('result != null');
                const ResultSet1 = result.outBinds.oRS;
                const ResultSet2 = result.outBinds.oRS1;
                Data1 = await ResultSet1.getRows(numRows);
                Data2 = await ResultSet2.getRows(numRows);
                await ResultSet1.close();
                await ResultSet2.close();
                aRes.record_count = [Data1.length, Data2.length];
                aRes.data = { Data1, Data2 };
                aRes.error = "";
                //console.log(aRes);
            }
            else {
                this.LogMessage('result == null');
                aRes.data = [null];
                aRes.status = "NOK";
            }

        } catch (err) {
            console.log('Ouch!', err);
            aRes.error = err.message;
            aRes.status = "NOK";
            this.LogMessage(aRes);
        } finally {
            if (connection) {
                try {
                    await connection.close();


                } catch (err) {
                    console.error(err);
                    this.LogMessage(err);
                }
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        return aRes;

    },
	async ProcedurecallOutType_oRS1_oRS2(dbConn, dbSQL, dataParams, options, QryName, numRows, RequestCId) {

        let connection;
        var aRes = {
            requestcacheid: "",
            source_name: "",
            record_count: 0,
            status: "OK",
            error: "",
            data: null
        }
        var Data1 = [];
        var Data2 = [];
        aRes.source_name = QryName;
        aRes.data = null;
        aRes.requestcacheid = RequestCId;

        oracledb.outFormat = oracledb.OBJECT;
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application


            connection = await oracledb.getPool(dbConn.user).getConnection();
            var result = await connection.execute(dbSQL, dataParams, options);
            if (result != null) {
                const ResultSet1 = result.outBinds.oRS1;
                const ResultSet2 = result.outBinds.oRS2;
                Data1 = await ResultSet1.getRows(numRows);
                Data2 = await ResultSet2.getRows(numRows);
                await ResultSet1.close();
                await ResultSet2.close();
                aRes.record_count = [Data1.length, Data2.length];
                aRes.data = { Data1, Data2 };
                aRes.error = "";
                //console.log(aRes);
            }
            else {
                aRes.data = [null];
                aRes.status = "NOK";
            }

        } catch (err) {
            console.log('Ouch!', err);
            aRes.error = err.message;
            aRes.status = "NOK";
            this.LogMessage(aRes);
        } finally {
            if (connection) {
                try {
                    await connection.close();


                } catch (err) {
                    console.error(err);
                    this.LogMessage(err);
                }
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        return aRes;

    },
    async ProcedurecallOutType_oRS_oR9(dbConn, dbSQL, dataParams, options, QryName, numRows, RequestCId) {

        let connection;
        var aRes = {
            requestcacheid: "",
            source_name: "",
            record_count: 0,
            status: "OK",
            error: "",
            data: null
        }
        var Data1 = [];
        var Data2 = [];
        var Data3 = [];
        var Data4 = [];
        var Data5 = [];
        var Data6 = [];
        var Data7 = [];
        var Data8 = [];
        var Data9 = [];
        var Data10 = [];
        aRes.source_name = QryName;
        aRes.data = null;
        aRes.requestcacheid = RequestCId;

        oracledb.outFormat = oracledb.OBJECT;
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            connection = await oracledb.getPool(dbConn.user).getConnection();
            var result = await connection.execute(dbSQL, dataParams, options);
			// this.LogMessage('after executing oRS_oR1');
            if (result != null) {
                this.LogMessage('result != null');
                const ResultSet1 = result.outBinds.oRS;
                const ResultSet2 = result.outBinds.oRS1;
                const ResultSet3 = result.outBinds.oRS2;
                const ResultSet4 = result.outBinds.oRS3;
                const ResultSet5 = result.outBinds.oRS4;
                const ResultSet6 = result.outBinds.oRS5;
                const ResultSet7 = result.outBinds.oRS6;
                const ResultSet8 = result.outBinds.oRS7;
                const ResultSet9 = result.outBinds.oRS8;
                const ResultSet10 = result.outBinds.oRS9;
                Data1 = await ResultSet1.getRows(numRows);
                Data2 = await ResultSet2.getRows(numRows);
                Data3 = await ResultSet3.getRows(numRows);
                Data4 = await ResultSet4.getRows(numRows);
                Data5 = await ResultSet5.getRows(numRows);
                Data6 = await ResultSet6.getRows(numRows);
                Data7 = await ResultSet7.getRows(numRows);
                Data8 = await ResultSet8.getRows(numRows);
                Data9 = await ResultSet9.getRows(numRows);
                Data10 = await ResultSet10.getRows(numRows);
                await ResultSet1.close();
                await ResultSet2.close();
                await ResultSet3.close();
                await ResultSet4.close();
                await ResultSet5.close();
                await ResultSet6.close();
                await ResultSet7.close();
                await ResultSet8.close();
                await ResultSet9.close();
                await ResultSet10.close();
                aRes.record_count = [Data1.length,Data2.length,Data3.length,Data4.length,Data5.lengtht,Data6.length,Data7.length,Data8.length,Data9.length,Data10.length]; //backward compatible for validate login
                aRes.data =  {Data1,Data2,Data3,Data4,Data5,Data6,Data7,Data8,Data9,Data10};
                // aRes.data2 = {Data2,Data3};
                aRes.error = "";
                //console.log(aRes);
            }
            else {
                this.LogMessage('result == null');
                aRes.data = [null];
                aRes.status = "NOK";
            }

        } catch (err) {
            console.log('Ouch!', err);
            aRes.error = err.message;
            aRes.status = "NOK";
            this.LogMessage(aRes);
        } finally {
            if (connection) {
                try {
                    await connection.close();


                } catch (err) {
                    console.error(err);
                    this.LogMessage(err);
                }
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        return aRes;

    },
    async ProcedurecallOutType_oResult_CURSOR(dbConn, dbSQL, dataParams, options, QryName, numRows, RequestCId) {

        let connection;
        var aRes = {
            requestcacheid: "",
            source_name: "",
            record_count: 0,
            status: "OK",
            error: "",
            data: null
        }
        var Data = [];
        aRes.source_name = QryName;
        aRes.data = null;
        aRes.requestcacheid = RequestCId;

        oracledb.outFormat = oracledb.OBJECT;
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            connection = await oracledb.getPool(dbConn.user).getConnection();
            var result = await connection.execute(dbSQL, dataParams, options);
	    console.log("alex"+JSON.stringify(result));
            if (result != null) {
                const ResultSet2 = result.outBinds.oResult;
                Data = await ResultSet2.getRows(numRows);
                await ResultSet2.close();
                aRes.record_count = Data.length;
                aRes.data = Data;
                aRes.error = "";

            }
            else {
                aRes.data = [null];
                aRes.status = "NOK";
            }
	console.log("alex2"+ JSON.stringify(result.outBinds.oResult));
            console.log("alex3"+ JSON.stringify(aRes));

        } catch (err) {
            console.log('Ouch!', err);
            aRes.error = err.message;
            aRes.status = "NOK";
            this.LogMessage(aRes);
        } finally {
            if (connection) {
                try {
                    await connection.close();


                } catch (err) {
                    console.error(err);
                    this.LogMessage(err);
                }
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        return aRes;

    },
    async getAliasDetails(dbConn, dbSQL, dataParams, options) {
        let conn;
        var aRes = {};
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            conn = await oracledb.getPool(dbConn.user).getConnection();
            var result = await conn.execute(dbSQL, dataParams, options);

            if (result != null) {
                const ResultSet = result.outBinds.oRS;
                var Data = await ResultSet.getRows(100);
                await ResultSet.close();
            }
            if (Data === undefined) {
                return { data: null }
            }
            else {
                return aRes = Data;
            }
        }
        catch (err) {
            console.log('Ouch!', err);
            aRes = { "error": err };
            this.LogMessage(aRes);
        }
        finally {
            if (conn) {
                await conn.close();
                dbSQL = null;
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        return aRes;
    },
    async getClientDetail(dbConn, dbSQL, dataParams, options) {
        let conn;
        var aRes = {};
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            conn = await oracledb.getPool(dbConn.user).getConnection();
            var result = await conn.execute(dbSQL, dataParams, options);

            if (result != null) {
                const ResultSet = result.outBinds.oRS;
                var Data = await ResultSet.getRows(100);
                await ResultSet.close();
            }
            if (Data === undefined) {
                return { data: null }
            }
            else {
                return aRes = Data;
            }
        }
        catch (err) {
            console.log('Ouch!', err);
            aRes = { "error": err };
            this.LogMessage(aRes);
        }
        finally {
            if (conn) {
                await conn.close();
                dbSQL = null;
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        return aRes;
    },
    async getTripDetails(dbConn, dbSQL, dataParams, options) {
        let conn;
        var aRes = {};
        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            conn = await oracledb.getPool(dbConn.user).getConnection();
            var result = await conn.execute(dbSQL, dataParams, options);

            if (result != null) {
                const ResultSet = result.outBinds.oRS;
                var Data = await ResultSet.getRows(100);
                await ResultSet.close();
            }
            if (Data === undefined) {
                return { data: null }
            }
            else {
                return aRes = Data;
            }
        }
        catch (err) {
            console.log('Ouch!', err);
            aRes = { "error": err };
            this.LogMessage(aRes);
        }
        finally {
            if (conn) {
                await conn.close();
                dbSQL = null;
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        return aRes;
    },
    async UpdateSqrlSyncDetails(dbConn, dbSQL,dataParams, options) {
        let conn;

        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            conn = await oracledb.getPool(dbConn.user).getConnection();
            var result = await conn.execute(dbSQL, dataParams, options);
            let resultNew = result.outBinds.oResult;
            if (resultNew == 'ok') {
                return { "status": "OK Details Updated!"};
            }
            return { "status": "NOK"};
        }
        catch (err) {
            console.log('Ouch!', err);
            aRes.error = err.message;
            aRes.status = "NOK";
            this.LogMessage(aRes);
        }
        finally {
            if (conn) {
                await conn.close();
                dbSQL = null;
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        return aRes;
    },
    async UpdateNewTripId(dbConn, dbSQL,dataParams, options) {
        let conn;

        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            conn = await oracledb.getPool(dbConn.user).getConnection();
            var result = await conn.execute(dbSQL, dataParams, options);
            let resultNew = result.outBinds.oResult;
            if (resultNew == 'ok') {
                return { "status": "OK Details Updated!" };
            }
            return { "status": "NOK" };
        }
        catch (err) {
            console.log('Ouch!', err);
            aRes.error = err.message;
            aRes.status = "NOK";
            this.LogMessage(aRes);
        }
        finally {
            if (conn) {
                await conn.close();
                dbSQL = null;
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        return aRes;
    },
    async  getAllPolylines(dbConn, dbSQL,QryName,RequestCId,options){
        
        var aRes = {
            requestcacheid: RequestCId,
            source_name: QryName,
            record_count: 0,
            status: "OK",
            error: "",
            data: []
        }
        var aConnection = {};
        pool = await oracledb.getPool(dbConn.user);
        console.log("oRS connectionsOpen", pool.connectionsOpen);
        console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

        var aConnection = await oracledb.getPool(dbConn.user).getConnection();
        //var result = await conn.execute(dbSQL, dataParams, options);
      //  var aConnection = await initConnection(theOldbConnection);
        if (aConnection != null && !isEmptyObj(aConnection)) {
            var aQuery = dbSQL;
            try {
                oracledb.fetchAsString = [oracledb.CLOB];
                var aDataRows = await aConnection.execute(aQuery,{},options);
                
                // console.log("aDataRows",aDataRows)
                aRes.data = formatResult(aDataRows);
                 aRes.data = JSON.parse(JSON.stringify(aRes.data));
                //  console.log("aRes.data",aRes.data)
               // aRes.result = JSON.parse(JSON.stringify(aDataRows));
                aRes.status = "OK";
               // aRes.note = "OK";
               aRes.record_count = aRes.data.length;
            } catch (e) {
                aRes.status = "NOK";
               // aRes.note = e.toString();
                aRes.error = e.toString();
                aRes.data= [];
                //writeSvrLog("getAllPolylines connection.execute exception: " + e);
               // writeSvrLog("getAllPolylines connection.execute aQuery: " + aQuery);
            }
        } else {
            aRes.error = "getAllPolylines oracledb.getConnection is null or empty object";
           // writeSvrLog("getAllPolylines oracledb.getConnection is null or empty object");
        }
        if (aConnection != null && !isEmptyObj(aConnection)) {
            try {
                aConnection.close();
            } catch (e) { }
        }
        console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        return aRes;
    },
    async UpdateDispositionToCancel(dbConn, dbSQL,dataParams, options) {
        let conn;

        try {
            pool = await oracledb.getPool(dbConn.user);
            console.log("oRS connectionsOpen", pool.connectionsOpen);
            console.log("oRS connectionsInUse", pool.connectionsInUse);  // how many of those connections are held by the application

            conn = await oracledb.getPool(dbConn.user).getConnection();
            var result = await conn.execute(dbSQL, dataParams, options);
            let resultNew = result.outBinds.oResult;
            if (resultNew == 'ok') {
                return { "status": "OK Trip cancelled!" };
            }
            return { "status": "NOK" };
        }
        catch (err) {
            console.log('Ouch!', err);
            aRes.error = err.message;
            aRes.status = "NOK";
            this.LogMessage(aRes);
        }
        finally {
            if (conn) {
                await conn.close();
                dbSQL = null;
            }
            console.log("After Connection close oRS connectionsOpen", pool.connectionsOpen);
        console.log("After Connection close oRS connectionsInUse", pool.connectionsInUse); 
       
        }
        return aRes;
    }
};
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function formatResult(theDataRows) {
    var aRes = [];
    for (var i = 0; i < theDataRows.rows.length; i++) {
        aRes.push({
            idx: i,
            // segment_id: getString(theDataRows.rows[i][theDataRows.metaData.findIndex(m => m.name === "RES_NUM")]),
            // polyline_latlng: JSON.parse(theDataRows.rows[i][theDataRows.metaData.findIndex(m => m.name === "POLYLINE_JSON_DATA")] ),
            // polyline_style: JSON.parse(theDataRows.rows[i][theDataRows.metaData.findIndex(m => m.name === "POLYLINE_JSON_STYLE")] )
            segment_id: getString(theDataRows.rows[i].RES_NUM),
            polyline_latlng: JSON.parse(theDataRows.rows[i].POLYLINE_JSON_DATA ),
            polyline_style: JSON.parse(theDataRows.rows[i].POLYLINE_JSON_STYLE )
        });
    }
    // console.log(aRes)
    return aRes;
}
function getString(theData) {
    return (theData != null && typeof theData != "undefined" && theData.toString() != null && theData.toString().length != 0) ? theData.toString().replace("\r", "").replace("\n", " ").replace("  ", " ").trim() : "";
}

function isEmptyObj(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
}