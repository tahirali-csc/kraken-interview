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
        account_number varchar NOT null,
        CONSTRAINT customer_account_un UNIQUE (routing_number, account_number)
    );`

const depositTable =
    `CREATE TABLE IF NOT EXISTS public.deposit (
        id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
        from_routing_number varchar NOT null,
        from_account_number varchar NOT null,
        to_routing_number varchar null,
        to_account_number varchar NOT null,
        amount float8 NOT NULL,
        currency varchar(3) NOT NULL 
    );`

export async function InitDB(conf) {
    const pool = new Pool({
        host: conf.host,
        user: 'postgres',
        password: conf.password,
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
        await pool.query(customerTable)
        await pool.query(customerAccountTable)
        await pool.query(depositTable)
    } finally {
        pool.end()
    }
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

