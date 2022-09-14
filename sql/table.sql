-- SEQUENCE: public.card_pk_seq

-- DROP SEQUENCE IF EXISTS public.card_pk_seq;

CREATE SEQUENCE IF NOT EXISTS public.card_pk_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.card_pk_seq
    OWNER TO postgres;

-- Table: public.card

-- DROP TABLE IF EXISTS public."card";

CREATE TABLE IF NOT EXISTS public."card"
(
    pk integer NOT NULL DEFAULT nextval('card_pk_seq'::regclass),
    title character varying(20) COLLATE pg_catalog."default"  NOT NULL,
    created bigint NOT NULL,
    content character varying(200) COLLATE pg_catalog."default",
    CONSTRAINT card_pkey PRIMARY KEY (pk)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."card"
    OWNER to postgres;