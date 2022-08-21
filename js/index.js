document.addEventListener("DOMContentLoaded", function () {
    console.log("Document Loaded");

    fetch("../json/contents.json")
        .then(response => {
            return response.json();
        })
        .then((data) => process(data));
});

function process(data) {
    const people = data.people;
    const docFrag = document.createDocumentFragment();
    const table = document.getElementById("Contents");

    for (const person of people) {
        console.log(person);
        const row = addPersonToTableFragment(person);
        docFrag.append(row);
    }

    //people.forEach(person => addPersonToTableFragment(person, docFrag));

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
