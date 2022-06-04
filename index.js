// import path from 'path'

// import { GetDeposits } from './services/deposit-service.mjs'
// import { GetPool, InitDB } from './db.mjs';
// import { GetAccounts } from './services/customer-service.mjs';
// import { ProcessDeposit } from './services/transaction-service.mjs'
// import { ShowResults } from './services/report-service.mjs'

// const conf = {
//     data: "/data",
//     db: {
//         host: 'db',
//         database: process.env.DB_NAME ?? 'kraken',
//         user: 'postgres',
//         password: 'password',
//         port: process.env.PORT ?? '5432'
//     }
// }

// console.log('setup')
// await InitDB(conf.db)
// console.log('all setup')

// const depostFiles = ["sample1.json", "sample2.json"]
// const pool = GetPool(conf.db)
// let accounts = await GetAccounts(pool)

// try {
//     for (let file of depostFiles) {
//         let deposits = GetDeposits(path.join(conf.data, file))
//         for (let dep of deposits) {
//             await ProcessDeposit(pool, dep, accounts)
//         }
//     }
//     await ShowResults(GetPool(conf.db))
// } finally {
//     pool.end()
// }
// process.exit()

for(;;){
    
}