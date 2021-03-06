import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerRepository } from "./customer.repository";
import { CreateCustomerDto } from "./dto/create-customer-dto";
import { UpdateCustomerDto } from "./dto/update-customer-dto";
import { Customer } from "./customer.interface";

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerRepository)
    private customerRepository: CustomerRepository,
  ) {}

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customerRepository.createCustomer(createCustomerDto);
  }

  async getAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async getCustomerById(id: number): Promise<Customer> {
    const found = await this.customerRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException("Customer with this id doesnt exist");
    }
    return found;
  }

  async removeCustomer(id: number): Promise<Customer> {
    const found = await this.getCustomerById(id);
    return this.customerRepository.remove(found);
  }

  async updateCustomer(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const found = await this.getCustomerById(id);
    return this.customerRepository.updateCustomer(found, updateCustomerDto);
  }
}
