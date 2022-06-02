import pkg from 'pg';
import { GetDeposits } from './deposit-servce.mjs'
const { Pool } = pkg;


const config = {
    dataFolder: "./data"
}

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'kraken',
    password: 'password',
    port: 5432,
})

async function GetCustomers() {
    let res = await pool.query("select c.id, c.name, ca.account_number, ca.routing_number from customer c inner join customer_account ca on c.id = ca.customer_id")
    pool.end()

    let custMap = new Map()
    res.rows.forEach(r => {
        custMap.set(r.routing_number + "/" + r.account_number, r)
    })
    return custMap
    // console.log(res.rows)
}

let deposits = await GetDeposits(config.dataFolder + "/sample1.json", config.dataFolder + "/sample2.json")
// console.log(deposits.length)
let customers = await GetCustomers()

// console.log(customers)
// for(let i in customers){
//     console.log("--", customers[i])
// }
for (let i in deposits) {
    let d = deposits[i]

    let fromKey = d.from.routing_number + "/" + d.from.account_number
    let toKey = d.to.routing_number + "/" + d.to.account_number

    if (customers.has(fromKey) && customers.has(toKey)) {
        console.log(fromKey + "--" + toKey)
    }

    let pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'kraken',
        password: 'password',
        port: 5432,
    })

    await pool.query("insert into deposit(customer_id, from_account, to_account, from_routing_number, to_routing_number, currency, amount) values(1,$1, $2,$3,$4,$5, $6) ",
        [d.from.account_number, d.to.account_number, d.from.routing_number, d.to.routing_number, 'USD', 123])
    pool.end()
}


// start = async () => {
// async function getUsers() {
//     let res = await pool.query('SELECT * FROM users')
//     console.log(res.rows)
//     pool.end()
// }


