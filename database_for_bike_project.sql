
set global transaction isolation level serializable;
set global SQL_MODE = 'ANSI,TRADITIONAL';
set names utf8mb4;
set SQL_SAFE_UPDATES = 0;

set @thisDatabase = 'sales_tracking';
drop database if exists sales_tracking;
create database if not exists sales_tracking;
use sales_tracking;

CREATE TABLE Products (
    Name VARCHAR(100),
    Manufacturer VARCHAR(100),
    Style VARCHAR(50),
    PurchasePrice DECIMAL(10, 2),
    SalePrice DECIMAL(10, 2),
    QtyOnHand INT,
    CommissionPercentage DECIMAL(5, 2),
    unique key(Name,Manufacturer)
);

DROP TABLE IF EXISTS Salespersons;
CREATE TABLE Salespersons (
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Address VARCHAR(255),
    Phone VARCHAR(20),
    StartDate DATE,
    TerminationDate DATE,
    Manager VARCHAR(50),
    UNIQUE KEY SalespersonUnique (FirstName, LastName)

);

DROP TABLE IF EXISTS Customers;
CREATE TABLE Customers (
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Address VARCHAR(255),
    Phone VARCHAR(20),
    StartDate DATE,
	primary key CustomerUnique (FirstName, LastName)

);

DROP TABLE IF EXISTS Sales;
CREATE TABLE Sales (
    ProductName VARCHAR(100),
    ProductManufacturer VARCHAR(100),
    SalespersonFirstName VARCHAR(100),
	SalespersonLastName VARCHAR(100),
    CustomerFirstName VARCHAR(100),
    CustomerLastName VARCHAR(100),
    SalesDate DATE,
    FOREIGN KEY (ProductName, ProductManufacturer) REFERENCES Products(Name, Manufacturer),
	FOREIGN KEY (CustomerFirstName, CustomerLastName) REFERENCES Customers(FirstName, LastName),
	FOREIGN KEY (SalespersonFirstName, SalespersonLastName) REFERENCES Salespersons(FirstName, LastName)


);

DROP TABLE IF EXISTS Discounts;
CREATE TABLE Discounts (
    ProductName varchar(50),
    ProductManufacturer varchar(50),
    BeginDate DATE,
    EndDate DATE,
    DiscountPercentage DECIMAL(5, 2),
    FOREIGN KEY (ProductName,ProductManufacturer) REFERENCES Products(Name,Manufacturer)
);
INSERT INTO Products (Name, Manufacturer, Style, PurchasePrice, SalePrice, QtyOnHand, CommissionPercentage)
VALUES
('bike1', 'Dell', 'Gaming', 800.00, 1000.00, 10, 5.00),
('bike2', 'Apple', 'iPhone', 600.00, 800.00, 20, 7.00),
('bike3', 'Samsung', 'Galaxy', 300.00, 500.00, 15, 6.00);

INSERT INTO Salespersons (FirstName, LastName, Address, Phone, StartDate, TerminationDate, Manager)
VALUES
('John', 'Doe', '123 Main St, Cityville', '123-456-7890', '2020-01-15', NULL, 'Jane Smith'),
('Alice', 'Johnson', '456 Oak St, Townsville', '234-567-8901', '2019-06-01', NULL, 'Tom Brown'),
('Bob', 'Williams', '789 Pine St, Village', '345-678-9012', '2021-03-22', NULL, 'Sara Davis');

INSERT INTO Customers (FirstName, LastName, Address, Phone, StartDate)
VALUES
('Emily', 'Brown', '321 Cedar St, Metropolis', '456-789-0123', '2023-01-10'),
('Michael', 'Smith', '654 Spruce St, Smalltown', '567-890-1234', '2023-05-15'),
('Jessica', 'Davis', '987 Birch St, Hamlet', '678-901-2345', '2023-07-01');


INSERT INTO Discounts (ProductName, ProductManufacturer, BeginDate, EndDate, DiscountPercentage)
VALUES
('bike1', 'Dell', '2023-01-01', '2023-01-15', 10.00),
('bike2', 'Apple', '2023-02-01', '2023-02-10', 5.00),
('bike3', 'Samsung', '2023-03-01', '2023-03-07', 7.50),
('bike1', 'Dell', '2023-05-15', '2023-05-25', 12.00),
('bike2', 'Apple', '2023-07-01', '2023-07-15', 8.00),
('bike3', 'Samsung', '2023-09-01', '2023-09-10', 6.00);
INSERT INTO Sales (ProductName, ProductManufacturer, SalespersonFirstName, SalespersonLastName, CustomerFirstName, CustomerLastName, SalesDate)
VALUES
('bike1', 'Dell', 'John', 'Doe', 'Emily', 'Brown', '2023-02-15'),
('bike2', 'Apple', 'Alice', 'Johnson', 'Michael', 'Smith', '2023-06-01'),
('bike3', 'Samsung', 'Bob', 'Williams', 'Jessica', 'Davis', '2023-08-05');

