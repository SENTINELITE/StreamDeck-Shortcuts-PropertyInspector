
//Someone with more knowledge of JS would be able to make this better. 😉
//Shoutout to GitHub CoPilot for the assitance!
const object1 = {"VideoTakeout": "All", "TestCut_Name": "StreamDeck", "Restart_StreamDeck": "All", "TestAlertDebug": "StreamDeck Shortcuts", "Make Stream Deck icons": "All", "Move Window": "All", "Make Stream Deck folder icon": "All", "JS Common Sort": "All", "iCloud Shortcut Inspector": "All", "DebugSD": "All", "Open Craft Recording Notes": "All", "Directions Home": "All", "Set Elgato Light With Put": "All", "Prepare Web Assets": "All", "Open URLs": "All", "ToggleNanoleafBulb": "StreamDeck Shortcuts", "StreamDeck SpeedTest": "All", "Resize Image to 256px": "All", "Compress Image by 50%": "All", "TestCut_New1": "StreamDeck", "New Shortcut 3": "All", "Open Twitch SE": "All", "New Shortcut 2": "All", "TestCut_New": "StreamDeck", "TestAlert": "StreamDeck", "New Shortcut 1": "All", "Open Space": "All", "Test Alert": "StreamDeck", "Test With Spaces": "All", "Save Text Files": "All", "ElgatoTest": "All", "Open Apple": "All", "iCloud Shortcut Inspector 1": "All", "TestsDelete": "TestDelete", "New Shortcut": "All", "Create Shortcut in Shortcuts": "All", "Open Apps Bundle": "StreamDeck Shortcuts"}

// for (const [key, value] of Object.entries(object1)) {
//   console.log('🚀 ❄️', `${key}: ${value}`);
// };

// console.log('🚀 ❄️ OBject 1', object1);
// console.log('');
// console.log('');
// console.log('');


let websocket = null,
	uuid = null,
	actionInfo = {};

listOfCuts = ['Placeholder', '2'];
shortcutsFolder = ['PlaceholderFolder'];
mappedDataFromBackend = { 'placeHolder': 'PlaceHolder2' };

listOfVoices = ['PlaceholderVoice', 'test']

isSayvoice = false;
isForcedTitle = false;
var globalSayVoice = "Alex";

var testGlobalVoice = "Siri assistant";

usersSelectedShortcut = "";
var loadedPI = false;

refType = "nil"

listOfShortcutsAndFolders = {} //ToDefine?

var shortcutFromBackend = "BackednAlert_Change";

var hasResent = false;

