import { Injectable } from '@nestjs/common';

@Injectable()
//consultas
export class ReportsService {
  constructor(pool) {
    this.pool = pool;
  }
  // 1. Cliente con más compras (por monto total de payments)
  async topCustomer() {
    const [rows] = await this.pool.query(`
      SELECT c.customerNumber, c.customerName, SUM(p.amount) AS totalSpent
      FROM customers c
      JOIN payments p ON c.customerNumber = p.customerNumber
      GROUP BY c.customerNumber, c.customerName
      ORDER BY totalSpent DESC
      LIMIT 1
    `);
    return rows[0] ?? null;
  }
  // 2. Total de compras por cada cliente
  async totalPerCustomer() {
    const [rows] = await this.pool.query(`
      SELECT c.customerNumber, c.customerName, SUM(p.amount) AS totalSpent
      FROM customers c
      JOIN payments p ON c.customerNumber = p.customerNumber
      GROUP BY c.customerNumber, c.customerName
      ORDER BY totalSpent DESC
    `);
    return rows;
  }
  // 3. Número de empleados por oficina
  async employeesPerOffice() {
    const [rows] = await this.pool.query(`
      SELECT o.officeCode, o.city, COUNT(e.employeeNumber) AS numEmployees
      FROM offices o
      LEFT JOIN employees e ON o.officeCode = e.officeCode
      GROUP BY o.officeCode, o.city
      ORDER BY o.officeCode
    `);
    return rows;
  }
  // 4. Total de productos vendidos por cada línea de producto
  async productsSoldPerLine() {
    const [rows] = await this.pool.query(`
      SELECT pl.productLine, pl.textDescription, COALESCE(SUM(od.quantityOrdered),0) AS totalSold
      FROM productlines pl
      LEFT JOIN products p ON p.productLine = pl.productLine
      LEFT JOIN orderdetails od ON od.productCode = p.productCode
      GROUP BY pl.productLine, pl.textDescription
      ORDER BY totalSold DESC
    `);
    return rows;
  }
  // 5. Listar todas las líneas de productos
  async productLines() {
    const [rows] = await this.pool.query(`
      SELECT productLine, textDescription, htmlDescription
      FROM productlines
      ORDER BY productLine
    `);
    return rows;
  }
  // 6. Listar todos los empleados
  async employeesList() {
    const [rows] = await this.pool.query(`
      SELECT employeeNumber, firstName, lastName, extension, jobTitle, officeCode
      FROM employees
      ORDER BY lastName, firstName
    `);
    return rows;
  }
  // 7. Listar las últimas 10 ventas realizadas (se usan payments como ventas)
  async recentSales() {
    const [rows] = await this.pool.query(`
      SELECT paymentDate, customerNumber, checkNumber, amount
      FROM payments
      ORDER BY paymentDate DESC
      LIMIT 10
    `);
    return rows;
  }
}