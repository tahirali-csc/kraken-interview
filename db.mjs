import pkg from 'pg'
const { Pool } = pkg

const db = 'kraken'

const customerTable =
    `CREATE TABLE IF NOT EXISTS public."customer" (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar NOT NULL,
	CONSTRAINT customer_pk PRIMARY KEY (id)
);`


const customerAccountTable =
    `CREATE TABLE IF NOT EXISTS  public.customer_account (
        id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
        customer_id int4 NOT null references "customer" (id),
        routing_number varchar NOT NULL,
        account_number varchar NOT NULL,
        CONSTRAINT customer_account_un UNIQUE (routing_number, account_number)
    );`

const depositTable =
    `CREATE TABLE IF NOT EXISTS public.deposit (
        id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
        from_routing_number varchar NOT NULL,
        from_account_number varchar NOT NULL,
        to_routing_number varchar null,
        to_account_number varchar NOT NULL,
        amount float8 NOT NULL,
        currency varchar(3) NOT NULL,
        status varchar(10) NOT NULL,
        remarks text
    );`

export async function InitDB(conf) {
    const pool = new Pool({
        host: 'db',
        user: 'postgres',
        password: 'password',
        database: 'postgres',
        port: conf.port
    })

    try {
        let exists = await pool.query('SELECT 1 FROM pg_database WHERE datname = $1', [db])
        if (exists.rows.length == 0) {
            await pool.query(`create database ${db}`)
        }
    } finally {
        pool.end()
    }

    await setupTables(conf)
}

async function setupTables(conf) {
    let pool = GetPool(conf)
    try {
        await pool.query('begin')
        await pool.query(customerTable)
        await pool.query(customerAccountTable)
        await pool.query(depositTable)
        await pool.query('commit')

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

    for(let acct of accounts){
        await insertCustomerAccount(pool, acct, custId)
    }
}

async function insertCustomerAccount(pool, a, custId){
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