function connectElgatoStreamDeckSocket(inPort, inUUID, inRegisterEvent, inInfo, inActionInfo) {
	uuid = inUUID;

	actionInfo = JSON.parse(inActionInfo);
	websocket = new WebSocket('ws://localhost:' + inPort);

	websocket.onopen = function () {
		const json = {
			event: inRegisterEvent,
			uuid: inUUID
		};
		websocket.send(JSON.stringify(json));
		console.log("onopen : Payload: ", JSON.stringify(json));
		requestSettings('requestSettings');
	};

	websocket.onmessage = function (evt) { //From Backedn to PI!
		// Received message from Stream Deck
		const jsonObj = JSON.parse(evt.data);
		console.log("JSON DATA IMPORTANT READ!", jsonObj)
		hasResent = true; //This is required due to the Swift Websocket not loading fast enough. This prevent's requesting the settings numerous times.
		if (jsonObj.event === 'sendToPropertyInspector') {
			console.log("Payload recieved, we've sent to the PI!!!!!");
			const payload = jsonObj.payload;
			if (payload.error) {
				// printToConsole('Error: ' + payload.error);
				return;
			}

			console.log("Payload: ", payload);

			logSizeInBytes('payload recvd', payload);
			logSizeInKilobytes('payload recvd', payload);

			// const shortcutName = document.getElementById('shortcutName');
			// shortcutName.value = payload.shortcutName;
			usersSelectedShortcut = payload.shortcutName;

			shortcut_list = document.getElementById('shortcut_list');

			testGlobalVoice = payload.sayvoice;

			sayvoice = payload.sayvoice;
			globalSayVoice = sayvoice;

			// console.log('sayVoice Start: ', typeof sayvoice);
			console.log('sayVoice Start: ', sayvoice); //Name of Voice

			// listOfCuts = payload.shortcuts; //Get Array From SWift, Update ListOfCuts, then make the Dropdown list 
			// listOfCuts = JSON.parse(listOfCuts);

			shortcutsFolder = payload.shortcutsFolder;
			console.log("about to parse json!", shortcutsFolder);
			shortcutsFolder = JSON.parse(shortcutsFolder);
			console.log("Parsed")
			//ShortcutsFolder

			var _1 = {"VideoTakeout": "All", "TestCut_Name": "StreamDeck", "Restart_StreamDeck": "All", "TestAlertDebug": "StreamDeck Shortcuts", "Make Stream Deck icons": "All", "Move Window": "All", "Make Stream Deck folder icon": "All", "JS Common Sort": "All", "iCloud Shortcut Inspector": "All", "DebugSD": "All", "Open Craft Recording Notes": "All", "Directions Home": "All", "Set Elgato Light With Put": "All", "Prepare Web Assets": "All", "Open URLs": "All", "ToggleNanoleafBulb": "StreamDeck Shortcuts", "StreamDeck SpeedTest": "All", "Resize Image to 256px": "All", "Compress Image by 50%": "All", "TestCut_New1": "StreamDeck", "New Shortcut 3": "All", "Open Twitch SE": "All", "New Shortcut 2": "All", "TestCut_New": "StreamDeck", "TestAlert": "StreamDeck", "New Shortcut 1": "All", "Open Space": "All", "Test Alert": "StreamDeck", "Test With Spaces": "All", "Save Text Files": "All", "ElgatoTest": "All", "Open Apple": "All", "iCloud Shortcut Inspector 1": "All", "Test\'sDelete": "TestDelete", "New Shortcut": "All", "Create Shortcut in Shortcuts": "All", "Open Apps Bundle": "StreamDeck Shortcuts"};

			mappedDataFromBackend = payload.mappedDataFromBackend;
			mappedDataFromBackend = parseJSONSafely(mappedDataFromBackend);
			// mappedDataFromBackend = JSON.parse(mappedDataFromBackend);
			console.log("🚀 ❄️ mappedDataFromBackend: About To Read", mappedDataFromBackend);
			console.log("🚀 ❄️ About To Read", mappedDataFromBackend.length, typeof mappedDataFromBackend);
// 			console.log("🚀 ❄️ About to: READ", mappedDataFromBackend);
// 			var outNewTest = payload.mappedDataFromBackend.replace('[', '{').replace(']', '}'); //replace('[', '{').replace(']', '}');;
// 			console.log("🚀 ❄️ About to: READ", outNewTest);
// 			// outNewTest = outNewTest.replace(/\\/, "")
// 			// outNewTest = outNewTest.replace("'s", "\u0027")
// 			// outNewTest = JSON.parse(outNewTest);
// 			outNewTest = outNewTest.replace(/\'/g, "")
// 			// outNewTest = outNewTest.replace(//g, "")
// 			console.log("🚀 ❄️ outNewTest: ", outNewTest);


// 			// outNewTest = outNewTest.replace("'", "E001")
// 			outNewTest = outNewTest.replace(/'/g, "")

// 			//This line below will crash! We need to do a try catch, & print the error out if caught!
// 			outNewTest = parseJSONSafely(outNewTest);
// 			// outNewTest = JSON.parse(outNewTest);
// 			console.log("🚀 ❄️ outNewTest: ", outNewTest);
// 			// outNewTest = outNewTest.replace(/\\/, "\\\\")
// 			var index = 0;

// 			//Key = shortcut Name
// 			//Value = folder Name
// 			// outNewTest.replace("/\\/g", "_001Wevefoundit");
// 			for (const [key, value] of Object.entries(outNewTest)) {
// 				console.log('🚀 ❄️', `${key}: ${value}`);
// 				if (`${key.includes("'s'")}`) {
// 					console.log('🚀 ❄️ This is a web shortcut');
// 					var x =  `${key}`
// 					// delete outNewTest[x]; 
// 					x = x.replace("\\", "_TestIsHere")
// 					console.log('🚀 ❄️ 🚨 XL ', x);
// 				}
// 			  };
			  

// 			for (var key in outNewTest) {
// 				console.log("🚀 ❄️ outNewTest: key & index ", key, index);
// 				index ++;

// 				// if (key === "Test'sDelete") {
// 				// 	console.log("🚀 ❄️ outNewTest: key index ", outNewTest.indexOf(key))
// 				// }
// 			}
// 			console.log("🚀 ❄️ outNewTest: key index ", outNewTest[33])
// 			// outNewTest = outNewTest.replace("\'", "INSERTTHIS");
// 			// var parsedJson = JSON.parse(outNewTest, function (key, value) {
// 			// 	console.log("🚀 ❄️ key: ", key);
// 			// 	if(key === "All")
// 			// 		return "C";
			
// 			// 	if(key === 4)
// 			// 		return "D";
			
// 			// 	return value; 
// 			// });

// 			// console.log("🚀 ❄️ parsedJson: ", parsedJson);
// 			console.log("🚀 ❄️ parsedJson: Aboce");





// 			console.log("about to parse json MappedData!", mappedDataFromBackend);
// 			mappedDataFromBackend = mappedDataFromBackend.replace('[', '').replace(']', ''); //replace('[', '{').replace(']', '}');
// 			console.log("🚀 ❄️ about to parse json MappedData!", mappedDataFromBackend);
// 			console.log(typeof mappedDataFromBackend);

// 			var _data = {mappedDataFromBackend};
// 			// _data = _data.split(',');
// 			// _data = _data.slice(1,-1);
// 			console.log("🚀 ❄️ about to parse json _data!", _data);
// 			console.log("🚀 ❄️ about to parse json _data0!", _data.VideoTakeout);

// 			var objTest = {"name":"Jo\'hn", "age":"30\'", "city":"New York"};
// 			console.log(typeof objTest);

// 			var newMappedData = mappedDataFromBackend.split(',');
// 			console.log("🚀 ❄️ NewMappedData: ", newMappedData);
// 			console.log(newMappedData);
// 			console.log(typeof newMappedData);
// 			// let newMappedDataDic = newMappedData[0].slice(1,-1);
// 			console.log("🚀 ❄️ Test", newMappedData[0]);
// 			mappedDataFromBackend = newMappedData;
// 			console.log("🚀 ❄️ MappedData: ", mappedDataFromBackend);
// 			// console.log("TestTrimmed", newMappedDataDic);

// 			// mappedDataFromBackend = JSON.parse(mappedDataFromBackend);
// 			// regex uses look-forwards and look-behinds to select only single-quotes that should be selected
// // const regex = /('(?=(,\s*')))|('(?=:))|((?<=([:,]\s*))')|((?<={)')|('(?=}))/g;
// // str = mappedDataFromBackend.replace(regex, '"');
// // console.log("about to parse json MappedData!", str);
// // str = JSON.parse(str);
// // console.log(typeof str);
// // console.log(str);
// 			// var textTest = JSON.parse(mappedDataFromBackend);
// 			// console.log(typeof textTest);
// 			// console.log(textTest);
// 			console.log("Parsed")


			listOfVoices = JSON.parse(payload.voices);

			console.log("isSayvoice Pre: ", isSayvoice);
			isSayvoice = JSON.parse(payload.isSayvoice);
			console.log("isSayvoice: ", isSayvoice);
			console.log('SayVoice: ', typeof isSayvoice);

			console.log("Pre ForcedTitle: ", isForcedTitle);
			isForcedTitle = JSON.parse(payload.isForcedTitle);
			console.log("ForcedTitle: ", isForcedTitle);

			const sayvoice_holdtime = document.getElementById('sayvoice_holdtime');
			sayvoice_holdtime.value = payload.sayHoldTime; //Need to check if this is a valid number & set min/max

			const el = document.querySelector('.sdpi-wrapper');

			// if (isForcedTitle === false) {
			// 	setTimeout(() => {
			// 		requestSettings('requestSettings');
			// 		console.log('    🚨 ❄️ 🚨 ❄️ ALT X was False RE-requested=: ');
			// 	}, 1000);
			// }
			// else {
			// 	console.log('    🚨 ALT X true: ');
			// }

			// mappedDataFromBackend = outNewTest;

			filterMapped('All'); //Two way binding would be nice here...
			refreshListOfShortcutsFolders();
			refreshListOfShortcuts();
			refreshListOfVoices(sayvoice);
			// tooggleAccessibility();
			// toggleAccessNew();
			setToggleState();
			setForcedTitleState();
			fillSearchBarList();
			toggleMenu(); // For some reason the menu defaults to "nil"? It's not showing/"blocking", & it isn't hidden/"none"?

			if (usersSelectedShortcut.value == "undefined") {
				shortcutName.value = "";
				shortcut_list.value = "";
			}
			else {
				// shortcut_list.value = shortcutName.value;
			}

			// el && el.classList.remove('hidden');
		}

		console.log('THE EVENTS!, ', evt);
	};

}

