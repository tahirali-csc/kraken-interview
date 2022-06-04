export async function ProcessDeposit(pool, deposit, accounts) {
    let toKey = deposit.to.routing_number + "/" + deposit.to.account_number
    let status = 'Complete', remarks = null
    if (!accounts.has(toKey)) {
        status = 'Review'
        remarks = `The routing_number=${deposit.to.routing_number} account_number=${deposit.to.account_number} is invalid`
    }

    await pool.query('begin')

    await pool.query(`insert into "deposit"(
            from_routing_number,
            from_account_number, 
            to_routing_number, 
            to_account_number,
            amount,
            currency,
            status,
            remarks
        ) values($1,$2,$3,$4,$5,$6, $7, $8)`,
        [
            deposit.from.routing_number,
            deposit.from.account_number,
            deposit.to.routing_number,
            deposit.to.account_number,
            parseFloat(deposit.amount.amount),
            deposit.amount.currency,
            status,
            remarks
        ])
    await pool.query('commit')
}