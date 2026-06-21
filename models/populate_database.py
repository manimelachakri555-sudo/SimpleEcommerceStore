import csv
import sqlite3
from collections import defaultdict

conn = sqlite3.connect("shipment_database.db")
cursor = conn.cursor()

product_ids = {}

with open("data/shipping_data_0.csv", "r") as file:
    reader = csv.DictReader(file)

    for row in reader:
        product_name = row["product"]

        if product_name not in product_ids:
            cursor.execute(
                "INSERT INTO product(name) VALUES (?)",
                (product_name,)
            )
            product_ids[product_name] = cursor.lastrowid

        cursor.execute(
            """
            INSERT INTO shipment(product_id, quantity, origin, destination)
            VALUES (?, ?, ?, ?)
            """,
            (
                product_ids[product_name],
                int(row["product_quantity"]),
                row["origin_warehouse"],
                row["destination_store"]
            )
        )

shipment_locations = {}

with open("data/shipping_data_2.csv", "r") as file:
    reader = csv.DictReader(file)

    for row in reader:
        shipment_locations[row["shipment_identifier"]] = (
            row["origin_warehouse"],
            row["destination_store"]
        )

shipment_products = defaultdict(lambda: defaultdict(int))

with open("data/shipping_data_1.csv", "r") as file:
    reader = csv.DictReader(file)

    for row in reader:
        shipment_id = row["shipment_identifier"]
        product_name = row["product"]
        shipment_products[shipment_id][product_name] += 1

for shipment_id, products in shipment_products.items():
    origin, destination = shipment_locations[shipment_id]

    for product_name, quantity in products.items():

        if product_name not in product_ids:
            cursor.execute(
                "INSERT INTO product(name) VALUES (?)",
                (product_name,)
            )
            product_ids[product_name] = cursor.lastrowid

        cursor.execute(
            """
            INSERT INTO shipment(product_id, quantity, origin, destination)
            VALUES (?, ?, ?, ?)
            """,
            (
                product_ids[product_name],
                quantity,
                origin,
                destination
            )
        )

conn.commit()
conn.close()

print("Database populated successfully.")