async function pad_key(pub) {
    if (!pub) {
        return "No key generated"
    }

    pub += ".listrum"
    hash = await crypto.subtle.digest("SHA-256", encoder.encode(pub))
    return encode(hash).slice(0, pad_len);
}

function generate_pair() {
    return crypto.subtle.generateKey(
        {
            name: "ECDSA",
            namedCurve: "P-256"
        },
        true, ["sign"]
    )
}

async function export_public(key) {
    key = await crypto.subtle.exportKey(
        "spki",
        key
    )

    return encode(key)
}

async function export_private(password, key) {

    let salt = crypto.getRandomValues(new Uint8Array(16));
    let iv = crypto.getRandomValues(new Uint8Array(12));

    key = await crypto.subtle.wrapKey(
        "jwk",
        key,
        await decode_password(password, salt),
        {
            name: "AES-GCM",
            iv: iv
        }
    )

    return {
        key: encode(key),
        salt: encode(salt),
        iv: encode(iv)
    }
}

async function get_private(password) {
    let key = get_key(selected_wallet)["priv"];

    key = await crypto.subtle.unwrapKey(
        "jwk",
        decode(key["key"]),
        await decode_password(password, decode(key["salt"])),
        {
            name: "AES-GCM",
            iv: decode(key["iv"])
        },
        {
            name: "ECDSA",
            namedCurve: "P-256"
        },
        true, ["sign"]
    )

    return key
}

async function sign(password, data) {



    res = await crypto.subtle.sign({
        name: "ECDSA",
        hash: {
            name: "SHA-256"
        }
    }, await get_private(password), encoder.encode(data))


    res = encode(res)
    return res
}


async function decode_password(password, salt) {

    password = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    )

    password = await crypto.subtle.deriveKey(
        {
            "name": "PBKDF2",
            salt: salt,
            "iterations": 310000,
            "hash": "SHA-256"
        },
        password,
        { "name": "AES-GCM", "length": 256 },
        false,
        ["wrapKey", "unwrapKey"]
    )

    return password
}