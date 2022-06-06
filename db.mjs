import pkg from 'pg'
const { Pool } = pkg

export async function InitDB(conf) {
    let pool = GetPool(conf)

    try {
        await insertCustomer(pool, 'Jadzia Dax',
            { routing_number: '011000015', account_number: '6622085487' },
        )
        await insertCustomer(pool, 'James T. Kirk',
            { routing_number: '021001208', account_number: '0018423486' }
        )
        await insertCustomer(pool, 'Jean-Luc Picard',
            { routing_number: '021001208', account_number: '1691452698' }
        )
        await insertCustomer(pool, 'Jonathan Archer',
            { routing_number: '011000015', account_number: '3572176408' }
        )
        await insertCustomer(pool, 'Leonard McCoy',
            { routing_number: '011000015', account_number: '8149516692' }
        )
        await insertCustomer(pool, 'Montgomery Scott',
            { routing_number: '011000015', account_number: '7438979785' }
        )
        await insertCustomer(pool, 'Spock',
            { routing_number: '011000015', account_number: '1690537988' },
            { routing_number: '021001208', account_number: '1690537989' }
        )
        await insertCustomer(pool, 'Wesley Crusher',
            { routing_number: '011000015', account_number: '6018423486' }
        )

    } finally {
        pool.end()
    }
}

async function insertCustomer(pool, name, ...accounts) {
    await pool.query('begin')
    await pool.query('insert into customer (name) select $1 where not exists (select name from customer where name = $2)', [name, name])
    const custId = (await pool.query('select id from customer where name=$1', [name])).rows[0].id
    await pool.query('commit')

    for (let acct of accounts) {
        await insertCustomerAccount(pool, acct, custId)
    }
}

async function insertCustomerAccount(pool, a, custId) {
    let sql = `insert into customer_account(customer_id,routing_number,account_number) select $1,$2::varchar,$3::varchar where not exists(
        select customer_id,routing_number,account_number from customer_account 
        where customer_id=$1 and routing_number=$2 and account_number=$3)`
    await pool.query('begin')
    await pool.query(sql, [custId, a.routing_number, a.account_number])
    await pool.query('commit')
}

export function GetPool(conf) {
    return new Pool({
        user: conf.user,
        host: conf.host,
        database: conf.database,
        password: conf.password,
        port: conf.port

    })
}

