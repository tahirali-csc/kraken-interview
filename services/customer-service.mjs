export async function GetAccounts(pool) {
    const res = await pool.query("select c.id, c.name, ca.account_number, ca.routing_number from customer c inner join customer_account ca on c.id = ca.customer_id")
    let custMap = new Map()
    res.rows.forEach(r => {
        custMap.set(r.routing_number + "/" + r.account_number, r)
    })
    return custMap
}