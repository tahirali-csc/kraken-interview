
CREATE TABLE IF NOT EXISTS public."customer" (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar NOT NULL,
	CONSTRAINT customer_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS  public.customer_account (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	customer_id int4 NOT null references "customer" (id),
	routing_number varying(20), NOT NULL,
	account_number varying(20), NOT null,
	CONSTRAINT customer_account_un UNIQUE (customer_id, routing_number, account_number)
);

CREATE TABLE IF NOT EXISTS  public.deposit (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	customer_id int4 NOT NULL,
	from_account varchar NOT NULL,
    from_routing_number varchar NOT NULL,
	to_account varchar NOT NULL,
	to_routing_number varchar NULL,
	amount float8 NOT NULL,
	currency varchar NOT NULL
    add constraint fk_customer_id foreign key (customer_id) references "customer" (id); 
);