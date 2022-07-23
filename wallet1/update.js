async function update() {
    update_wallets()
    update_nodes()
    update_fee()

    set("balance", await get_balance());
}

document.getElementById("wallets").onchange = () => {
    update();
};

document.body.onload = async () => {
    document.title = "Wallet | Listrum";
    update();
};

document.body.onfocus = async () => {
    update();
};

document.getElementById("update_balance").onclick = async () => {
    update();
};

function set(name, data) {
    document.getElementById(name).innerHTML = data;
}

function clear(name) {
    document.getElementById(name).value = "";
}
