document.addEventListener("DOMContentLoaded", function(){
    console.log("Document Loaded");

    fetch("../json/contents.json")
        .then(response => {
            return response.json();
        })
        .then((data) => process(data));
});

function process(data){
    const people = data.people;
    //console.log(people);
    for(let i = 0; i < people.length; i++){
        console.log(people[i]);
        addPersonToTable(people[i], i+1);
    }
}

function addPersonToTable(person, position){
    const table = document.getElementById("Contents");
    const row = table.insertRow(position);
    const name = row.insertCell(0);
    const surname = row.insertCell(1);
    const age = row.insertCell(2);
    const profession = row.insertCell(3);
    name.innerHTML = person.name;
    surname.innerHTML = person.surname;
    age.innerHTML = person.age;
    profession.innerHTML = person.profession;
}