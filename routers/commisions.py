from fastapi import APIRouter, HTTPException
from sqlalchemy import create_engine, text
from datetime import date
router = APIRouter()
from typing import Any, Dict, List, Optional
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
def get_commission_data() -> List[Dict[str, Any]]:
    query = f"SELECT FirstName,LastName FROM Salespersons "
    salesperson = db.run_query(query)
    numSalespersons = len(salesperson)
    commission_data = []

    for i in range(numSalespersons):
        firstName = salesperson[i]['FirstName']
        lastName = salesperson[i]['LastName']

        sales = db.run_query(
            f"SELECT SalesDate, ProductName, ProductManufacturer FROM Sales WHERE SalespersonFirstName='{firstName}' AND SalespersonLastName='{lastName}'"
        )

        salesperson_commission = {
            'FirstName': firstName,
            'LastName': lastName,
            'Q1': 0,
            'Q2': 0,
            'Q3': 0,
            'Q4': 0
        }

        for sale in sales:
            month = sale['SalesDate'].month
            productname = sale['ProductName']
            productManufacturer = sale['ProductManufacturer']
            
            product = db.run_query(
                f"SELECT SalePrice, CommissionPercentage FROM Products WHERE Name='{productname}' AND Manufacturer='{productManufacturer}'"
            )
            
            product_price = product[0]['SalePrice']
            product_commission = product[0]['CommissionPercentage']
            commission = (product_commission / 100) * product_price
            
            if 1 <= month <= 3:
                salesperson_commission['Q1'] += commission
            elif 4 <= month <= 6:
                salesperson_commission['Q2'] += commission
            elif 7 <= month <= 9:
                salesperson_commission['Q3'] += commission
            elif 10 <= month <= 12:
                salesperson_commission['Q4'] += commission

        commission_data.append(salesperson_commission)
    return commission_data

@router.get("/commission")
def commission_report():
    return get_commission_data()