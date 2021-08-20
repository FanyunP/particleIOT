var particle = new Particle();
var myToken = "19f82849bd32858017584d852203e55d730cdb59";
var devicesPr = particle.listDevices({auth: myToken });
var devis = new Array;
// var devicesStatus = new Array;
// var devicesNames = new Array;
// var deviceIDs = new Array;
// var functions = new Array;
// var varibles = new Array;
var devicesNum;

devicesPr.then(
	function(devices){
		devicesNum = devices.body.length;
		//console.log('Devices: ', devices);
		for(var i = 0; i< devicesNum; i++){
			var d = devices.body[i];
			devis.push(d);
			// var curName = devices.body[i].name;
			// var curStatus = devices.body[i].online;
			// var curID = devices.body[i].id;
			// var curfunc = devices.body[i].functions;
			// var curVar = devices.body[i].var
			// devicesNames.push(curName);
			// deviceIDs.push(curID);
			// devicesStatus.push(curStatus);
		}
	},
	function(err){
		console.log('List Devices call failed: ', err);
	}	

);

//get all the devices info
devicesPr.then(function(){	

	//console.log(devis[0].id);
	particle.getVariable({ deviceId: devis[0].id, name: "analogvalue", auth: myToken }).then(function(data) {
		  console.log('Device variable retrieved successfully:', data);
		  console.log('analogvalue:', data.body.result);
	}, function(err) {
		  console.log('An error occurred while getting attrs:', err);
	});

	//listen to the connection...
	particle.getEventStream({ deviceId: devis[0].id, name: 'spark/status', auth: myToken }).then(function(stream) {
	  stream.on('event', function(data) {
	    console.log("Event: ", data);
	  });
	});

});


