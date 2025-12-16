INSERT INTO "users" ("id", "username", "name", "title", "intro", "active", "created_at")
VALUES ('1', 'uzera', 'Uzair Ahmed', 'Software Developer
', NULL, '1', now());


INSERT INTO "projects" ("id", "username", "name", "description", "show", "created_at")
VALUES ('1', 'uzera', 'Display Projects', '', '1', now());


INSERT INTO "tools" ("id", "project_id", "name", "type", "description")
VALUES ('1', '1', 'Next.js', 'Framework', '');


INSERT INTO "tools" ("id", "project_id", "name", "type", "description")
VALUES ('2', '1', 'Postgresql', 'Database', '');


INSERT INTO "project_links" ("id", "project_id", "title", "url")
VALUES ('1', '1', 'Test Link', 'test.link.example.com');


INSERT INTO "projects" ("id", "username", "name", "description", "show", "created_at")
VALUES ('2', 'uzera', 'Scraper', '', '1', now());


INSERT INTO "tools" ("id", "project_id", "name", "type", "description")
VALUES ('3', '2', 'Python', 'Language', '');


INSERT INTO "users" ("id", "username", "name", "title", "intro", "active", "created_at")
VALUES ('2', 'talha', 'Talha', 'Student', NULL, '1', now());


INSERT INTO "projects" ("id", "username", "name", "description", "show", "created_at")
VALUES ('3', 'talha', 'Agent', '', '1', now());


INSERT INTO "tools" ("id", "project_id", "name", "type", "description")
VALUES ('4', '3', 'LLMs', 'Library', '');