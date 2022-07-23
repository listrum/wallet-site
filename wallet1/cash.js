document.getElementById("cash").onclick = async () => {
    let value = document.getElementById("cash_value").value;

    if (value > (await get_balance())) {
        alert("Not enough!");
        return;
    }

    if (!confirm("Confirm spening " + value / (await get_fee()))) {
        return;
    }


    let key = await generate_pair();
    send(prompt("Password"), await pad_key(await export_public(key.publicKey)), value)

    key = JSON.stringify(await crypto.subtle.exportKey(
        "jwk",
        key.privateKey
    ))

    navigator.clipboard.writeText(key)
    alert("Copied to your clipboard. Keep it safe!")
    update()
}