import fs from 'fs'

export function GetDeposits(...files){
    let deposits = []
    for(let i in files){
        let file = files[i]
        let raw = fs.readFileSync(file, "utf-8")
        let data = JSON.parse(raw)
        deposits = deposits.concat(data.transactions)
    }
    return deposits
}

