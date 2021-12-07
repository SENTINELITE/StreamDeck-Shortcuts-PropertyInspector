

//Someone with more knowledge of JS would be able to make this better. 😉


let websocket = null,
	uuid = null,
	actionInfo = {};

//listOfCuts = ['Test With Spaces', 'Restart_StreamDeck', 'Set Elgato Light With Put', 'Save Text Files', 'Open Craft Recording Notes', 'ElgatoTest', 'Move Window', 'Open Space', 'Prepare Web Assets', 'Open URLs', 'Open Apple', 'Open Twitch SE', 'New Shortcut 2', 'JS Common Sort', 'New Shortcut 1', 'New Shortcut', 'Directions Home', 'TestAlert', 'Test Alert', 'TestCut_New', 'TestCut_New1', 'TestCut_Name', 'TestAlertDebug', 'Open Apps Bundle', 'ToggleNanoleafBulb']

listOfCuts = ['Placeholder', '2'];
shortcutsFolder = ['PlaceholderFolder'];
mappedDataFromBackend = { 'placeHolder': 'PlaceHolder2' };

newFoldersData = ['z', 'x', 'y'];
newShortcutsData = ['z', 'x', 'y'];
// let listOfCuts = ["TestAlert", "Restart_StreamDeck", "TestCut_New"]
listOfVoices = ['PlaceholderVoice', 'test']

isSayvoice = false;
isForcedTitle = true;
globalSayVoice = "";

folderToPass = "";
usersSelectedShortcut = "";
loadedPI = false;

refType = "nil"

listOfShortcutsAndFolders = {} //ToDefine?

var newFolder_Folder = document.getElementById("newFolders");
var newList_List = document.getElementById("newList");

var tempShortcut = "";
var tempFolder = "";

