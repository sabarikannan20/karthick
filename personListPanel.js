var personListPanel = {};
var personListPanelView;
var personJson;
var personListItem;
var isCreate;
var rowCount = 0;

personListPanel.createChildren = function() {};

personListPanel.createView = function() {
    personListPanelView = ajaxTemplate.doRead('GET', 'templates/personListPanel.html', false);
};

personListPanel.prePopulate = function() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
            personJson = JSON.parse(this.responseText);
            constructList(personJson);
        }
    };
    httpRequest.open('GET', 'http://localhost:8080/res/do/person', false);
    httpRequest.send();
};


personListPanel.listenEvents = function() {
    document.getElementById('person-adder').addEventListener('click', onAddSelected);
    eventManager.subscribe('submitSelected', onSubmit);
    addListener();
};

var addListener = function() {
    var table = document.getElementById('table');
    for(i = 0; i < table.rows.length - 1; i++) {
        document.getElementById('r' + i).addEventListener('click', onRowSelected);
        document.getElementById('d' + i).addEventListener('click', onDeleteSelected);
    }
};

personListPanel.setDefaults = function() {
    var table = document.getElementById('table');
    eventManager.broadcast('rowSelected', table.rows[1]);
};

var onSubmit = function(data) {
  if (isCreate === true) {
    personJson = ajaxTemplate.doPut('PUT', 'http://localhost:8080/res/do/person',  false, data);
    console.log(personJson);
    createdPerson = JSON.parse(personJson);
    var person = [];
    person.push(createdPerson);
    constructList(person);
  } else {
      update(data);
  }
};

var update = function (data) {

    personJson = ajaxTemplate.doPut('POST', 'http://localhost:8080/res/do/person?toUpdate=true',  false, data);
    console.log(personJson);
    updatedPerson = JSON.parse(personJson);
    var person = [];
    person.push(updatedPerson)
    var id = person[0].id;
    var table = document.getElementById('table' );
    var tr = table.rows;
    for (i = 1; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName('td')[0].innerHTML;

        if (td == id) {
            for(j = 0; j < keyList.length; j++ ) {
                var inputData = person[0][keyList[j]];
                tr[i].cells[j].innerHTML = inputData;
            }
        }
    }
};

var onAddSelected = function() {
    isCreate = true;
    eventManager.broadcast('addSelected', '');
};

var onRowSelected = function() {
    isCreate = false;
    eventManager.broadcast('rowSelected', this);
};

var onDeleteSelected = function() {
    var table = document.getElementById('table')
    var index = this.parentNode.parentNode.rowIndex;
    table.deleteRow(index);
    // eventManager.broadcast('deleteSelected', this);
};

var constructList = function (Json) {

    getPersonTemplate();
    var listItem = '';
    for (var i = 0; i < Json.length; i++) {
        var personValues = Object.values(Json[i]);
        listItem += personListItem.replace(/%id%/, personValues[0])
                                  .replace(/%firstname%/, personValues[1])
                                  .replace(/%lastname%/, personValues[2])
                                  .replace(/%email%/, personValues[3])
                                  .replace(/%birthdate%/, personValues[4])
                                  .replace(/%admin%/, personValues[5])
                                  .replace(/rId/, 'r' + rowCount)
                                  .replace(/dId/, 'd' + rowCount);
        rowCount++;
    }
    document.getElementById('table').innerHTML += listItem;
    addListener();
};

var getPersonTemplate = function () {
    personListItem = ajaxTemplate.doRead('GET', 'templates/personListTemplate.html', false);
};