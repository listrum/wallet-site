function get_key(wallet) {
    return JSON.parse(localStorage.getItem("keys"))[wallet];
}

function get_wallets() {
    let keys = JSON.parse(localStorage.getItem("keys"));
    if (!keys) {
        return [];
    } else {
        return Object.keys(keys);
    }
}

async function add_key(key) {
    try {
        key = JSON.parse(key);
    } catch { }

    let keys = JSON.parse(localStorage.getItem("keys"));

    if (!keys) {
        keys = {};
    }

    keys[await pad_key(key["pub"])] = key;
    localStorage.setItem("keys", JSON.stringify(keys));
}

async function new_key(password) {
    let key = await generate_pair();

    key = {
        pub: await export_public(key.publicKey),
        priv: await export_private(password, key.privateKey),
    };

    await add_key(key);
}

document.getElementById("export").onclick = async () => {
    navigator.clipboard.writeText(JSON.stringify(get_key(selected_wallet)));
    alert("Copied to clipboard!");
};

document.getElementById("import").onclick = async () => {
    await add_key(prompt("Key"));
    update();
};

document.getElementById("new_key").onclick = async () => {
    let password = prompt("Password");
    await new_key(password);

    update();
};

document.getElementById("copy").onclick = async () => {
    navigator.clipboard.writeText(selected_wallet);
};
