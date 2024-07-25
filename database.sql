-- Ensure that your databse is named "koalas"
-- on port: 5432

CREATE TABLE "koalas" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(200),
	"favorite_color"VARCHAR(20),
	"age" INTEGER,
	"ready_to_transfer" BOOLEAN DEFAULT false,
	"notes" VARCHAR(500)
	);

INSERT INTO "koalas"
("name", "favorite_color", "age", "notes", "ready_to_transfer")
VALUES
('Scotty', 'Red', 4, 'Born in Guatemala', TRUE),
('Jean', 'Green', 5, 'Allergic to lots of lava', TRUE),
('Ororo', 'Yellow', 7,'Loves listening to Paula (Abdul)', FALSE),
('K''Leaf', 'Purple', 15, 'Never refuses a treat.', FALSE),
('Charlie', 'Orange', 9, 'Favorite band is Nirvana', TRUE),
('Betsy', 'Blue', 4, 'Has a pet iguana', TRUE);