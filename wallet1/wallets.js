async function update_wallets() {
    let wallets = document.getElementById("wallets");
    if (wallets.value) {
        selected_wallet = wallets.value;
    } else {
        selected_wallet = wallets.options[0];
    }
    wallets.innerHTML = "";

    for (let wallet of get_wallets()) {
        let key = document.createElement("option");
        key.text = wallet;

        wallets.add(key);
    }

    wallets.value = selected_wallet;
}