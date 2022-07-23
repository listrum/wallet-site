function check_address(address) {
    if (!address.includes(":")) {
        address += ":" + port;
    }

    if (!address.includes("https://")) {
        address = "https://" + address;
    }

    return address;
}

function add_node(address) {
    address = check_address(address);

    let nodes = JSON.parse(localStorage.getItem("nodes"));

    if (!nodes) {
        nodes = [];
    }

    nodes.push(address);

    localStorage.setItem("nodes", JSON.stringify(nodes));
}

function list_nodes() {
    let nodes = localStorage.getItem("nodes");
    if (!nodes) {
        return [];
    } else {
        return JSON.parse(nodes);
    }
}

function remove_node(address) {

    let nodes = JSON.parse(localStorage.getItem("nodes"));

    nodes.splice(nodes.indexOf(address), 1);
    localStorage.setItem("nodes", JSON.stringify(nodes));

    update();
}

document.getElementById("add_node").onclick = async () => {
    add_node(prompt("Node address"));

    update();
};



async function update_nodes() {

    let nodes = "";
    let fee;

    for (let node of list_nodes()) {
        try {
            fee = 100 - (await node_fee(node)) * 100;
            fee = String(fee).substring(0, 5);

        } catch {
            fee = "Unavailable";
        }

        balance = await node_balance(node)
        if (balance < 0) {
            balance = "Error"
        }

        nodes +=
            "<li>" + node + " (" + balance + ", " + fee + "%) <button onclick=remove_node('" + node + "')>Remove</button></li>";
    }

    set("nodes", nodes);
}