from fastapi import APIRouter, HTTPException
from sqlalchemy import create_engine, text
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
from typing import Optional
@router.get("/all_customers")
async def get_all_salesperson():
    query = f"SELECT * FROM Customers"
    customers  = db.run_query(query)
    return customers

@router.get("/customers")
async def get_customer(FirstName: str, LastName: str):
    query = f"SELECT * FROM Customers WHERE FirstName = '{FirstName}' AND LastName = '{LastName}'"
    customer = db.run_query(query)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer


@router.post("/customers")
def create_customer(
    FirstName: str,
    LastName: str,
    Address: str,
    Phone: str,
    StartDate: date  
):
    insert_query = f"""
    INSERT INTO Customers (FirstName, LastName, Address, Phone, StartDate)
    VALUES ('{FirstName}', '{LastName}', '{Address}', '{Phone}', '{StartDate}')
    """
    db.run_insert_query(insert_query)
    return {"message": "Customer created successfully"}



@router.delete("/customers")
async def delete_customer(FirstName: str, LastName: str):
    delete_query = f"DELETE FROM Customers WHERE FirstName = '{FirstName}' AND LastName = '{LastName}'"
    result = db.run_delete_query(delete_query)
    if result == 0:
        raise HTTPException(status_code=404, detail="Customer not found")
    return {"message": "Customer deleted successfully"}

@router.put("/customers")
def update_customer(
    FirstName: str,
    LastName: str,
    Address: Optional[str] = None,
    Phone: Optional[str] = None,
    StartDate: Optional[date] = None
):

    updates = []
    if Address is not None:
        updates.append(f"Address = '{Address}'")
    if Phone is not None:
        updates.append(f"Phone = '{Phone}'")
    if StartDate is not None:
        updates.append(f"StartDate = '{StartDate}'")

    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")

    update_query = f"""
    UPDATE Customers
    SET {', '.join(updates)}
    WHERE FirstName = '{FirstName}' AND LastName = '{LastName}'
    """
    result = db.run_update_query(update_query)
    if result == 0:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    return {"message": "Customer updated successfully"}