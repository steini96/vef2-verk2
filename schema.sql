CREATE TABLE applications (
  id serial primary key,
  nafn varchar(64) not null,
  netfang varchar(64),
  simi int,
  texti text,
  starf varchar(64),
  unnin boolean NOT NULL DEFAULT false,
  data timestamp with time zone not null default current_timestamp
);
