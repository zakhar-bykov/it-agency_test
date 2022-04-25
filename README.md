# it-agency_test

## npm commands
```
sass_watch
sass_build
ts_build
build
dev
start
```

## tree
### views
```
/
/login
/register
```

### api
```
[POST] /api/login { loginEmail, password }
[POST] /api/logout
[POST] /api/register { login, email, password }

[GET]    /api/get-photos { page, maxcount, ownerid? }
[PUT]    /api/load-photos
[DELETE] /api/delete-photos { id | id[] }

[DELETE] /api/delete-album { id | id[] }
[PATCH]  /api/change-album-title { albumid, new_album_name }
```
