-- table for save the iformation about the brand
create table brand(
id int not null primary key AUTO_INCREMENT,
name varchar(255) not null,
category_id int not null,
foreign key (category_id) references category(id)
)


drop table brand

-- table for save the iformation about the category
create table category(
id int not null primary key AUTO_INCREMENT,
name varchar(255) not null
)

-- table for save the information about of products and relate it with the other table like brand and category

create table product(
id int not null primary key AUTO_INCREMENT,
code varchar(255),
name varchar(255) not null,
description varchar(255) not null,
price double (10,2) not null,
brand_id int not null,
foreign key (brand_id) references brand(id)
)