var isLoaded = false;



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
		if (jsonObj.event === 'sendToPropertyInspector') {
			const payload = jsonObj.payload;
			console.log("Payload recieved, we've sent to the PI!!!!!, payload is: ", payload);
			if (payload.error) {
				return;
			}

			if (payload.type == 'filteredFolders') {

				console.log("🐝 started filteredFolders from Payload");
				console.log(" ⛄ filteredFolders: ", payload);

				listOfShortcuts_new = document.getElementById("shortcut_list");
				listOfFolders_new = document.getElementById("shortcuts_folder_list");

				listOfFolders_new.value = payload.listOfFolders;
				listOfShortcuts_new.value = payload.listOfShortcuts;

				// console.log("text to pitn: ", payload.listOfFolders);
				// var nameArr = payload.listOfFolders.replace('[', '').replace(']', '');
				// nameArr = nameArr.split(',');
				// console.log("text to pitn: ", nameArr);


				// xfa = payload.listOfShortcuts;
				newFoldersData = payload.listOfFolders;
				newFoldersData = JSON.parse(newFoldersData);

				newShortcutsData = payload.listOfShortcuts;
				newShortcutsData = JSON.parse(newShortcutsData);

				tempShortcut = payload.tempShortcut;
				tempFolder = payload.tempFolder;
				console.log("🐝 tempShortcut: ", tempShortcut, " tempFolder: ", tempFolder);


				if (isLoaded == false) {
					console.log("🐝 isLoaded == false");
					isLoaded = true;
					initParse(tempShortcut, tempFolder);


				}
				else {
					parseFolders(newFoldersData, folderToPass);
					parseShortcuts(newShortcutsData);
				}
				// console.log("🚨 xfa: ", JSON.parse(xfa));
				// console.log("🚨 xfa: ", payload.listOfShortcuts);


				// var option = document.createElement("option");
				// option.value = xfa;
				// option.text = xfa.charAt(0).toUpperCase() + xfa.slice(1);
				// newList.appendChild(option);


				// for (var val of nameArr) {
				// 	val = val.replace(/"/g, "'")
				// 	// console.log("The Bvalue: ", val)

				// 	var option = document.createElement("option");

				// 	option.value = val;
				// 	option.text = val.charAt(0).toUpperCase() + val.slice(1);
				// 	newList.appendChild(option);
				// }

				// newList.value = 'Open Apple';
			}
			else if (payload.type == 'shortcutsToPopulate') {

				newList = document.getElementById("newList");

				console.log(" ⛄ sentNewShortcuts: ", payload);
				newSplitTest = payload.shortcuts;
				newSplitTest = JSON.parse(newSplitTest);

				defaultSelection = payload.defaultSelection;
				console.log("🚀 🚀 🪨 defaultSelection: ", defaultSelection);
				parseShortcuts(newSplitTest);


				// newFolders.includes("")
				// console.log(array.indexOf('🍰')); // true
				let id = newFolders.indexOf(folderToPass);
				// console.log(fruits.includes("Mango"));

				newSelectedX(id, 'folder');

				//This kind of works for the first item
				// newList.value = defaultSelection;

			}
			else if (payload.type == 'folderRequestSent') {

			}
			else {

				// logSizeInBytes('payload recvd', payload);
				// logSizeInKilobytes('payload recvd', payload);

				// const shortcutName = document.getElementById('shortcutName');
				// shortcutName.value = payload.shortcutName;
				usersSelectedShortcut = payload.shortcutName;

				folderToPass = payload.folderToPass;

				shortcut_list = document.getElementById('shortcut_list');

				sayvoice = payload.sayvoice;
				globalSayVoice = sayvoice;

				// listOfCuts = payload.shortcuts; //Get Array From SWift, Update ListOfCuts, then make the Dropdown list 
				// listOfCuts = JSON.parse(listOfCuts);

				shortcutsFolder = payload.shortcutsFolder;
				shortcutsFolder = JSON.parse(shortcutsFolder);
				//ShortcutsFolder

				mappedDataFromBackend = payload.mappedDataFromBackend;
				mappedDataFromBackend = mappedDataFromBackend.replace('[', '{').replace(']', '}');
				mappedDataFromBackend = JSON.parse(mappedDataFromBackend);


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



				//Gets all folders & shortcuts | Rendundant.
				requestSettings('filterFolders');
				//🚨 This is being used after PI is opened. 
				// clickedDropDown(); 

				// newFoldersData = 0;
				// listOfFolders = ['All', 'StreamDeck', 'StreamDeck Shortcuts']; 
				// newSelectedX(2, 'folder');
				// newFoldersData = listOfFolders;



				if (usersSelectedShortcut.value == "undefined") {
					shortcutName.value = "";
					shortcut_list.value = "";
				}
				else {
					// shortcut_list.value = shortcutName.value;
				}

				// el && el.classList.remove('hidden');
			}
		}

		console.log('THE EVENTS!, ', evt);
	};

}

// function setInitalDebug() {

// }


// startingFolder = 'All';
// startingShortcut = '';

// animals = ['lion', 'wolf', 'parrot', 'snake', 'bear', 'whale', 'All', 'StreamDeck', 'StreamDeck Shortcuts'];
// places = ['NYK', 'AK', 'USA', 'China', 'Spce', 'Moon', 'Mars', 'Plutor', 'Ireland '];
// placesAlt = ['Spokane', 'MEad', 'Belelvue', 'Kirkland', 'Meadow', 'La Hoja', 'Hintington Beach', 'Nome', 'Anchorage'];

// function debugSortFolders() {
// 	customSelect = document.getElementById('myselect');
// 	//   console.log("🚨 customSelect: ", customSelect.selectedIndex);
// 	if (customSelect.length > 1) {
// 		customSelect.length = 0;
// 	}
// 	for (var val of animals) {
// 		val = val.replace(/"/g, "'")
// 		// console.log("The Bvalue: ", val)

// 		val.toUpperCase();
// 		var option = document.createElement("option");

// 		option.value = val;
// 		option.text = val.charAt(0).toUpperCase() + val.slice(1);
// 		customSelect.appendChild(option);

