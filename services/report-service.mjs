export async function ShowResults(pool) {
    let sql = `select c.id, c."name", coalesce(sum(d.amount),0) sum, count(*) count, currency 
    from customer c
    left outer join customer_account ca on c.id = ca.customer_id
    left outer join deposit d on d.to_account_number = ca.account_number and d.to_routing_number = ca.routing_number 
    group by c.id, d.currency`

    let res = await pool.query(sql)
    res.rows.forEach(r => {
        console.log(`-->Deposited for ${r.name} : count = ${r.count} sum=${r.sum} curr=>${r.currency}`)
    })
}