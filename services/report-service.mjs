export async function ShowResults(pool) {
    let sql = `select c.id, c."name", round(coalesce(sum(d.amount),0),2) sum, count(*) count, currency 
    from customer c
    join customer_account ca on c.id = ca.customer_id
    join deposit d on d.to_account_number = ca.account_number and d.to_routing_number = ca.routing_number 
    group by c.id, d.currency
    order by c.name`

    let res = await pool.query(sql)
    res.rows.forEach(r => {
        console.log(`Deposited for ${r.name}: count=${r.count} sum=${r.sum} ${r.currency}`)
    })

    sql = `select round(coalesce(sum(amount),0),2) sum, count(*) count, currency 
    from deposit
    where status='Unknown'
    group by currency`
    res = await pool.query(sql)
    res.rows.forEach(r => {
        console.log(`Deposited without known user: count=${r.count} sum=${r.sum} ${r.currency}`)
    })

    sql = `select round(min(amount),2) min, currency 
    from deposit
    where status='Complete'
    group by currency`
    res = await pool.query(sql)
    res.rows.forEach(r => {
        console.log(`Smallest valid deposit: ${r.min} ${r.currency}`)
    })

    sql = `select round(max(amount),2) max, currency 
    from deposit
    where status='Complete'
    group by currency`
    res = await pool.query(sql)
    res.rows.forEach(r => {
        console.log(`Largest valid deposit: ${r.max} ${r.currency}`)
    })
}