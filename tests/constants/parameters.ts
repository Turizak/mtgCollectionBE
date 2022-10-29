const parameters = {
    username: process.env.USER,
    password: process.env.PASSWORD,
    account_id: process.env.ACCOUNTID,
    bad_card_name: "Merciless Javelineer",
    existing_card: {
        scry_id: "709f6376-9a33-4900-a7ae-00767fb9f9bf",
        card_name: "Rattlechains",
    },
    new_card: {
        scry_id: "fe9f85e8-1e4c-4478-8344-71fae357b694",
        card_name: "Breakneck Rider",
        usd: 0.18,
        quantity: 1,
    },
}

export {
    parameters
}