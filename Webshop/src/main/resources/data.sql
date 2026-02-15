INSERT INTO "reservation_details"
(first_name, last_name, email_address, status, reservation_date_time, number_of_guests)
VALUES
    ('Jan', 'Janssen', 'jan@email.com', 'PENDING', '2026-02-15 18:30:00', 4),
    ('Piet', 'Pietersen', 'piet@email.com', 'APPROVED', '2026-02-20 19:00:00', 2),
    ('Klaas', 'De Vries', 'klaas@email.com', 'DENIED', '2026-03-01 17:45:00', 6),
    ('Sanne', 'Visser', 'sanne@email.com', 'APPROVED', '2026-02-14 20:15:00', 3),
    ('Tom', 'Bakker', 'tom@email.com', 'PENDING', '2026-02-28 18:00:00', 5);

INSERT INTO "menu_items" (name, description, price, dish)
VALUES
('Pinsa Mediterrana', 'Luchtig platbrood met rauwe ham, zwarte olijven, rucola en truffelolie', 13.95, 'lunch'),
('Croissant-Shakshuka', 'Gepocheerd ei in kruidige tomatensaus, geserveerd met een warme roombotercroissant', 12.50, 'lunch'),
('Kip à la Club Wrap', 'Gegrilde kip, bacon, avocado, tomaat en frisse yoghurt-limoendressing', 13.50, 'lunch'),
('Smashed Peas & Munt (V)', 'Grof geprakte doperwten met verse munt, feta en een gepocheerd ei op volkoren zuurdesem', 11.95, 'lunch'),
('Kimchi & Double Cheese Toastie', 'Tosti met belegen kaas, cheddar en pittige gefermenteerde kimchi', 10.95, 'lunch'),
('Green Sea Salad (Vegan)', 'Salade met wakame (zeewier), edamame, quinoa, komkommer en een dressing van zwarte knoflook en miso', 14.25, 'lunch'),
('Roombotercroissant', 'Vers uit de oven, geserveerd met boerenboter en aardbeienjam van De Halm', 3.25, 'pastries'),
('Pain au Chocolat', 'Luchtig bladerdeeg met twee banen pure Belgische chocolade', 3.75, 'pastries'),
('Red Velvet Taart', 'De iconische dieprode taart met fluweelzachte lagen en een rijke cream cheese frosting', 5.95, 'pastries'),
('Cheesecake', 'Fluweelzachte cheesecake op een bodem van bastogne met verse bessen', 6.50, 'pastries'),
('Cinnamon Roll', 'Versgebakken kaneelbroodje met een royale laag cream cheese frosting', 4.75, 'pastries'),
('Blueberry Muffin', 'Luchtige muffin met blauwe bessen en havermout-crumble', 4.25, 'pastries'),
('Banana Bread (Vegan)', 'Huisgebakken en getoast, geserveerd met een beetje pindakaas of ahornsiroop', 4.25, 'pastries'),
('Espresso', '', 3.20, 'drinks'),
('Americano', '', 3.50, 'drinks'),
('Cappuccino / Flat White', '', 4.20, 'drinks'),
('Chai Latte', '', 4.95, 'drinks'),
('Biologische Losse Thee', '', 3.80, 'drinks'),
('Verse Schulp Sappen', '', 4.50, 'drinks'),
('Homemade Lemonade', '', 4.95, 'drinks'),
('Frisdrank', '', 3.50, 'drinks');


INSERT INTO "products" (name, short_description, price, image_file_name)
VALUES
    ('Taart', 'Een lekker taartje', 4.4, 'Taart.jpeg'),
    ('Gebak', 'Een lekker gebakje', 3.3, 'Gebak.jpeg'),
    ('Cake', 'Een lekker cakeje', 2.2, 'Cake.jpeg'),
    ('Brownie', 'De lekkerste brownie', 5.5, 'Brownie.jpeg');

INSERT INTO "orders" (customer_name, customer_email, total_price, date_created, date_edited)
VALUES
    ('Jan Janssen', 'JJ@home.nl', 12.34, now(), now()),
    ('Piet Pietersen', 'Pieterman@piet.piet', 12.23, now(), now()),
    ('Klaas Klaassens', 'Klaasjeeee@gmail.com', 11.23, now(), now());

INSERT INTO "order_items" (product_id, order_id, quantity, price)
VALUES
    (1, 1, 3, 2.11),
    (2, 1, 6, 3.44),
    (4, 2, 1, 5.66),
    (2, 2, 8, 3.33),
    (3, 3, 2, 1.13),
    (1, 3, 4, 2.22);




