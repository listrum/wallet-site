async function create_owner(password, data) {
    let time = Date.now();

    return {
        pub: get_key(selected_wallet)["pub"],
        time: time,
        sign: await sign(password, data + String(time)),
    };
}

async function send(password, to, value) {
    to = { to: to, value: value / (await get_fee()) };

    tx = {
        from: await create_owner(password, JSON.stringify(to)),
        data: to,
    };

    for (node of list_nodes()) {
        await fetch(node + "/send/" + JSON.stringify(tx));
    }
}

document.getElementById("send").onclick = async () => {
    let value = Number(document.getElementById("value").value);

    if (value > (await get_balance())) {
        alert("Not enough!");
        return;
    }

    if (!confirm("Confirm spening " + value / (await get_fee()))) {
        return;
    }

    let password = prompt("Password");
    await send(password, document.getElementById("to").value, value);

    clear("to");
    clear("value");
    update();
};
