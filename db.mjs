import pkg from 'pg'
const { Pool } = pkg

const db = 'kraken'

const customerTable =
    `CREATE TABLE IF NOT EXISTS public."customer" (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar NOT NULL,
	CONSTRAINT customer_pk PRIMARY KEY (id)
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

