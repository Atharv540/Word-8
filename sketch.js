            var showSourceCode = false;
			var isInEditMode = true;
			var splitText, myText, content, voicesDropdown;
			var speech = new p5.Speech("Microsoft David - English (United States)");
			var selectedText = window.getSelection();
			var font, highlightColor, highlightener;
			function setup(){
				voicesDropdown = select("#Voices");
				font = select("#Fonts");
				highlightColor = select("#highlightInput");
				highlightener = select("#highlightButton");
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
			hightlightButtonColor = highlightColor.value();
			highlightener.style("color", highlightColor.value());
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
			}
			} 
			function createMarqueeOfChoice(){
				let marqueeText = prompt("What is the text that you want to be moving?");
				let marqueeBGColor = prompt("Give me the background color that you want your moving text to have.");
				let marqueeFont = prompt("What font should your moving text be in?");
				 document.getElementById("TextField").contentWindow.document.body.innerHTML = document.getElementById("TextField").contentWindow.document.body.innerHTML+"<marquee bgColor="+marqueeBGColor+" "+"style='font-family:"+marqueeFont+";'"+">"+marqueeText+"</marquee><br>"
			}