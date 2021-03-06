var wsUri = "ws://localhost:3000/";

var output;

var eventPosition = new cc.EventCustom("change_position");

function init()
{
    output = document.getElementById("output");
    testWebSocket();
}

function testWebSocket()
{
    websocket = new WebSocket(wsUri, 'train-protocol');
    websocket.onopen = function(evt) { onOpen(evt) };
    websocket.onclose = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror = function(evt) { onError(evt) };
}

function onOpen(evt)
{
    writeToScreen("CONNECTED");
    //doSend("WebSocket rocks");
}

function onClose(evt)
{
    writeToScreen("DISCONNECTED");
}

function onMessage(evt)
{
    var response = JSON.parse(evt.data);

    if (response.action == Events.NEW_POSITION) {
        eventPosition.setUserData(response.data);
        cc.eventManager.dispatchEvent(eventPosition);
        writeToScreen('<span style="color:blue;">RESPONSE: ' + response.data.x + ' : ' + response.data.y +'</span>');
    }

    //websocket.close();
}

function onError(evt)
{
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

function doSend(message)
{
    writeToScreen("SENT: " + message);
    websocket.send(message);
}

function writeToScreen(message)
{
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
}

window.addEventListener("load", init, false);