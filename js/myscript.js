var particle = new Particle();
var devicesPr;
var devis = new Array;
var variblesName = ["analogvalue"];
var calls =["led"]; 
var callActions = ["on","off"];
var divIDs = new Array;
var devicesNum;
var myToken;
var getToken = ref.once("value").then(function(data){
  myToken = data.val();
});

var link = getToken.then(
	function(){
	devicesPr = particle.listDevices({auth: myToken});
	}	
);

var getData = link.then(
	function(){
		devicesPr.then(
			function(devices){
				devicesNum = devices.body.length;
				//console.log('Devices: ', devices);
				for(var i = 0; i< devicesNum; i++){
					var d = devices.body[i];
					devis.push(d);
				}
			},
			function(err){
				console.log('List Devices call failed: ', err);
			}	

		);
	}
);

//get all the devices info
getData.then(function(){
	devicesPr.then(function(){	
	// initialize info
	//console.log(devis[0]);
	//Initialized divs
	for(var i = 0; i < devis.length;i++){
		DivGenerator(i);
		$("#" + divIDs[i]).find(".name").html(devis[i].name); 
		onlinestage(devis[i].online,"#" + divIDs[i]);
		GetVar(i,0);
	}

	//listen to the connection...
	particle.getEventStream({ deviceId: devis[0].id, name: 'spark/status', auth: myToken }).then(function(stream) {
		stream.on('event', function(data) {
		 var online = false;
		 if(data.data == 'online'){
		  	online = true;
		 }
		 onlinestage(online,"#" + divIDs[0]);
		 });
	});

	});
})

function GetVar(id,varId){
	particle.getVariable({ deviceId: devis[id].id, name: variblesName[varId], auth: myToken }).then(function(data) {
	$("#" + divIDs[id]).find('.var1').html(data.body.result);
	$("#" + divIDs[id]).find('.var2').html(data.body.result);
	}, function(err) {
		  console.log('An error occurred while getting attrs:', err);
		  onlinestage(false,"#" + divIDs[id]);
	});
}


function callAction(id,callID,actionID){
	particle.callFunction({ deviceId: devis[id].id, name: calls[callID], argument: callActions[actionID], auth: myToken }).then(function(data){
		console.log('Function called succesfully:', data);
	},function(err){
		console.log('An error occurred:', err);
	});
}

function onlinestage(s,id){
	$(id).find(".online").html(" "+s+" ");
	if(s == true){
		//console.log("online");
		$(id).css('background', '#86e29b');
	}
	else{
		$(id).css('background', '#fc6585');
	}
}

var original = document.getElementById('devices');

function DivGenerator(num){
	var clone = original.cloneNode(true);
	clone.style.display = 'block';
	clone.id = "devices" + num; 
	divIDs.push(clone.id);
	original.parentNode.appendChild(clone);
}