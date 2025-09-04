import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service.js';
import 'dotenv/config';
import mysql from 'mysql2/promise';

// create a pool at module load time
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'classicmodels',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

@Controller('reports')
export class ReportsController {
  constructor() {
    //debug por undefine problem
    this.reportsService = new ReportsService(pool);
    try {
      console.log('[DEBUG] ReportsController constructed, reportsService created?', !!this.reportsService);
    } catch (e) {}
  }

  
  _checkService(name) {
    try {
      console.log(`[DEBUG] ReportsController.${name}: reportsService defined?`, !!this.reportsService);
    } catch (e) {
      
    }
  }
//rutas
  @Get('top-customer')
  async topCustomer() {
    this._checkService('topCustomer');
    return this.reportsService.topCustomer();
  }

  @Get('total-per-customer')
  async totalPerCustomer() {
    this._checkService('totalPerCustomer');
    return this.reportsService.totalPerCustomer();
  }

  @Get('employees-per-office')
  async employeesPerOffice() {
    this._checkService('employeesPerOffice');
    return this.reportsService.employeesPerOffice();
  }

  @Get('products-sold-per-line')
  async productsSoldPerLine() {
    this._checkService('productsSoldPerLine');
    return this.reportsService.productsSoldPerLine();
  }

  @Get('product-lines')
  async productLines() {
    this._checkService('productLines');
    return this.reportsService.productLines();
  }

  @Get('employees')
  async employeesList() {
    this._checkService('employeesList');
    return this.reportsService.employeesList();
  }

  @Get('recent-sales')
  async recentSales() {
    this._checkService('recentSales');
    return this.reportsService.recentSales();
  }
}