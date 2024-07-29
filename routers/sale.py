from fastapi import APIRouter, HTTPException
from sqlalchemy import create_engine, text
from typing import Optional
from datetime import date

router = APIRouter()

DATABASE_URL = "mysql+pymysql://root:Dor.ajam1382@localhost/sales_tracking"
engine = create_engine(DATABASE_URL,future=True)

class Database:
    def __init__(self, engine):
        self.engine = engine

    def run_query(self,query):
        with engine.connect() as connection:
            result = connection.execute(text(query))
            output = result.fetchall()
        return [row._mapping for row in output]

    def run_insert_query(self,query):
        with engine.connect() as connection: 
            result = connection.execute(text(query))
            connection.commit()
        return f"Inserted {result.rowcount} records"

    def run_delete_query(self,query):
        with engine.connect() as connection: 
            result = connection.execute(text(query))
            connection.commit()
        return f'Deleted {result.rowcount} records'
    
    def run_update_query(self,query):
        with engine.connect() as connection: 
            result = connection.execute(text(query))
            connection.commit()
        return f'updated {result.rowcount} records'

db = Database(engine)
@router.get("/all_sales")
async def get_all_sales():
    query = f"SELECT * FROM Sales"
    Sales  = db.run_query(query)
    return Sales
@router.post("/sales")
def create_sale(
    ProductName: str,
    ProductManufacturer: str,
    SalespersonFirstName: str,
    SalespersonLastName: str,
    CustomerFirstName: str,
    CustomerLastName: str,
    SalesDate: date
):

    product_query = f"SELECT * FROM Products WHERE Name='{ProductName}' AND Manufacturer='{ProductManufacturer}'"
    product = db.run_query(product_query)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    salesperson_query = f"SELECT * FROM Salespersons WHERE FirstName='{SalespersonFirstName}' AND LastName='{SalespersonLastName}'"
    salesperson = db.run_query(salesperson_query)
    if not salesperson:
        raise HTTPException(status_code=404, detail="Salesperson not found")

    customer_query = f"SELECT * FROM Customers WHERE FirstName='{CustomerFirstName}' AND LastName='{CustomerLastName}'"
    customer = db.run_query(customer_query)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    insert_query = f"""
    INSERT INTO Sales (ProductName, ProductManufacturer, SalespersonFirstName, SalespersonLastName, CustomerFirstName, CustomerLastName, SalesDate)
    VALUES ('{ProductName}', '{ProductManufacturer}', '{SalespersonFirstName}', '{SalespersonLastName}', '{CustomerFirstName}', '{CustomerLastName}', '{SalesDate}')
    """
    db.run_insert_query(insert_query)
    return {"message": "Sale created successfully"}