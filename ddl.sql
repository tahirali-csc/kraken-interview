CREATE TABLE IF NOT EXISTS "customer" (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar NOT NULL,
	CONSTRAINT customer_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS customer_account (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	customer_id int4 NOT null references "customer" (id),
	routing_number varchar NOT NULL,
	account_number varchar NOT null,
	CONSTRAINT customer_account_un UNIQUE (customer_id, routing_number, account_number)
);

CREATE TABLE IF NOT EXISTS deposit (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	from_routing_number varchar NOT NULL,
	from_account_number varchar NOT NULL,
	to_routing_number varchar null,
	to_account_number varchar NOT NULL,
	amount float8 NOT NULL,
	currency varchar(3) NOT NULL,
	status varchar(20) NOT NULL,
	remarks text
);