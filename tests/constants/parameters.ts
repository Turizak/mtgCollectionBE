const parameters = {
  username: process.env.USER,
  password: process.env.PASSWORD,
  account_id: process.env.ACCOUNTID,
  nonexisting_card: {
    scry_id: "ee0e8c57-3046-414d-be00-39bfb2537026",
    card_name: "Merciless Javelineer",
    price: 0.09,
    quantity: 1,
  },
  existing_card: {
    scry_id: "709f6376-9a33-4900-a7ae-00767fb9f9bf",
    card_name: "Rattlechains",
    price: 0.30,
    quantity: 1,
  },
  new_card: {
    scry_id: "fe9f85e8-1e4c-4478-8344-71fae357b694",
    card_name: "Breakneck Rider",
    price: 0.18,
    quantity: 1,
  },
};

export { parameters };
