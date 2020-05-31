import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer-dto";
import { CustomersService } from "./customers.service";
import { UpdateCustomerDto } from "./dto/update-customer-dto";
import { Customer } from "./customer.interface";

@Controller("customers")
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  async getAllCustomers(): Promise<Customer[]> {
    return this.customersService.getAllCustomers();
  }

  @Get(":id")
  async getCustomerById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<Customer> {
    return this.customersService.getCustomerById(id);
  }

  // @UsePipes(ValidationPipe)
  @Post()
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.createCustomer(createCustomerDto);
  }

  @Delete(":id")
  async removeCustomer(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<Customer> {
    return this.customersService.removeCustomer(id);
  }

  @UsePipes(ValidationPipe)
  @Put(":id")
  async updateCustomer(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.updateCustomer(id, updateCustomerDto);
  }
}
