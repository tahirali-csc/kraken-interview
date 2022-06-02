import { GetDeposits } from './deposit-servce.mjs'
import { InitDB } from './db.mjs';

const conf = {
    host: process.env.DB_HOST ?? 'localhost',
    database: process.env.DB_NAME ?? 'kraken',
    user: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'password',
    port: process.env.PORT ?? '5432'
}

InitDB(conf)



// const config = {
//     dataFolder: "./data"
// }



// async function GetCustomers() {
//     let res = await pool.query("select c.id, c.name, ca.account_number, ca.routing_number from customer c inner join customer_account ca on c.id = ca.customer_id")
//     pool.end()

//     let custMap = new Map()
//     res.rows.forEach(r => {
//         custMap.set(r.routing_number + "/" + r.account_number, r)
//     })
//     return custMap
//     // console.log(res.rows)
// }

// let deposits = await GetDeposits(config.dataFolder + "/sample1.json", config.dataFolder + "/sample2.json")
// // console.log(deposits.length)
// let customers = await GetCustomers()


// // for (let i in deposits) {
// //     let d = deposits[i]

// //     let fromKey = d.from.routing_number + "/" + d.from.account_number
// //     let toKey = d.to.routing_number + "/" + d.to.account_number

// //     if (customers.has(fromKey) && customers.has(toKey)) {
// //         console.log(fromKey + "--" + toKey)
// //     }

// //     let pool = new Pool({
// //         user: 'postgres',
// //         host: 'localhost',
// //         database: 'kraken',
// //         password: 'password',
// //         port: 5432,
// //     })

// //     await pool.query("insert into deposit(customer_id, from_account, to_account, from_routing_number, to_routing_number, currency, amount) values(1,$1, $2,$3,$4,$5, $6) ",
// //         [d.from.account_number, d.to.account_number, d.from.routing_number, d.to.routing_number, 'USD', 123])
// //     pool.end()
// // }

// ShowResults()


// function ProcessTransaction(transaction) {
//     let routingFrom = transaction.from.routing_number, routFromAcct = transaction.from.account_number
//     let routingTo = transaction.to.routing_number, routingToAcct = transaction.to.account_number
// }

// async function ShowResults() {
//     let sql = `select c.id, c."name" , sum(d.amount) amount , count(*) count from deposit d 
//     inner join customer_account ca on d.to_account  = ca.account_number and d.to_routing_number  = ca.routing_number 
//     inner join customer c on ca.customer_id  = c.id 
//     group by c.id `

//     let pool = new Pool({
//         user: 'postgres',
//         host: 'localhost',
//         database: 'kraken',
//         password: 'password',
//         port: 5432,
//     })

//     let res = await pool.query(sql)
//     pool.end()

//     console.log(res.rows)
// }


