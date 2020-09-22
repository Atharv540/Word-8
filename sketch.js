            var showSourceCode = false;
			var isInEditMode = true;
			var splitText, myText, content, voicesDropdown;
			var speech = new p5.Speech("Microsoft David - English (United States)");
			var selectedText = window.getSelection();
			var font, highlightColor, highlightener;
			var findInput, inputResults;
			function setup(){
				voicesDropdown = select("#Voices");
				font = select("#Fonts");
				highlightColor = select("#highlightInput");
				highlightButtonIcon = select("#highlightButtonIcon");
				fontColorIcon = select("#fontColorIcon");
				fontColor = select("#fontColorInput");
				findInput = createInput();
				inputResults = 0;
			}
			function enableEditMode(){
				richTextField.document.designMode="On";
			}
			function excCmd(command){
				richTextField.document.execCommand(command, false, null);
			}
			function excCmdWithArg(command, arg){
				richTextField.document.execCommand(command, false, arg);
			}
			function toggleSource(){
				if(showSourceCode){
					richTextField.document.getElementsByTagName('body')[0].innerHTML = richTextField.document.
					getElementsByTagName('body')[0].textContent
					showSourceCode = false;
				}
				else{
					richTextField.document.getElementsByTagName('body')[0].textContent = richTextField.document.
					getElementsByTagName('body')[0].innerHTML
					showSourceCode = true;
				}
			}
			function toggleEdit(){
				if(isInEditMode){
					richTextField.document.designMode="Off";
					isInEditMode = false;
					document.getElementById("toggleEditButton").innerHTML = "Edit Mode";
				}
				else{
					richTextField.document.designMode="On";
					isInEditMode = true;
					document.getElementById("toggleEditButton").innerHTML = "View Mode";
				}
			}
			function stopSpeaking(){
				speech.stop();
			}
			function speak(text){
				speech.setVoice(voicesDropdown.value());
				speech.speak(text)
			}
			function draw(){
			highlightButtonIcon.style("color", highlightColor.value());
			fontColorIcon.style("color", fontColor.value());
			myText = document.getElementById("TextField");
			content = myText.contentWindow.document.body.textContent;
			splitText = content.split("");
			//console.log(splitText);
			for(x=0; x<splitText.length; x++){
				if(splitText[x]==="*"){
					splitText.pop();
					splitText.pop();
					document.getElementById("TextField").contentWindow.document.body.textContent = splitText.join("");
					excCmdWithArg('fontName', font.value());
					excCmd("insertUnorderedList");
				}
				else if(splitText[x]==="1" && splitText[x+1]==="."){
					splitText.pop();
					splitText.pop();
					document.getElementById("TextField").contentWindow.document.body.textContent = splitText.join("");
					excCmdWithArg('fontName', font.value());
					excCmd("insertOrderedList");
				}
				else if(splitText[x]===findInput.value()){
					inputResults++
					console.log(inputResults);
				}
			}
			} 
			function createMarqueeOfChoice(){
				let marqueeText = prompt("What is the text that you want to be moving?");
				if(marqueeText!==null){
					let marqueeBGColor = prompt("Give me the background color that you want your moving text to have.");
					let marqueeFont = prompt("What font should your moving text be in?");
				 	document.getElementById("TextField").contentWindow.document.body.innerHTML = document.getElementById("TextField").contentWindow.document.body.innerHTML+"<marquee bgColor="+marqueeBGColor+" "+"style='font-family:"+marqueeFont+";'"+">"+marqueeText+"</marquee><br>"
				}
			}
			function addGoogleFont(){
				let googleFont = prompt("What Google font do you want to use?");
				if(googleFont!==null){
					document.getElementById("TextField").contentWindow.document.body.innerHTML =  "<link href='https://fonts.googleapis.com/css?family="+googleFont+"'"+" rel='stylesheet'>"+document.getElementById("TextField").contentWindow.document.body.innerHTML;
					var x = document.createElement("OPTION");
					x.setAttribute("value", googleFont);
					x.style.fontFamily = "Dubai";
					var t = document.createTextNode(googleFont+" (Google font)");
					x.appendChild(t);
					document.getElementById("Fonts").appendChild(x);
				}
			}
			function createTable(){
				let rows = parseFloat(prompt("How many rows do you want your table to have?"));
				console.log(rows);
				document.getElementById("TextField").contentWindow.document.body.innerHTML = document.getElementById("TextField").contentWindow.document.body.innerHTML+"<table border=20px>";
				for(m=0; m<rows; m++){
					document.getElementById("TextField").contentWindow.document.body.innerHTML = document.getElementById("TextField").contentWindow.document.body.innerHTML+"<tr><td>Hello</td></tr>";
				}
				document.getElementById("TextField").contentWindow.document.body.innerHTML = document.getElementById("TextField").contentWindow.document.body.innerHTML+'</table>'
				}
			function openContextMenu(){
				alert("What??? Where'd the context menu go???")
			}
			function createUnorderedList(){
				document.getElementById("TextField").contentWindow.document.body.innerHTML = document.getElementById("TextField").contentWindow.document.body.innerHTML+"<ul type='square'><li></li></ul>"
			}
			function makeType(){
				document.getElementById("TextField").contentWindow.document.body.innerHTML = "<style> ul{list-style-type: square} </style>"+document.getElementById("TextField").contentWindow.document.body.innerHTML
			}