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
@router.get("/all_salesPerson")
async def get_all_salesperson():
    query = f"SELECT * FROM Salespersons"
    salespersons = db.run_query(query)
    return salespersons

@router.get("/salespersons")
async def get_salesperson(FirstName: str, LastName: str):
    query = f"SELECT * FROM Salespersons WHERE FirstName = '{FirstName}' AND LastName = '{LastName}'"
    salesperson = db.run_query(query)
    if not salesperson:
        raise HTTPException(status_code=404, detail="Salesperson not found")
    return salesperson
@router.post("/salespersons")
def create_salesperson(
    FirstName: str,
    LastName: str,
    Address: str,
    Phone: str,
    StartDate: date,  
    TerminationDate: Optional[date] = None, 
    Manager: Optional[str] = None
):
    query = f"SELECT * FROM Salespersons WHERE FirstName ='{FirstName}' and LastName ='{LastName} '"

    insert_query = f"""
    INSERT INTO Salespersons (FirstName, LastName, Address, Phone, StartDate, TerminationDate, Manager)
    VALUES ('{FirstName}', '{LastName}', '{Address}', '{Phone}', '{StartDate}', {f"'{TerminationDate}'" if TerminationDate else 'NULL'}, {f"'{Manager}'" if Manager else 'NULL'})
    """
    db.run_insert_query(insert_query)
    return {"message": "Salesperson created successfully"}

@router.delete("/salespersons")
async def delete_salesperson(FirstName: str, LastName: str):
    delete_query = f"DELETE FROM Salespersons WHERE FirstName = '{FirstName}' AND LastName = '{LastName}'"
    result = db.run_delete_query(delete_query)
    if result == 0:
        raise HTTPException(status_code=404, detail="Salesperson not found")
    return {"message": "Salesperson deleted successfully"}
@router.put("/salespersons")
def update_salesperson(
    FirstName: str,
    LastName: str,
    Address: Optional[str] = None,
    Phone: Optional[str] = None,
    StartDate: Optional[date] = None,
    TerminationDate: Optional[date] = None,
    Manager: Optional[str] = None
):
    updates = []
    if Address is not None:
        updates.append(f"Address = '{Address}'")
    if Phone is not None:
        updates.append(f"Phone = '{Phone}'")
    if StartDate is not None:
        updates.append(f"StartDate = '{StartDate}'")
    if TerminationDate is not None:
        updates.append(f"TerminationDate = '{TerminationDate}'")
    if Manager is not None:
        updates.append(f"Manager = '{Manager}'")

    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")

    update_query = f"""
    UPDATE Salespersons
    SET {', '.join(updates)}
    WHERE FirstName = '{FirstName}' AND LastName = '{LastName}'
    """
    result = db.run_update_query(update_query)
    if result == 0:
        raise HTTPException(status_code=404, detail="Salesperson not found")
    
    return {"message": "Salesperson updated successfully"}