function parseJSONSafely(str) {
	try {
	   return JSON.parse(str);
	}
	catch (error) {
	   console.log('This is the error: ', error);
		debugTextToPass = `⚠️ Error Code: 'Section-Six' \ JSON Failure! \nJSON: ${error}`, error;
		debugText(debugTextToPass, true)
	   // Return a default object, or null based on use case.
	   return {}
	}
 }

function requestSettings(requestType, passIntoPayload) {
	if (websocket) {
		let payload = {}; //Append to payload with our passIntoPayload value
		payload.type = requestType;
		const json = {
			"action": actionInfo['action'],
			"event": "sendToPlugin",
			"context": uuid,
			"payload": payload,
		};
		websocket.send(JSON.stringify(json));
		console.log("👻 requestSettings", json);
		// dealWithBug();
		dealWithBug();
	}
}

// function dealWithBug () {

// 						setTimeout(() => {
// 					requestSettings('requestSettings');
// 					console.log('    🚨 ❄️ 🚨 ❄️ ALT X was False RE-requested=: ');
// 				}, 1000);

// }

//Helper delay
const delay = ms => new Promise(res => setTimeout(res, ms));

var resentCount = 0;

//This function waits a second & if we haven't recieved the payload, then we re-request after a second
const dealWithBug = async () => {
	await delay(500);

	if (resentCount < 10) {
		resentCount ++;
		if(hasResent === false) {
			requestSettings('requestSettings');
			console.log("Swift WebSocket is still loading. We've re-requested the settings.");
		}
	}
	else {
		// const textArea = document.getElementById('mytextarea');//Shortcut nameofElement
		const PI_Shortcuts = document.getElementById('PI_Shortcuts');//Shortcut nameofElement
		// textArea.value = "⚠️ Error Code: 'Kilo-One' \ Please restart the StreamDeck Software.";
		console.log('10 requests have been sent. WebSocket is not responding. We will not be re-requesting.');
		PI_Shortcuts.style.display = "none";

		valToPass = "⚠️ Error Code: 'Kilo-One' \ Please restart the StreamDeck Software.";
		debugText(valToPass, true);
		//Change the status of something to X
	}
  };

  ///WERAWERAWEA REMOVE
