import uvicorn
from fastapi import FastAPI
import routers.Products as Products
import routers.salespersons as salespersons
import routers.customers as customers
import routers.sale as sale
import routers.commisions as commisions
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title = "api_client",
    description= "fast api for updating data base information"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"], 
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (POST, GET, etc.)
    allow_headers=["*"],  # Allow all headers
)

app.include_router(Products.router)
app.include_router(salespersons.router)
app.include_router(customers.router)
app.include_router(sale.router)
app.include_router(commisions.router)

if __name__ == "__main__":
    uvicorn.run(app)