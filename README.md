# Hashing

## Learning Objectives

- Use a vetted library to hash sensitive data

## Introduction

It's a pretty big security risk to store human readable passwords in databases. Even in very secure systems, there's always a chance that somebody could break in and steal your data - we need to be prepared for that. So how do we hide things like passwords if we still need to store them so users can actually log in to our app?

We hash them!

> Hashing is a one-way system that transforms any piece of data into gibberish. There is no way to transform the data back into its original state, making it a highly effective solution for storing and verifying sensitive information such as passwords.

Hashing is:

- ***Deterministic***: The same input will *always* produce the same output.
- ***One-way***: It's impossible to reverse a hash back to its original data form.

Since hashing is both deterministic and one-way, it's a great solution for storing passwords in a database. Even if somebody gains access to the data, they won't be able to un-hash the password to see what it was - but we can still verify a user has entered their password correctly because we can hash what they enter and compare the hash to the one stored in the database.

Let's imagine a user creates an account and enters the password "`mypassword`". We don't want anybody, even the developers, to know what their password is so we hash it and store the hash in the database instead. The SHA256 hash of `mypassword` is and always will be `89e01536ac207279409d4de1e5253e01f4a1769e696db0d6062ca9b8f56767c8`, that's what we store.

Later, the user tries to log in using that password, "`mypassword`". We use the same hashing algorithm to hash what they enter and then compare the resulting hash to the one stored in the database when they created their account.

The password they entered was the same, we used the same hashing algorithm to hash them, so the resulting hash is exactly the same! That's how we hide passwords from prying eyes while maintaining our ability to verify login credentials.

Even if somebody broke into our database and saw the hash, there's no way they'd be able to reverse it back into `mypassword` since it's a one-way system.

<details>
<summary><em>What if two users have the same password?</em></summary>
<br>
If more than one user has the same password, we'll see the same hash in the database for both of them. This can be a security risk too! There's a solution to this: <em>salting</em>.
<br><br>
The idea of a salt is to add some extra randomness to the resulting hash to make sure that, even when two users have the same password, their hashes are completely different. We do this by adding some random characters to the beginning or end of the password before hashing it - <code>mypassword</code> might become <code>Jhds93nmypassword</code> before it gets hashed. There, <code>Jhds93n</code> is the <em>salt</em>.
<br><br>
The SHA256 hash of <code>Jhds93nmypassword</code> is, and always will be, <code>CB6A4A4B5595111BE4DFE0754A0F98D4E0463041CD1E4F6EF5752E67A202C30B</code>.
<br><br>
If another user decides to use <code>mypassword</code>, they would be given a different <em>salt</em>. For example, <code>8kf73Mfamypassword</code> which will result in a SHA256 hash of <code>7B36DB719FEB0CF138860BB930B888A3DECE76390BF4F317FDDB6C54F350205C</code>.
<br><br>
Two different users using the same password, but their hashes are completely different! You can save the salt in your database to use later when the user tries to log in, its purpose is only to ensure completely unique hashes.
</details>
