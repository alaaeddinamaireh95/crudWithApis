let create = document.querySelector("F");
let modal = document.querySelector("create-student");
let close = document.querySelector("close")
let save = document.querySelector("save");
let success = document.querySelector(".alert-success")
let error = document.querySelector(".alert-danger")


create.addEventListener("click", () => {
    modal.style.display = "flex";
});
close.addEventListener("click", () => {
    modal.style.display = "none";
})



// create Student

save.addEventListener("click", async () => {
    try {
        let name = document.querySelector("name").value;
        let age = document.querySelector("age").value;
        let country = document.querySelector("country").value;


        const res = await fetch("php/insert-data.php", {
            method: "POST",
            body: JSON.stringify({ "name": name, "age": age, "country": country }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const output = await res.json();

        if (output.success) {
            success.style.display = "flex";
            success.innerText = output.message;
            name = "";
            age = "";
            country = "";
            modal.style.display = "none";
            getStudents();
            getTotalCount();
            setTimeout(() => {
                success.style.display = "none";
                success.innerText = "";

            }, 1000)

        } else {
            error.style.display = "flex";
            error.innerText = output.message;
            setTimeout(() => {
                error.style.display = "none";
                error.innerText = "";

            }, 1000)
        }
    } catch (error) {
        error.style.display = "flex";
        error.innerText = error.message;
        setTimeout(() => {
            error.style.display = "none";
            error.innerText = "";

        }, 1000)
    }
});

// select Student

const getStudents = async () => {
    try {
        const tbody = document.querySelector("tbody");
        let tr = "";
        const res = await fetch("php/select-data.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const output = await res.json();
        if (output.empty === "empty") {
            tr = "<tr>Record Not Found</td>"
        } else {
            for (var i in output) {
                tr += `
            <tr>
            <td>${parseInt(i) + 1}</td>
            <td>${output[i].std_name}</td>
            <td>${output[i].std_age}</td>
            <td>${output[i].std_country}</td>
            </tr>`
            }
        }
        tbody.innerHTML = tr;
    } catch (error) {
        console.log("error " + error)
    }
}

getStudents();





// get total count  students;

const getTotalCount = async () => {
    let total = document.querySelector("#total");
    const res = await fetch("php/get-total-count.php", {
        method: "GET"
    })
    const output = await res.json();
    total.innerText = output;
}
getTotalCount();