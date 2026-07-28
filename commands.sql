create table blog( 
	id serial primary key, 
	author text , 
	url  text not null ,
	title text not null ,
	likes integer default 0
);

INSERT INTO blog (author, url, title, likes)
VALUES ('Bill Gates', 'https://www.gatesnotes.com','Gates Notes', 2);
INSERT INTO blog (author, url, title, likes)
VALUES ('Seth Godin', 'https://seth.blog/', 'Seth''s Blog', 4);

create table users(
	id serial primary key,
	username text,
	name text,
)


INSERT INTO users( username, name, created_at  timestamp with time zone , updated_at timestamp with time zone default now()) 
VALUES( 'admin@system.com', 'admin');