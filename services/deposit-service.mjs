import fs from 'fs'

export function GetDeposits(...files){
    let deposits = []
    for(let f of files) {
        let raw = fs.readFileSync(f, "utf-8")
        let data = JSON.parse(raw)
        deposits = deposits.concat(data.transactions)
    }
    return deposits
}

