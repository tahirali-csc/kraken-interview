
CREATE TABLE public."customer" (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar NOT NULL,
	CONSTRAINT customer_pk PRIMARY KEY (id)
);

CREATE TABLE public.customer_account (
	id int4 NOT NULL,
	customer_id int4 NOT NULL,
	routing_number varchar NOT NULL,
	account_number varchar NOT NULL
    add constraint fk_customer_id foreign key (customer_id) references "customer" (id); 
);

CREATE TABLE public.deposit (
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