import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product-dto';
import { Product } from './product.entity';
import { UpdateProductDto } from './dto/update-product-dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.createProduct(createProductDto);
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productRepository.find();
    return products;
  }

  async getProductById(id: number): Promise<Product> {
    const found = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!found) {
      throw new NotFoundException(`Product with id ${id} doesn't exists`);
    }
    return found;
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const found = await this.getProductById(id);
    return this.productRepository.updateProduct(found, updateProductDto);
  }

  async removeProduct(id: number): Promise<Product> {
    const found = await this.getProductById(id);
    return found.remove();
  }
}
