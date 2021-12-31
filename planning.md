<!-- vim-markdown-toc GFM -->

* [data base](#data-base)
* [Routes](#routes)

<!-- vim-markdown-toc -->

## data base

~~Use mongo, no SQL non relational data base. I don't think I see a reason to use
a relational data base.~~

Use a relational data base. So all reviews can be associated with a professor.
Probably will make life easier down the line. Idk...

Stores the following information:

Prof table:

| Prof name (primary key)|
|------------------------|

Reviews table:

| Prof name (foreign key) | rating | review
|-------------------------|-------|-------|


## Routes

* `/profs` - a list of all profs in data base

* `/courses` - list of all courses in data base

* `/course/:course` - list of profs for a specific course

* `/prof/:prof` - reviews for a specific prof

* `/course/:course` - reviews for a course

* `/reviews` - a choice of profs vs courses. Then display a list of all profs /
courses in the data base.

* `/submit` - submit reviews for a course. TODO: figure how this page will work
