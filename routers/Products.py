from fastapi import APIRouter, HTTPException
from sqlalchemy import create_engine, text
from typing import Optional

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
@router.get("/all_products")
async def get_all_salesperson():
    query = f"SELECT * FROM Products"
    products  = db.run_query(query)
    return products

@router.get("/products/{product_name}")
async def get_product(product_name: str):
    query = f"SELECT * FROM Products WHERE Name ='{product_name}'"
    product = db.run_query(query)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
@router.post("/products")
def create_product(Name:str,Manufacturer: str,PurchasePrice:float,style:str,SalePrice:float,QtyOnHand:int,CommissionPercentage:float ):
     insert_query = f"""INSERT INTO Products (Name, Manufacturer, Style, PurchasePrice, SalePrice, QtyOnHand, CommissionPercentage)
    VALUES ('{Name}', '{Manufacturer}', '{style}', {PurchasePrice}, {SalePrice}, {QtyOnHand}, {CommissionPercentage})
    """        
     db.run_insert_query(insert_query)
     return {"message": "Product created successfully"}


@router.delete("/products/{product_name}")
async def delete_product(product_name: str):
    delete_query = f"DELETE FROM Products WHERE Name = '{product_name}'"
    
    result = db.run_delete_query(delete_query)
    if not delete_query:
        raise HTTPException(status_code=404, detail="Product not found")
    result = db.run_delete_query(delete_query)

    return {"message": "Product deleted successfully"}

@router.put("/products")
def update_product(
    Name: str,
    Manufacturer: Optional[str] = None,
    PurchasePrice: Optional[float] = None,
    Style: Optional[str] = None,
    SalePrice: Optional[float] = None,
    QtyOnHand: Optional[int] = None,
    CommissionPercentage: Optional[float] = None
):

    updates = []
    if Manufacturer is not None:
        updates.append(f"Manufacturer = '{Manufacturer}'")
    if PurchasePrice is not None:
        updates.append(f"PurchasePrice = {PurchasePrice}")
    if Style is not None:
        updates.append(f"Style = '{Style}'")
    if SalePrice is not None:
        updates.append(f"SalePrice = {SalePrice}")
    if QtyOnHand is not None:
        updates.append(f"QtyOnHand = {QtyOnHand}")
    if CommissionPercentage is not None:
        updates.append(f"CommissionPercentage = {CommissionPercentage}")

    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")

    update_query = f"""
    UPDATE Products
    SET {', '.join(updates)}
    WHERE Name = '{Name}'
    """
    result = db.run_update_query(update_query)
    if result == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {"message": "Product updated successfully"}