//   dealWithBug();

function updateSettings() {
	if (websocket) {
		let payload = {};

		payload.type = "updateSettings";


		//🚨 ReWrite
		const shortcutName = document.getElementById('shortcut_list');//Shortcut Name
		payload.shortcutName = shortcutName.value;

		const forcedTitle = document.getElementById('forcedTitle');
		payload.isForcedTitle = isForcedTitle.toString();

		const sayvoice_holdtime = document.getElementById('sayvoice_holdtime');
		payload.sayHoldTime = sayvoice_holdtime.value; //Need to check if this is a valid number & set min/max
		if (sayvoice_holdtime.value == "") {
			payload.sayHoldTime = "0";
		}

		// console.log("Type: ", typeof sayvoice_holdtime);

		// const sayvoice = document.getElementById('sayvoice');
		// if (sayvoice.value === "undefined") {
		// 	payload.sayvoice = "Samantha";
		// }
		// payload.sayvoice = sayvoice.value;

		// // console.log('sayVoice: ', typeof sayvoice.value);
		// if(sayvoice.value) {
		// 	console.log('sayVoice IS TRUE: ', sayvoice.value);
		// }
		// else {
		// 	console.log('sayVoice IS FALSE: ', sayvoice.value, 'global: ', globalSayVoice);

		// }
		// if(globalSayVoice == false) {
		// 	payload.sayvoice = "Samantha";
		// }

		console.log("1234: before", testGlobalVoice);
		payload.sayvoice = testGlobalVoice;
		console.log("1234 after: ", testGlobalVoice);

		payload.isSayvoice = isSayvoice.toString();

		payload.refType = refType;
		console.log("refType: ", refType);

		//isVoiceOn?

		// const sayvoice = document.getElementById('sayvoice');
		// payload.sayvoice = sayvoice.value;

		console.log(payload);
		const json = {
			"action": actionInfo['action'],
			"event": "sendToPlugin",
			"context": uuid,
			"payload": payload,
		};
		websocket.send(JSON.stringify(json));
		console.log("updateSettings : Payload: ", JSON.stringify(json));
		logSizeInBytes('payload sent', json);
		logSizeInKilobytes('payload sent', json);
	}
}

function findFolder(shortcut) {

	if (listOfCuts.includes(shortcut)) {
		console.log('Found Shortcut!')
		//Change Folder/Shortcut group!
	}

}


// ❄️ --------------------------------------------------------------------------------------------------------------|
//  | Split Break																								|
//  ----------------------------------------------------------------------------------------------------------------|


// function changedShortcutInput() {

// 	const shortcutName = document.getElementById('shortcutName');//Shortcut Name

// 	const shortcutList = document.getElementById('shortcut_list');//shortcut_list's user-facing text. We want to change this to the value of the TextField, if it's valid.


// 	//Handle if the user has entered an invalid shortcut.
// 	if (listOfCuts.includes(shortcutName.value)) {
// 		shortcutList.value = shortcutName.value;
// 		console.log("🦑 shortcut Value X: : ", typeof (shortcut_list.value));

