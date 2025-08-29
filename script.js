fetch("circuit.json")
.then(response => response.json())
.then(circuit => {
    const ul = document.getElementById("circuit");
})