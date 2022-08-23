document.addEventListener("DOMContentLoaded", function () {
    console.log("Document Loaded");

    fetch("../json/contents.json")
        .then(response => {
            return response.json();
        })
        .then((data) => process(data));
});

let peopleData;
let buttonStates = [null, null, null, null];

function process(data) {
    const people = data.people;
    peopleData = people;

    populateTable(people);
}

function populateTable(people) {
    const docFrag = document.createDocumentFragment();
    const table = document.getElementById("Contents");

    for (const person of people) {
        const row = addPersonToTableFragment(person);
        docFrag.append(row);
    }

    //people.forEach(person => addPersonToTableFragment(person));

    table.append(docFrag);
}

function addPersonToTableFragment(person) {
    const row = document.createElement("tr");

    for (const key in person) {
        const col = document.createElement("td");
        col.innerText = person[key];
        row.append(col);
    }

    return row;
}

function sortElements(column) {
    if (buttonStates[column] == null) {
        buttonStates[column] = "normal";
        swapButton(column, "normal");
        sortTable(column, "normal");
    } else if (buttonStates[column] == "normal") {
        buttonStates[column] = "reversed";
        swapButton(column, "reversed");
        sortTable(column, "reversed");
    } else {
        buttonStates[column] = "normal";
        swapButton(column, "normal");
        sortTable(column, "normal");
    }
}

function swapButton(target, mode) {
    const buttons = [
        document.getElementById("name-btn"),
        document.getElementById("surname-btn"),
        document.getElementById("age-btn"),
        document.getElementById("profession-btn")
    ]; //button id list

    //swap current button icon
    if (mode == "normal") {
        buttons[target].textContent = "+";
    } else if (mode == "reversed") {
        buttons[target].textContent = "-";
    }

    //reset other buttons
    for (let i = 0; i < buttons.length; i++) {
        if (i != target) {
            buttons[i].textContent = "=";
            buttonStates[i] = null;
        }
    }
}

function sortTable(target, mode) {
    const table = document.getElementById("Contents");
    let sortedElements = peopleData;

    //clear table from html
    for (let i = table.children.length - 1; i > 0; i--) {
        table.children[i].remove();
    }

    sortedElements.sort((x, y) => {
        if (mode == "normal") {
            switch (target) {
                case 0:
                    return x.name.localeCompare(y.name);
                case 1:
                    return x.surname.localeCompare(y.surname);
                case 2:
                    return x.age == y.age ? 0 : x.age < y.age ? -1 : 1;
                case 3:
                    return x.profession.localeCompare(y.profession);
            }
        } else if (mode == "reversed") {
            switch (target) {
                case 0:
                    return y.name.localeCompare(x.name);
                case 1:
                    return y.surname.localeCompare(x.surname);
                case 2:
                    return y.age == x.age ? 0 : y.age < x.age ? -1 : 1;
                case 3:
                    return y.profession.localeCompare(x.profession);
            }
        }
    });

    populateTable(sortedElements);
}