// 			//Set ref type & update the settings.
// 	refType = "textFieldRefs";
// 	updateSettings();
// 	}
// 	else {
// 		//TODO: We should change the color of the box to red, and show an error message. When the user clicks on the box, We should get rid of the "error" text, allowing them to conitnue were they left off.
// 		var nullError = "Not valid shortcut:  ";
// 		var cutNameX = shortcutName.value;
// 		shortcutName.value = nullError + cutNameX;
// 	}
// }


//We filter all of the shortcuts, based off of the selected folder input.
function filterMapped(filteredByFolder) {
	console.log("🚨filterMapped Starting, with folder", filteredByFolder);
	console.log(mappedDataFromBackend)

	listOfCuts.length = 0; //Reset the listOfCuts everytime we refilter.

	var sh_count = 0;

	if (filteredByFolder == 'All') {
	console.log('This is the result! ', mappedDataFromBackend[0])

		// for (const [key, value] of Object.entries(mappedDataFromBackend)) {
		// 	console.log("00001")
		// 	console.log(`${key}: ${value}`);
		//   }

		for (var key in mappedDataFromBackend) {
			sh_count++;
			// console.log("🚨filterMapped: All,  | Ket: ", key.key, " | Value: ", key.value);
			// console.log("🚨filterMapped: All,  | Ket: ", key, " | Value: ", mappedDataFromBackend[key]);
			listOfCuts.push(key);
		}
		console.log("🚨filterMapped: All, Total sh_count: ", sh_count);
		console.log("🚨filterMapped: All, Total shortcut Length: ", listOfCuts.length);
	}
	else {
		for (var key in mappedDataFromBackend) {
			// console.log(key + " <:> " + mappedDataFromBackend[key]);
			if (filteredByFolder == mappedDataFromBackend[key]) {
				sh_count++;
				listOfCuts.push(key);
			}
		}
		console.log("🚨filterMapped:  LOC", listOfCuts.length);
		if (sh_count === 0) {
			console.log("🚨filterMapped: No shortcuts in this folder ____eiuhauiehfiuaeuwui!", sh_count);
			//
		}
	}

	select = document.getElementById("shortcuts_folder_list");
	select.value = filteredByFolder;
	listOfCuts.sort(); //Reorganize shortcuts list, based on alphabetical order/
	console.log("🚨filterMapped Stopping");
	refreshListOfShortcuts();
	fillSearchBarList();
}

