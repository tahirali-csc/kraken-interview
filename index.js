import path from 'path'

import { GetDeposits } from './services/deposit-service.mjs'
import { GetPool, InitDB } from './db.mjs';
import { GetAccounts } from './services/customer-service.mjs';
import { ProcessDeposit } from './services/transaction-service.mjs'
import { ShowResults } from './services/report-service.mjs'

//setup db config
const conf = {
    //path of the json file
    data: "./data",
    //db config
    db: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME ?? 'kraken',
        user: process.env.DB_USER ?? 'postgres',
        password: process.env.DB_PASSWORD ?? 'password',
        port: process.env.PORT ?? '5432'
    }
}


//setup customers and their accounts
await InitDB(conf.db)

const depostFiles = ["sample1.json", "sample2.json"]
const pool = GetPool(conf.db)
//read customer accounts
let accounts = await GetAccounts(pool)
try {
    for (let file of depostFiles) {
        let deposits = GetDeposits(path.resolve(path.join(conf.data, file)))
        for (let dep of deposits) {
            await ProcessDeposit(pool, dep, accounts)
        }
    }
    await ShowResults(GetPool(conf.db))
} finally {
    pool.end()
    process.exit()
}