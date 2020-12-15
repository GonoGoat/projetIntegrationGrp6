/****************ACCESS********************/
CREATE TABLE public.access
(
    door integer,
    users integer,
    tag character varying COLLATE pg_catalog."default",
    nickname character varying COLLATE pg_catalog."default",
    CONSTRAINT unique_doors_access UNIQUE (door, users),
    CONSTRAINT unique_user_tag_name UNIQUE (users, tag, nickname),
    CONSTRAINT access_users_fkey FOREIGN KEY (users)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.access
    OWNER to "postgresArnaud";

/*********************DOOR*************************/
CREATE TABLE public.door
(
    password character varying COLLATE pg_catalog."default",
    status integer,
    adresseip character varying COLLATE pg_catalog."default",
    id integer NOT NULL DEFAULT nextval('door_id_seq'::regclass),
    CONSTRAINT door_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.door
    OWNER to "postgresArnaud";

/****************HISOTRY*****************************/
CREATE TABLE public.history
(
    id integer NOT NULL DEFAULT nextval('history_id_seq'::regclass),
    door integer NOT NULL,
    users integer NOT NULL,
    date character varying(50) COLLATE pg_catalog."default" NOT NULL,
    action integer NOT NULL,
    CONSTRAINT history_pkey PRIMARY KEY (id),
    CONSTRAINT history_users_fkey FOREIGN KEY (users)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.history
    OWNER to "postgresArnaud";

/******************USERS***************************/
CREATE TABLE public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    firstname character varying COLLATE pg_catalog."default",
    lastname character varying COLLATE pg_catalog."default",
    phone character varying COLLATE pg_catalog."default",
    sexe character(1) COLLATE pg_catalog."default",
    mail character varying COLLATE pg_catalog."default",
    password character varying COLLATE pg_catalog."default",
    isadmin boolean,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to "postgresArnaud";