function refreshListOfShortcuts() {
	console.log("🚨refreshListOfShortcuts Starting");
	console.log("✈️❄️ Shortcuts array: ", listOfCuts);
	// select = document.getElementById("shortcut_list");
	listOfShortcuts = document.getElementById("shortcut_list");
	listOfFolders = document.getElementById("shortcuts_folder_list");

	console.log("   🦑 Before Name: ", listOfShortcuts.value);
	listOfShortcuts.length = 0;
	if (listOfShortcuts.length != listOfCuts.length) {

		for (var val of listOfCuts) {
			option = genOption(val);
			listOfShortcuts.appendChild(option);
		}
		// select.value = shortcutName;
		// select.value = listOfCuts[3];
		// let z = listOfCuts[0];
		// select.value = z;
		// console.log('🦑 xo', listOfCuts[0], 'z: ', z);
		// console.log('🦑 xo Value', listOfCuts[0].value);
		// console.log('🦑 ran the mainLoop', listOfShortcuts.value);

	}
	// updateSettings();
	//Check if folderList contains dropdown Shortuct
	//If it does, then change the text & refresh the dropdown.
	// testDebug = getElementById("shortcut_list");


	loopedCut = "";

	if (loadedPI === true) {
		if (listOfCuts.includes(shortcutFromBackend)) {
			listOfShortcuts.value = shortcutFromBackend;
			console.log("☀️ SUN 0 if | 🦑 shortcutFromBackend: ", shortcutFromBackend, "listOFCuts Selected: ", listOfShortcuts.value);
			console.log("☀️ SUN 0 if | 🦑 LOC: ", listOfCuts);
		}
		else {
			shortcutFromBackend = listOfCuts[0];
			listOfShortcuts.value = shortcutFromBackend;
			console.log("☀️ SUN 1 else | 🦑 shortcutFromBackend: ", shortcutFromBackend, "listOFCuts Selected: ", listOfShortcuts.value, "ListOFShortcuts", listOfShortcuts);
			console.log("☀️ SUN 1 else | 🦑 LOC: ", listOfCuts);
		}
	}
	console.log("⚡ Selected Value After loop Check ✅", listOfShortcuts.value);
	if (loadedPI === false) {
		// console.log("🐻 1", testDebug.value);
		console.log("   🦑 Mid Name: ", listOfShortcuts.value);
		if (listOfCuts.includes(usersSelectedShortcut)) {

			console.log("   🦑 1/7 Name: ", listOfShortcuts.value);
			//Set the dropdown's initial value to the user's saved Shortcut.
			listOfShortcuts.value = usersSelectedShortcut;
			console.log("   🦑 2/7 Name: ", listOfShortcuts.value);
			// console.log("🐻 2", testDebug.value);

			//filters through all keys, searching for the folder of said Shortcut.
			for (const key of Object.keys(mappedDataFromBackend)) {
				console.log("   🦑 3/7 Name: ", listOfShortcuts.value);

				//If the key matyches the Shortcut, then we've found it's folder!
				if (key == usersSelectedShortcut) { // compares selected shortcut to the array of keys
					console.log("   🦑 4/7 Name: ", listOfShortcuts.value);
					console.log("   SNOWMAN EMEG: ", key, mappedDataFromBackend[key]);

					//Set the folder's initial value to the folderName.
					listOfFolders.value = mappedDataFromBackend[key];
					console.log("   🦑 5/7 Name: ", listOfShortcuts.value, " | Folder: ", mappedDataFromBackend[key]);
					// console.log("🐻 3", testDebug.value);

					//Only run this code once, upon PI appearing.
					console.log("   🦑 6/7 Name: ", listOfShortcuts.value);
					loadedPI = true;
					filterMapped(mappedDataFromBackend[key]); //Filter dropdown list based on the folder of the user's last set Shortcut
					console.log("   🦑 8/7 Name: ", listOfShortcuts.value);
					// console.log("🐻 4", testDebug.value);

					//This allows us to avoid the folder getting stuck on "All". Not the best workaround, but it works. 😅
					setTimeout(() => {
						select = document.getElementById("shortcuts_folder_list");
						// listOfShortcuts.value = 2;
						select.value = mappedDataFromBackend[key];
						listOfShortcuts.value = key;
						shortcutFromBackend = key;
						console.log("   🦑 ❌ 10: ", mappedDataFromBackend[key]);
						console.log("   🦑 ❌ 11: ", key);
						console.log("   🦑 ❌ 12: ", select);
						console.log("World!");
					}, 100);


				}
			}
		}
	}
	console.log("🚨refreshListOfShortcuts Stopping");
	if (listOfShortcuts.length === 0) {
		// debugTextToPass = "⚠️ Error Code: 'Section-Six' \ This folder is empty!";
		// debugText(debugTextToPass, true)
	}
	else {
		debugText("", false);
	}
}

function debugText(errorText, showDebug) {
	const textArea2 = document.getElementById('mytextarea');
	const debugTextParent = document.getElementById('message_only');
	const PI_Shortcuts = document.getElementById('PI_Shortcuts');//Shortcut nameofElement

	if (showDebug === true) {
		PI_Shortcuts.style.display = "none";
		textArea2.style.display = "block";
		textArea2.value = errorText;
	}
	else {
		PI_Shortcuts.style.display = "block";
		textArea2.value = "";
		debugTextParent.style.display = "none";
	}

	console.log("🚨debugText", errorText);
	console.log("show", showDebug);
	console.log("🚨textArea2", textArea2);
}

function refreshListOfShortcutsFolders() {
	// debugText("", false);

	select = document.getElementById("shortcuts_folder_list");

	// preShortcut = select.value;

	console.log("PreSelect ", shortcutFromBackend);


	if (shortcutsFolder.length > 1) {
		console.log("___testAlert: ", shortcutsFolder.length);
	}
	else {
		folderID = document.getElementById("isFolder");
		folderID.style.display = "none";
		console.log("We should only have 1 id, aka All: ", shortcutsFolder.length);
	}

	//select.remove(select[0])

	//  console.log('L of folders: ', listOfCuts.length)

	if (select.length != shortcutsFolder.length) {
		select.length = 0;

		for (var val of shortcutsFolder) {
			option = genOption(val);
			select.appendChild(option);
		}
	}
	else {
		console.log("Already have options, no need to add more!")
	}
}

function refreshListOfVoices(sayvoice) {
	select = document.getElementById("sayvoice");

	console.log("🔈 Sayvoice: ", sayvoice);
	console.log("🔈 Sayvoice DropDn Value: ", select.value);

	if (select.length != listOfVoices.length) {
		select.length = 0;

		for (var val of listOfVoices) {
			option = genOption(val);
			select.appendChild(option);
		}
	}

	select.value = sayvoice;
	// if (sayvoice) {
	// 	select.value = sayvoice;
	// 	globalSayVoice = sayvoice;
	// 	console.log("🔈 Defined SayVoice: ", sayvoice);
	// }
	// else {
	// 	// globalSayVoice = 'Samantha';
	// 	select.value = globalSayVoice;
	// 	console.log("🔈 Undefined");
	// }

	console.log("🧿 UUID 1245366987: ", select);
}