// 		console.log("    🚨 customSelect: ", customSelect.selectedIndex);
// 		console.log("    🚨 customSelect: ", customSelect);
// 	}

// }

// debugStuff()

// function debugStuff() {
// 	debugSortFolders();
// 	let id = animals.indexOf('All');
// 	customSelect.selectedIndex = [id]


// }


// // ShortcutName | ArrayOfCuts | ArrayOfFolders
// Send saved Shortcut & the array of other cuts from that folder, & the array of all folders... 
// Get Folder & Shortcut form Swift.
// Set folder to correct folder.  Set Shortcut to correct Shortcut.
//

function debugListOfShortcuts() {
	customSelect = document.getElementById('myselectAlt');
	//   console.log("🚨 customSelect: ", customSelect.selectedIndex);
	if (customSelect.length > 1) {
		customSelect.length = 0;
	}

	for (var val of places) {
		val = val.replace(/"/g, "'")
		// console.log("The Bvalue: ", val)

		val.toUpperCase();
		var option = document.createElement("option");

		option.value = val;
		option.text = val.charAt(0).toUpperCase() + val.slice(1);
		customSelect.appendChild(option);

		console.log("    🚨 customSelect: ", customSelect.selectedIndex);
		console.log("    🚨 customSelect: ", customSelect);
	}


}

function setInitialState() {
	//We need to find the shortucts folder, and then get the list of all shortcuts to populate the dropdown list...
}

function selectNewFolder() {
	newList = document.getElementById("newFolders");



}

//  🔷---------------------------------------------------- ----------------------------
//  | newSelectedX: When the users selects something from the PI, we fire this event. |
//  ----------------------------------------------------- -----------------------------

function newSelectedX(selected_id, selected_type) {

	console.log("🐝 started newSelectedX", selected_type);

	newList = document.getElementById("newList");

	console.log("selected_id: ", selected_id, '& selected_type: ', selected_type);
	if (selected_type == 'folder') {
		console.log("selected_id: ", selected_id, 'name of item', newFoldersData[selected_id]);
		console.log("Ask for shortcuts!!!!: ");
		requestSettings('sentNewFolder', newFoldersData[selected_id]); //send the new selected new folder to the backend
	}
	else if (selected_type == 'shortcut') {

		console.log("selected_id: ", selected_id, '💜 💜 💜 name of the new Shortcut', newShortcutsData[selected_id]);
		newList.value = newShortcutsData[selected_id];
		updateSettings()
	}

	else if (selected_type == 'initialLoad') {
		console.log("selected_id: ", selected_id, '💜 💜 💜 name of the new Voice', newVoicesData[selected_id]);
		requestSettings('requestFolder'); //send the new selected new folder to the backend

	}
}





function initParse(shortcut, folder) {
	newFolder_FolderAlt = document.getElementById("newFolders");
	newList_ListAlt = document.getElementById("newFolders");
	newFolder_FolderAlt.length = 0;
	var option = document.createElement("option");
	option.value = folder;
	option.text = folder.charAt(0).toUpperCase() + folder.slice(1);
	newFolder_FolderAlt.appendChild(option);

	newFolder_FolderAlt.selectedIndex = 0;

	newList_ListAlt.length = 0;
	var optionAlt = document.createElement("option");
	optionAlt.value = shortcut;
	optionAlt.text = shortcut.charAt(0).toUpperCase() + shortcut.slice(1);
	newList_ListAlt.appendChild(optionAlt);

}


//  🔷---------------------------------------------------- --------------------------------------------
//  | parseFolders: We get the initial folders upon opening the PI. We parse them, for user selection |
//  ----------------------------------------------------- ---------------------------------------------

function parseFolders(data, defaultFolder) {
	console.log("🐝 started parseFolders", data);
	newFolder_Folder = document.getElementById("newFolders");
	console.log("🚨 data: ", data);

	newFolder_Folder.length = 0;

	for (var val of data) {
		console.log("💋 🚀X: ", val)

		var option = document.createElement("option");
		option.value = val;
		option.text = val.charAt(0).toUpperCase() + val.slice(1);
		newFolder_Folder.appendChild(option);
	}
	console.log("🌐 X 🌐  X: ", newFolder_Folder);
	console.log("🌐 X 🌐  X: ", folderToPass, defaultFolder);
	newFolder_Folder.value = [1];

}

//  🔷---------------------------------------------------- ---------------------
//  | parseShortcuts: Parse the array of shortcuts we recieve from the backend |
//  ----------------------------------------------------- ----------------------

function parseShortcuts(data) {
	console.log("🐝 started parseShortcuts", data);
	newList_List = document.getElementById("newList");

	console.log('    🛑 🛑 🛑', newList_List);
	console.log("🚨 data: ", data);

	newList_List.length = 0;
	// newShortcutsData.length = 0;
	newShortcutsData = data;

	for (var val of data) {
		console.log("💋 🚀X: ", val)

		var option = document.createElement("option");
		option.value = val;
		option.text = val.charAt(0).toUpperCase() + val.slice(1);
		newList_List.appendChild(option);
	}

	//🌕 This could cause an issue. This is used to select the first element on selection of a new thing.
	newSelectedX(0, 'shortcut');

	// oldList = document.getElementById("shortcut_list");
	// oldList.value = newShortcutsData[selected_id];
	// updateSettings()

}

function requestSettings(requestType, passIntoPayload) {
	if (websocket) {
		let payload = {}; //Append to payload with our passIntoPayload value
		payload.type = requestType;
		payload.sentFolder = passIntoPayload
		const json = {
			"action": actionInfo['action'],
			"event": "sendToPlugin",
			"context": uuid,
			"payload": payload,
		};
		websocket.send(JSON.stringify(json));
		console.log("👻 requestSettings", json);
	}
}

function updateSettings() {
	if (websocket) {
		let payload = {};

		payload.type = "updateSettings";


		//🚨 ReWrite
		// const shortcutName = document.getElementById('shortcut_list');//Shortcut Name
		newList = document.getElementById("newList");
		payload.shortcutName = newList.value;

		const forcedTitle = document.getElementById('forcedTitle');
		payload.isForcedTitle = isForcedTitle.toString();

		const sayvoice_holdtime = document.getElementById('sayvoice_holdtime');
		payload.sayHoldTime = sayvoice_holdtime.value; //Need to check if this is a valid number & set min/max
		if (sayvoice_holdtime.value == "") {
			payload.sayHoldTime = "0";
		}
		console.log("Type: ", typeof sayvoice_holdtime);

		const sayvoice = document.getElementById('sayvoice');
		payload.sayvoice = sayvoice.value;

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
		// logSizeInBytes('payload sent', json);
		// logSizeInKilobytes('payload sent', json);
	}
}

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


function filterMapped(filteredByFolder) {

	listOfFolders = document.getElementById("shortcuts_folder_list");

	console.log("🚨filterMapped Starting");

	console.log("Filtering: 🚨 ⛄ 🚨 ⛄ 🚨 ⛄ : ", filteredByFolder);

	listOfCuts.length = 0; //Reset the listOfCuts everytime we refilter.

	console.log("⛄ Total Key from back: ", mappedDataFromBackend);

	if (filteredByFolder == 'All') {
		for (var key in mappedDataFromBackend) {
			listOfCuts.push(key);
			// console.log("🚨filterMapped With Key: ", key);
		}
	}
	else {
		console.log("❄️ Not All, :(): ", filteredByFolder);
		for (var key in mappedDataFromBackend) {
			// console.log(key + " <:> " + mappedDataFromBackend[key]);
			if (filteredByFolder == mappedDataFromBackend[key]) {
				listOfCuts.push(key);
			}
		}
	}
	listOfFolders.value = filteredByFolder;
	listOfCuts.sort(); //Reorganize shortcuts list, based on alphabetical order/
	console.log("🚨filterMapped Stopping");
	refreshListOfShortcuts();
	fillSearchBarList();
}

function refreshListOfShortcuts() {
	console.log("🚨refreshListOfShortcuts Starting");
	// select = document.getElementById("shortcut_list");
	listOfShortcuts = document.getElementById("shortcut_list");
	listOfFolders = document.getElementById("shortcuts_folder_list");

	console.log("💋 🚀 💋 🚀 💋 🚀listOfFolders: ", listOfFolders.value);

	if (listOfShortcuts.length != listOfCuts.length) {
		listOfShortcuts.length = 0;

		for (var val of listOfCuts) {
			val = val.replace(/"/g, "'")
			// console.log("The Bvalue: ", val)

			var option = document.createElement("option");

			option.value = val;
			option.text = val.charAt(0).toUpperCase() + val.slice(1);
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
	//Check if folderList contains dropdown Shortuct
	//If it does, then change the text & refresh the dropdown.
	if (loadedPI === false) {
		if (listOfCuts.includes(usersSelectedShortcut)) {

			//Set the dropdown's initial value to the user's saved Shortcut.
			listOfShortcuts.value = usersSelectedShortcut;

			//filters through all keys, searching for the folder of said Shortcut.
			for (const key of Object.keys(mappedDataFromBackend)) {

				//If the key matyches the Shortcut, then we've found it's folder!
				if (key == usersSelectedShortcut) { // compares selected shortcut to the array of keys

					//Set the folder's initial value to the folderName.
					listOfFolders.value = mappedDataFromBackend[key];

					console.log("🦑 Folder: ", mappedDataFromBackend[key]);

					//Only run this code once, upon PI appearing.
					loadedPI = true;
					filterMapped(mappedDataFromBackend[key]); //Filter dropdown list based on the folder of the user's last set Shortcut
				}
			}
		}
	}
	else {
		listOfShortcuts.value = listOfCuts[0];
	}
	console.log("🚨refreshListOfShortcuts Stoping");

	// 		//🚨 This is being used after PI is opened. 
	// clickedDropDown();
}

function clickedDropDown() {

	//We request the *new* settings. 
	// requestSettings('filterFolders');

}

function refreshListOfShortcutsFolders() {


	if (shortcutsFolder.length > 1) {
		console.log("___testAlert: ", shortcutsFolder.length);
	}
	else {
		folderID = document.getElementById("isFolder");
		folderID.style.display = "none";
		console.log("We should only have 1 id, aka All: ", shortcutsFolder.length);
	}

	select = document.getElementById("shortcuts_folder_list");
	//select.remove(select[0])

	//  console.log('L of folders: ', listOfCuts.length)

	if (select.length != shortcutsFolder.length) {
		select.length = 0;

		for (var val of shortcutsFolder) {
			val = val.replace(/"/g, "'")
			// console.log("The Bvalue: ", val)

			var option = document.createElement("option");

			option.value = val;
			option.text = val.charAt(0).toUpperCase() + val.slice(1);
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
			val = val.replace(/"/g, "'")
			// console.log("The Bvalue: ", val)

			var option = document.createElement("option");

			option.value = val;
			option.text = val.charAt(0).toUpperCase() + val.slice(1);
			select.appendChild(option);
		}
	}
	if (sayvoice) {
		select.value = sayvoice;
		console.log("🔈 Defined SayVoice: ", sayvoice);
	}
	else {
		select.value = globalSayVoice;
		console.log("🔈 Undefined");
	}
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
		refType = "dropdownRefs";

	}
	else if (selected_id === -1) {
		select1 = document.getElementById("sayvoice");
		select1.value = "Siri";
		console.log("The voice is off!");
	}
	else {
		console.log("New X X Selected", selected_id);
		//TODO: Send message about ref type 🟥
	}
}

function submittedTheNewValue() {
	console.log("👀 submittedTheNewValue");
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
}





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
		list.appendChild(option);
	}
}

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

	toggleMenu();
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