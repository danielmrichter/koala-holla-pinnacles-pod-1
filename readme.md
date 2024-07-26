This must stop:
---------------
![Think of the Koalas!](https://i.makeagif.com/media/8-22-2014/GO_DT4.gif)


Koala Holla
===========

This is a tool to help track the status of Koalas, data related to them, and stay organized.


Setup
============
First, make a database hosted locally. It NEEDS to be named 'koalas'. This can be modified in the pool.js file, but is discouraged. Next, open up the database.sql file. There are a few SQL statements there to execute. This will create a table and populate it with some base data to start with. Afterwords, you're good to get into using your new tool!


Usage
============
Currently, the tool tracks a number of data about a koala. Their name, age, favorite color. Their status for being ready to transfer is also tracked, as well as any notes that staff want to add for them.

When adding a koala, there are some required fields:
    Name.
    Age.
    Favorite Color (the most important thing!)
    If they're ready for transfer

All of these fields are required to input a new koala. There is an optional notes field, but can be currently left blank. 

After inputting a koala, they will appear in the list at the bottom. Currently, the list is organized from oldest entries to newest.

Now, you will see your current list of koalas tracked in the database. You will see the data inputted with the form and stored in the database. Within the table, there are some options related to them. Clicking the `Ready to Transfer` will toggle their ready status. This update will be reflected in the `Ready for Transfer` column. 

Next, you will see a `Delete` button. This button will bring a popup confirming that you wish to delete a koala from the table. Deleting a koala is PERMENANT. Make sure you wish to delete them before you click the popup. Clicking cancel or anywhere outside the popup will cancel the request.

Next is the `Update Info` button. Should there be data you wish to change about a koala, IE. their name, age, or notes, you can edit the text in place. Click the field on the koala you wish to edit, then change the entry to be done. Then, click the `Update Info` button on the side of the koala you have edited.

    Note: Editing multiple koalas is currently not possible. Only the koala you click the `Update Info` button will be updated.

Should you wish to search for a specific entry in the table, there is a `search` box at the top of the table. This will filter for any value in any of the fields, and only display those. It is case insensitive, and will show any koala that contains a field that matches the result.

Contributions
=============
please don't.


Info
=============

This was a project done for Prime Digital Academy. The point of it was to work with a database with full CRUD ability.

This was a process that also emphasized teamwork and collaboration, as well as working with git and github to work independently and merge all of our work together at the end.

Contributors
================
@danielmrichter
@bpol87
@lukeedwards2
@SwordLegz
