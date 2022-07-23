async function node_fee(address) {
    address = check_address(address);

    let res = await fetch(address + "/fee/");
    res = await res.text();
    return Number(res);
}

async function get_fee() {
    let min = 1;

    let res;
    for (let node of list_nodes()) {
        try {
            res = await node_fee(node);

            if (res < min) {
                min = res;
            }
        } catch { }
    }

    return min + (1 / min) * min - 1;
}


async function update_fee() {
    fee = await get_fee();

    if (fee == 1) {
        set("fee", "Unavailable");
    } else {
        set("fee", String(100 - fee * 100).substring(0, 5) + "%");
    }
}