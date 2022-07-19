import { getDatabase, get, set, update, remove, child, ref } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";

var rollV, nameV, genderV, addressV;
const db = getDatabase();

// references
// getting data from textboxes
var RollBox = document.getElementById("rollBox");
var NameBox = document.getElementById("nameBox");
var GenBox = document.getElementById("genBox");
var AddBox = document.getElementById("addBox");

// button references


function insertData(event) {
    event.preventDefault();
    //console.log("btn clicked");
    readFromData();
    // code to send the data to firebase
    if (rollV == "" && nameV == "" && genderV == "" && addressV == "") {
        alert("Field can not be blank");
    } else {

        set(ref(db, "data/" + rollV), {
            rollNo: rollV,
            name: nameV,
            gender: genderV,
            address: addressV,

        }).then(() => {
            alert("data stored successfully");
        }).catch((error) => {
            alert("Unsuccessful", error);
        });
        clearFromData();
    }

}

function readData(event) {
    event.preventDefault();
    //console.log("btn clicked");
    readFromData();
    // code to read the data in firebase
    const dbref = ref(db);
    get(child(dbref, "data/" + rollV)).then((snapshot) => {
        if (snapshot.exists()) {
            NameBox.value = snapshot.val().name;
            GenBox.value = snapshot.val().gender;
            AddBox.value = snapshot.val().address;

        } else {
            alert("No data found");
        }
    }).catch((error) => {
        alert("Unsuccessful", error);
    });

}

function updateData(event) {
    event.preventDefault();
    //console.log("btn clicked");
    readFromData();
    update(ref(db, "data/" + rollV), {
        // rollNo: rollV, remove as rollnumber in my key
        name: nameV,
        gender: genderV,
        address: addressV,

    }).then(() => {
        alert("data updated successfully");
    }).catch((error) => {
        alert("Unsuccessful", error);
    });

    //code to update the data from firebase
    clearFromData();
}

function deleteData(event) {
    event.preventDefault();
    //console.log("btn clicked");
    readFromData();
    if (rollV == "" && nameV == "" && genderV == "" && addressV == "") {
        alert("Field can not be blank");
    } else {
        if (confirm("Are you sure to Delete this:?")) {
            remove(ref(db, "data/" + rollV), {


            }).then(() => {
                alert("data removed successfully");
            }).catch((error) => {
                alert("Unsuccessful", error);
            });
        }
        // code to delete the data from firebase
        clearFromData();
    }
}

function readFromData() {


    rollV = RollBox.value;
    nameV = NameBox.value;
    genderV = GenBox.value;
    addressV = AddBox.value;
    console.log(rollV, nameV, genderV, addressV);

}
// clear form after data submission
function clearFromData() {
    RollBox.value = "";
    NameBox.value = "";
    GenBox.value = "";
    AddBox.value = "";
}
// firebase project creation..


document.querySelectorAll(".btn")[0].onclick = insertData;
document.querySelectorAll(".btn")[1].onclick = readData;
document.querySelectorAll(".btn")[2].onclick = updateData;
document.querySelectorAll(".btn")[3].onclick = deleteData;