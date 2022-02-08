# Hashing

## Learning Objectives

- Use a vetted library to hash sensitive data

## Introduction

> Hashing is a one-way system that transforms any piece of data into an arbitrary looking series of characters. There is no way to transform the data back into its original state, making it a highly effective solution for storing and verifying sensitive information such as passwords.

There are many different hashing algorithms but all of them aim to accomplish the same task with varying degrees of effectiveness: turning a piece of data into gibberish, making it unreadable to the human eye.

Hashing is *deterministic*, which means the same input will always produce the same output. For example, running the string `"mypassword"` through a SHA256 hashing function will *always* result in a hash of `89e01536ac207279409d4de1e5253e01f4a1769e696db0d6062ca9b8f56767c8`.

Since hashing is one-way (you can't un-hash the above back to "mypassword") and it's deterministic ("mypassword" will always hash to the above), that makes it a great solution for storing passwords in a database. Even if somebody gains access to the data, they won't be able to un-hash the password to see what it was - but we can still verify a user has entered their password correctly because we can hash what they enter and compare the hash to the one stored in the database.


