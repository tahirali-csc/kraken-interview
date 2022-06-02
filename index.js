import path from 'path'

import { GetDeposits } from './deposit-servce.mjs'
import { GetPool, InitDB } from './db.mjs';
import { GetAccounts } from './customer-service.mjs';

const conf = {
    data: "./data",
    db: {
        host: process.env.DB_HOST ?? 'localhost',
        database: process.env.DB_NAME ?? 'kraken',
        user: process.env.DB_USER ?? 'postgres',
        password: process.env.DB_PASSWORD ?? 'password',
        port: process.env.PORT ?? '5432'
    }
}

await InitDB(conf.db)

let accounts = await GetAccounts(GetPool(conf.db))
console.log(accounts)

const depostFiles = ["sample1.json", "sample2.json"]
depostFiles.forEach(async f => {
    const file = path.join(conf.data, f)
    let deposits = await GetDeposits(file)
    deposits.forEach(async d => {
        let fromKey = d.from.routing_number + "/" + d.from.account_number
        let toKey = d.to.routing_number + "/" + d.to.account_number

        if (accounts.has(toKey)) {
            await ProcessDeposit(GetPool(conf.db), d)
        } else {
            console.log(fromKey, toKey)
        }
    })
})


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


async function ProcessDeposit(pool, transaction) {
    await pool.query('begin')
    let res = await pool.query(`insert into "deposit"(
            from_routing_number,
            from_account_number, 
            to_routing_number, 
            to_account_number,
            amount,
            currency
        ) values($1,$2,$3,$4,$5,$6)`,
        [
            transaction.from.routing_number,
            transaction.from.account_number,
            transaction.to.routing_number,
            transaction.to.account_number,
            parseFloat(transaction.amount.amount),
            transaction.amount.currency
        ])
    await pool.query('commit')        

}

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