function checkIfShortcutExists(shortcutToVerify) {
	for (const i of listOfCuts) {
		if (shortcutToVerify == i) {
			console.log('Shortcut founD!')
			//Change Folder/Shortcut group!
		}
		else {
			console.log('short not found')
			//Throw an error/Change title to error?
		}
	}
}

//shortcuts_folder_list

function selectedNewIndex(selected_id, selected_type) {
	console.log("selectedNewIndex", selected_id);
	if (selected_type == "shortcutFolder") {
		console.log("New Shortcut Folder Selected", shortcutsFolder[selected_id]);
		//Fetch the shortcuts under this folder, then fill the list of shortcuts!
		// requestSettings('shortcutsOfFolder');
		filterMapped(shortcutsFolder[selected_id]);
		//TODO: Send message about ref type 🟥
	}
	//🚨 ReWrite
	else if (selected_type == "shortcut") {
		//If We've selected a new Shortcut, hold onto the value until we update the settings? 
		//We must bind this to the label above as well!!!
		// const shortcutName = document.getElementById('shortcutName');
		// shortcutName.value = listOfCuts[selected_id];
		//TODO: Send message about ref type 🟥
		shortcutFromBackend = listOfCuts[selected_id];
		console.log("		🟥  🚨  🟥  🚨   🟥  🚨  SIGNAL!?");
		refType = "dropdownRefs";
		// updateSettings();

	}
	else if (selected_id === -1) {
	}
	else if (selected_type == "sayvoice") {
		saySelect = document.getElementById("sayvoice");
		console.log("XIOP", saySelect.value);
		// saySelect.value = "Siri";
		// saySelect.selectedIndex = 
		testGlobalVoice = saySelect.value;
		console.log("The voice is off!");
	}
	else {
		console.log("New X X Selected", selected_id);
		//TODO: Send message about ref type 🟥
	}
	updateSettings();
}

function openPage(site) {
	websocket && (websocket.readyState === 1) &&
		websocket.send(JSON.stringify({
			event: 'openUrl',
			payload: {
				url: 'https://' + site
			}
		}))
}

//   function tooggleAccessibility() {
// 	var x = document.getElementById("isAccessibility");
// 	if (x.style.display === "block" && isSayvoice == true) {
// 	  x.style.display = "none"; //on
// 	  isSayvoice = false;
// 	} else {
// 	  x.style.display = "block"; //off
// 	  isSayvoice = true;
// 	}
//   }

function toggleAccessNew() {
	var x = document.getElementById("isAccessibility");
	var buttonState = document.getElementById("save_the_settings");
	buttonState.textContent = 'newText'

	if (isSayvoice == false) {
		buttonState.textContent = 'Toggle Off'
		x.style.display = "block"; //off
		isSayvoice = true
	} else {
		buttonState.textContent = 'Toggle On'
		x.style.display = "none"; //off
		isSayvoice = false
	}

	//Change Access Bool & save settings!
	updateSettings();
	console.log("🔈 isSayvoice: Shouldb e updating voics ");

}

function setToggleState() {
	var x = document.getElementById("isAccessibility");
	var buttonState = document.getElementById("save_the_settings");

	if (isSayvoice == true) {
		buttonState.textContent = 'Toggle Off'
		x.style.display = "block"; //off
	} else {
		buttonState.textContent = 'Toggle On'
		x.style.display = "none"; //off
	}
}

function setForcedTitleState() {
	var x = document.getElementById("forced_title");
	console.log("setForcedTitleState", isForcedTitle)

	if (isForcedTitle == true) {
		x.textContent = 'Override Title: Toggle Off'
		console.log("state was 1", isForcedTitle)
	} else {
		x.textContent = 'Override Title: Toggle On'
		console.log("state was 2", isForcedTitle)
	}
}

function changeForcedTitle() {
	var x = document.getElementById("forced_title");

	console.log("Pre", isForcedTitle)

	if (isForcedTitle == true) {
		x.textContent = 'Override Title: Toggle On'
		isForcedTitle = false;
	} else {
		x.textContent = 'Override Title: Toggle Off'
		isForcedTitle = true;
	}

	console.log("Post", isForcedTitle)
	updateSettings();
}



/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
// function myFunction() {
// 	document.getElementById("myDropdown").classList.toggle("show");
//   }

