# blogtutorial


```hs
-- Roles
DEFINE TABLE roles SCHEMAFULL
    PERMISSIONS
        FOR SELECT FULL
        FOR CREATE, UPDATE, DELETE NONE;

DEFINE FIELD name ON roles TYPE string;

CREATE roles:admin SET name = 'Admin';
CREATE roles:user SET name = 'User';

-- Users
DEFINE TABLE Users SCHEMAFULL
	PERMISSIONS
		FOR select FULL
		FOR create WHERE roles:admin INSIDE $auth.roles
		FOR update, delete
			WHERE id = $auth.id OR roles:admin INSIDE $auth.roles
;
DEFINE FIELD username ON Users TYPE string;
DEFINE FIELD email ON Users TYPE string ASSERT string::is::email($value);
DEFINE FIELD password ON Users TYPE string;
DEFINE FIELD roles ON Users TYPE array<record<roles>> DEFAULT [roles:user];

DEFINE INDEX userEmailIndex ON Users FIELDS email UNIQUE;
DEFINE INDEX userUsernameIndex ON Users FIELDS username UNIQUE;

-- Auth
DEFINE ACCESS Auth ON DATABASE TYPE RECORD
    SIGNUP (
        CREATE Users SET
            username = $username,
            email = $email,
            password = crypto::argon2::generate($password)
    )

    SIGNIN (
        SELECT * FROM Users WHERE
            email = $email AND 
            crypto::argon2::compare(password, $password)
    )

    DURATION FOR TOKEN 3d,
    FOR SESSION 3d;

-- Posts
DEFINE TABLE OVERWRITE Posts SCHEMAFULL
    PERMISSIONS
        FOR select
            WHERE published = true
            OR user = $auth.id
            OR roles:admin INSIDE $auth.roles
        FOR create, update, delete
            WHERE 
            user = $auth.id
            OR roles:admin INSIDE $auth.roles
;

DEFINE FIELD title ON TABLE Posts TYPE string;
DEFINE FIELD description ON TABLE Posts TYPE string;
DEFINE FIELD content ON TABLE Posts TYPE string;
DEFINE FIELD published ON TABLE Posts TYPE bool DEFAULT false;
DEFINE FIELD created_at ON TABLE Posts TYPE datetime DEFAULT time::now();
DEFINE FIELD updated_at ON TABLE Posts TYPE datetime DEFAULT time::now() VALUE time::now();
DEFINE FIELD user ON TABLE Posts TYPE record<Users> DEFAULT $auth.id;
```
