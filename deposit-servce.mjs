import fs from 'fs'

function GetDeposits(...files){
    let deposits = []
    for(let i in files){
        let file = files[i]
        // console.log(file)
        let raw = fs.readFileSync(file, "utf-8")
        let data = JSON.parse(raw)
        deposits = deposits.concat(data.transactions)
    }
    return deposits
}

export { GetDeposits }