//   function filterFunction() {
// 	var input, filter, ul, li, a, i;
// 	input = document.getElementById("myInput");
// 	filter = input.value.toUpperCase();
// 	div = document.getElementById("myDropdown");
// 	a = div.getElementsByTagName("a");
// 	for (i = 0; i < a.length; i++) {
// 	  txtValue = a[i].textContent || a[i].innerText;
// 	  if (txtValue.toUpperCase().indexOf(filter) > -1) {
// 		a[i].style.display = "";
// 	  } else {
// 		a[i].style.display = "none";
// 	  }
// 	}
//   }

//Toggle the custom search list view.
function toggleMenu() {
	searchMenu = document.getElementById("searchMenu")
	searchBar = document.getElementById("searchBar")

	if (searchMenu.style.display === "none") {
		searchMenu.style.display = "block";
		searchBar.focus();
		searchBar.value = "";
		// fillSearchBarList();
		fillCustomList();
	}
	else {
		searchMenu.style.display = "none";
	}

}

function filterSearchResults() {
	var input, filter, ul, li, option, i;
	input = document.getElementById("searchBar");
	filter = input.value.toUpperCase();
	div = document.getElementById("search_list_id");
	option = div.getElementsByTagName("option");
	for (i = 0; i < option.length; i++) {
		txtValue = option[i].textContent || option[i].innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			option[i].style.display = "";
		} else {
			option[i].style.display = "none";
		}
	}
}

function fillSearchBarList() {
	list = document.getElementById("search_list_id") //Fetch the list
	list.innerHTML = ''; //Clear the list

	//Refill the list with the new options
	for (var val of listOfCuts) {
		option = genOption(val)
		option.onclick = function () { testPrint(this.value) };
		list.appendChild(option);
	}
}

//Fill the customList full of the animals array.
function fillCustomList() {
	list = document.getElementById("myDropdown")
	// list.length = 0;

	for (var val of listOfCuts) {
		option = genOption(val)
		option.onclick = function () { testPrint(this.value) };
		try {
			list.appendChild(option);
		} catch (e) {
			//WARING: This is suppressing the errors, I believe. For whatever reason, this. is allowing the list to be filled...
			// list.appendChild(option);
		}
	}
}
// function fillSearchBarList() {
//     list = document.getElementById("search_list_id") //Fetch the list
//     list.innerHTML = ''; //Clear the list

//     //Refill the list with the new options
//     for (var val of listOfCuts) {
//         option = genOption(val)
//         option.onclick = function () { testPrint(this.value) };
//         list.appendChild(option);
//     }
// }



// ❄️ --------------------------------------------------------------------------------------------------------------|
//  | Helper Functions																								|
//  ----------------------------------------------------------------------------------------------------------------|


//Helper function to generate an option element.
function genOption(val) {
	val = val.replace(/"/g, "'")

	var option = document.createElement("option");
	option.value = val;
	option.text = val.charAt(0).toUpperCase() + val.slice(1);

	// option.onclick = function () { testPrint(this.value) };
	option.tagName
	return option
}

// Hides the dropdown menu when the user selects an option. Also prints the value of the selected option.
function testPrint(nameofElement) {
	console.log("test: ", nameofElement);
	// div = document.getElementById("myDropdown");
	// div.style.display = "none";

	// btn = document.getElementById("customButton");
	// btn.innerHTML = nameofElement;

	// shortcutName = document.getElementById("shortcutName");
	// shortcutName.value = nameofElement;

	// selectedInputName = shortcutName.value;

	// onchange="selectedNewIndex(this.selectedIndex, 'shortcut');">

	// const shortcutName = document.getElementById('shortcutName');
	// shortcutName.value = nameofElement;

	shortcut_list = document.getElementById('shortcut_list');
	shortcut_list.value = nameofElement;

	console.log("__Name_OF_ELEMETN:", nameofElement)
	refType = "searchRefs"

	updateSettings();

	toggleMenu();
}



// ❄️ --------------------------------------------------------------------------------------------------------------|
//  | Log payload in Kilobytes & Megabytes																								|
//  ----------------------------------------------------------------------------------------------------------------|




const getSizeInBytes = obj => {
	let str = null;
	if (typeof obj === 'string') {
		// If obj is a string, then use it
		str = obj;
	} else {
		// Else, make obj into a string
		str = JSON.stringify(obj);
	}
	// Get the length of the Uint8Array
	const bytes = new TextEncoder().encode(str).length;
	return bytes;
};

const logSizeInBytes = (description, obj) => {
	const bytes = getSizeInBytes(obj);
	console.log(`${description} is approximately ${bytes} B`);
};

const logSizeInKilobytes = (description, obj) => {
	const bytes = getSizeInBytes(obj);
	const kb = (bytes / 1000).toFixed(2);
	console.log(`${description} is approximately ${kb} kB`);
};