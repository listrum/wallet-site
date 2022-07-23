async function node_balance(address) {
    try {
        let res = await fetch(address + "/balance/" + selected_wallet);
        res = await res.text();
        return Number(res);
    } catch {
        return -1;
    }
}

async function get_balance() {
    let total_balance = 0;
    let nodes = 0;

    for (let node of list_nodes()) {
        try {
            balance = await node_balance(node);
            if (balance >= 0) {
                total_balance += balance;
                nodes += 1;
            }
        } catch { }
    }

    if (!nodes) {
        return "No available nodes";
    }

    return total_balance / nodes;
}
